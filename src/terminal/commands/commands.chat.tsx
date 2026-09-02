import type { Command } from './types';
import { getPositionals } from './args';
import { Block } from '../components/blocks';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

/* ── Terminal-styled Markdown renderers ──────────────────────────────────── */

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-base font-bold text-primary mt-3 mb-1 border-b border-border/60 pb-1">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-sm font-bold text-primary mt-3 mb-1">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-semibold text-primary/90 mt-2 mb-0.5">{children}</h3>
  ),
  p: ({ children }) => <p className="leading-relaxed">{children}</p>,
  strong: ({ children }) => (
    <strong className="text-foreground font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="text-primary/80 italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:text-primary/70 transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="space-y-0.5 pl-4 list-[disc] marker:text-primary/60">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-0.5 pl-4 list-[decimal] marker:text-primary/60">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  code: ({ className, children, ...rest }) => {
    const isBlock = className?.includes('language-');
    return isBlock ? (
      <pre className="bg-muted/60 border border-border/50 rounded-md px-3 py-2 overflow-x-auto my-2 no-scrollbar">
        <code className="text-xs font-mono text-foreground/80" {...rest}>
          {children}
        </code>
      </pre>
    ) : (
      <code
        className="bg-muted/60 border border-border/50 rounded px-1 py-0.5 text-xs font-mono text-primary/90"
        {...rest}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => <>{children}</>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary/50 pl-3 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-2 no-scrollbar">
      <table className="text-xs border-collapse w-full">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border/70">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="text-left px-2 py-1 text-primary font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-2 py-1 border-b border-border/30">{children}</td>
  ),
  hr: () => <hr className="border-border/50 my-3" />,
};

/* Session-scoped Nova conversation state (survives clear). */
let novaHistory: { role: 'user' | 'model'; content: string }[] = [];

const SUGGESTIONS = [
  'What are his tech stack?',
  'Tell me about his experience.',
  'Show me his projects.',
  'What are his interests?',
];

async function askNova(text: string, ctx: Parameters<Command['run']>[1]) {
  ctx.pushBlock(
    <Block title="nova@ai — thinking…" tone="accent">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>streaming response…</span>
      </div>
    </Block>,
  );

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: novaHistory }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data?.error ?? 'Failed to reach the assistant');
    }

    const data = await response.json();
    const reply: string = data.text ?? '(empty response)';
    novaHistory = [...novaHistory, { role: 'user', content: text }, { role: 'model', content: reply }];
    ctx.pushBlock(
      <Block title="nova@ai — response" tone="accent">
        <div className="nova-markdown leading-relaxed text-sm text-foreground/90 space-y-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {reply}
          </ReactMarkdown>
        </div>
      </Block>,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    ctx.push(`ERROR_CONNECTION: ${message}`, 'err');
  }
}

const nova: Command = {
  name: 'nova',
  aliases: ['ai', 'ask', 'ellai'],
  description: 'Ask the built-in AI assistant about Eli.',
  usage: 'nova <question>',
  category: 'assistant',
  run(args, ctx) {
    const question = getPositionals(args).join(' ').trim();

    if (!question) {
      ctx.push('Ask Nova anything — e.g.:', 'accent');
      ctx.spacer();
      for (const s of SUGGESTIONS) ctx.push(`  nova "${s}"`, 'muted');
      return;
    }

    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>((resolve) => {
      void askNova(question, ctx).finally(() => resolve());
    });
  },
};

const reset: Command = {
  name: 'nova-reset',
  aliases: ['ai-reset', 'forget'],
  description: 'Reset the Nova conversation context.',
  category: 'assistant',
  run(_args, ctx) {
    novaHistory = [];
    ctx.push('Nova conversation context cleared.', 'ok');
  },
};

export const assistantCommands: Command[] = [nova, reset];
