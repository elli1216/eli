import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

const AnimatedMessage: React.FC<{ 
  content: string; 
  isBot: boolean;
  animate?: boolean;
  onAnimationComplete?: () => void;
}> = ({ content, isBot, animate = true, onAnimationComplete }) => {
  const [displayedContent, setDisplayedContent] = useState(() => (isBot && animate ? '' : content));

  useEffect(() => {
    if (!isBot || !animate) {
      setDisplayedContent(content);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      // Reveal 3 characters at a time for smooth "typing" without breaking tags constantly
      setDisplayedContent(content.substring(0, i));
      i += 3;
      if (i > content.length) {
        setDisplayedContent(content);
        clearInterval(interval);
        onAnimationComplete?.();
      }
    }, 15);

    return () => clearInterval(interval);
  }, [content, isBot, animate]);

  if (!isBot) {
    return <div className="p-3 rounded-2xl text-sm bg-primary text-primary-foreground rounded-tr-sm">{content}</div>;
  }

  return (
    <div className="p-3 rounded-2xl text-sm bg-primary/10 text-secondary-foreground rounded-tl-sm overflow-hidden 
      [&>p]:mb-2 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&>li]:mb-1 [&>strong]:font-bold [&>a]:text-blue-500 [&>a]:underline"
    >
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:opacity-80 transition-opacity" {...props} />
          )
        }}
      >
        {displayedContent}
      </ReactMarkdown>
    </div>
  );
};

export default AnimatedMessage