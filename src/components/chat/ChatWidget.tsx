import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Send, CheckCheck, Terminal } from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';
import TypingIndicator from './TypingIndicator';
import AnimatedMessage from './AnimatedMessage';
import type { Message as MessageType } from '@/types/types';
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from '@/components/ui/message-scroller';
import { TerminalBadge, useDraggableScroll } from '@/components/shared/terminal';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const promptScrollRef = useDraggableScroll<HTMLDivElement>();
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: 'model',
      content:
        "Kamusta! I'm Nova, Eli's portfolio assistant. Ask me anything about his technical stack, engineering background, projects, or experience!",
    },
  ]);
  const [animatedIndices, setAnimatedIndices] = useState<Set<number>>(() => new Set([0]));
  const [messageTimestamps, setMessageTimestamps] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentAccent } = useAccent();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Client-Side Rate Limiting: Max 5 messages per minute
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentMessages = messageTimestamps.filter((t) => t > oneMinuteAgo);

    if (recentMessages.length >= 5) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content:
            'RATE_LIMIT_EXCEEDED: You are sending requests too fast. Please wait a few seconds.',
        },
      ]);
      return;
    }

    setMessageTimestamps([...recentMessages, now]);

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages.filter((m) => m.role !== 'model' || !m.content.startsWith('Kamusta!')),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'model', content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'ERROR_CONNECTION: Network socket disconnected. Please try again later.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Terminal Trigger Button */}
      <motion.button
        className="cursor-target fixed bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-3 rounded-full shadow-2xl text-primary-foreground z-50 flex items-center gap-2.5 font-mono text-xs font-semibold  hover:scale-105 transition-transform active:scale-95 border border-primary/30"
        style={{ backgroundColor: currentAccent }}
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        aria-label="Open terminal AI assistant"
      >
        <Terminal size={18} className="animate-pulse" />
        <span>./nova-ai</span>
        <span className="size-2 rounded-full bg-emerald-400 animate-ping ml-0.5" />
      </motion.button>

      {/* Terminal Chat Window */}
      <motion.div
        initial={false}
        animate={
          isOpen
            ? { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' }
            : { opacity: 0, y: 20, scale: 0.95, pointerEvents: 'none' }
        }
        transition={{ duration: 0.2 }}
        className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:w-[27rem] h-[calc(100dvh-2rem)] sm:h-[33.75rem] max-h-[85dvh] bg-card/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden font-mono"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal AI assistant chat"
      >
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-muted/50 border-b border-border/70 flex items-center justify-between select-none">
          {/* Traffic light dots */}
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* Title */}
          <div className="flex items-center gap-1.5 text-xs text-foreground font-semibold">
            <Terminal size={13} className="text-primary" />
            <span>nova-ai --interactive (v2.5)</span>
          </div>

          {/* Close / Minimize button */}
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-target p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close terminal assistant"
          >
            <X size={16} />
          </button>
        </div>

        {/* Subheader Prompt Banner: Draggable */}
        <div className="px-4 py-2 bg-muted/20 border-b border-border/40 text-[11px] text-muted-foreground flex items-center justify-between gap-2 select-none overflow-hidden">
          <div
            ref={promptScrollRef}
            className="flex items-center gap-1 overflow-x-auto whitespace-nowrap no-scrollbar flex-1 select-none"
          >
            <span className="text-primary font-bold shrink-0 pointer-events-none">eli@portfolio</span>
            <span className="shrink-0 pointer-events-none">:</span>
            <span className="text-primary/70 shrink-0 pointer-events-none">~</span>
            <span className="shrink-0 pointer-events-none">$</span>
            <span className="font-semibold text-foreground shrink-0 pointer-events-none">nova-ai --listen</span>
          </div>
          <TerminalBadge variant="success" label="ONLINE" pulse className="shrink-0 pointer-events-none" />
        </div>

        {/* Messages Area */}
        <MessageScrollerProvider>
          <MessageScroller className="flex-1 overflow-hidden bg-card/50">
            <MessageScrollerViewport data-lenis-prevent>
              <MessageScrollerContent className="p-4 gap-3">
                {messages.map((msg, idx) => {
                  const isUser = msg.role === 'user';
                  const isLastUserMessage =
                    isUser && idx === messages.map((m) => m.role).lastIndexOf('user');

                  return (
                    <MessageScrollerItem key={idx}>
                      <div
                        className={`flex flex-col text-xs leading-relaxed ${
                          isUser ? 'items-end' : 'items-start'
                        }`}
                      >
                        {/* Prompt origin label */}
                        <span className="text-[10px] text-muted-foreground mb-1 font-semibold">
                          {isUser ? 'user:~$ query' : 'nova@ai:~$ response'}
                        </span>

                        <div
                          className={`rounded-lg max-w-[90%] select-text ${
                            isUser
                              ? 'bg-primary text-primary-foreground border-primary/20 shadow-xs'
                              : 'bg-muted/40 text-foreground border-border/60 shadow-xs'
                          }`}
                        >
                          <AnimatedMessage
                            content={msg.content}
                            isBot={msg.role === 'model'}
                            animate={!animatedIndices.has(idx)}
                            onAnimationComplete={() =>
                              setAnimatedIndices((prev) => {
                                if (prev.has(idx)) return prev;
                                const next = new Set(prev);
                                next.add(idx);
                                return next;
                              })
                            }
                          />
                        </div>

                        {/* Seen footer */}
                        {isLastUserMessage && !isLoading && (
                          <span className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                            <CheckCheck size={12} className="text-emerald-500" />
                            <span>EXIT_CODE: 0 (SENT)</span>
                          </span>
                        )}
                      </div>
                    </MessageScrollerItem>
                  );
                })}

                {isLoading && (
                  <MessageScrollerItem>
                    <div className="flex flex-col items-start text-xs">
                      <span className="text-[10px] text-primary mb-1 animate-pulse font-semibold">
                        nova@ai:~$ streaming response...
                      </span>
                      <div className="p-2.5 rounded-lg bg-muted/40 text-foreground border border-border/60">
                        <TypingIndicator />
                      </div>
                    </div>
                  </MessageScrollerItem>
                )}
                <div ref={messagesEndRef} />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="p-3 border-t border-border/60 bg-muted/30 flex gap-2 items-center shrink-0"
        >
          <span className="text-xs text-primary font-bold pl-1 hidden sm:inline">input:~$</span>
          <label htmlFor="chat-input" className="sr-only">
            Type a message to the assistant
          </label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command or ask a question..."
            className="flex-1 bg-card text-foreground text-xs rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary border border-border/70 font-mono transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="cursor-target px-3.5 py-2.5 rounded-lg flex items-center gap-1.5 text-xs text-primary-foreground font-semibold disabled:opacity-40 disabled:cursor-not-allowed  transition-all hover:brightness-110 active:scale-95 shrink-0"
            style={{ backgroundColor: currentAccent }}
            aria-label="Send message"
          >
            <span>SEND</span>
            <Send size={13} />
          </button>
        </form>
      </motion.div>
    </>
  );
};

export default ChatWidget;
