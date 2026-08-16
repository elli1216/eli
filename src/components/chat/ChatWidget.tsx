import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, CheckCheck } from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';
import TypingIndicator from './TypingIndicator';
import AnimatedMessage from './AnimatedMessage';
import type { Message as MessageType } from '@/types/types';
import { Message, MessageAvatar, MessageContent, MessageFooter } from '@/components/ui/message';
import { MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton } from '@/components/ui/message-scroller';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    { role: 'model', content: "Hi Kamusta?! I'm Nova, Eli's portfolio assistant. Ask me anything about his skills, experience, or projects!" }
  ]);
  const animatedIndicesRef = useRef<Set<number>>(new Set([0]));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Client-Side Rate Limiting: Max 5 messages per minute
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentMessages = messageTimestamps.filter(t => t > oneMinuteAgo);
    
    if (recentMessages.length >= 5) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "You're sending messages too fast! Please wait a moment before asking again." 
      }]);
      return;
    }

    setMessageTimestamps([...recentMessages, now]);

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages.filter(m => m.role !== 'model' || !m.content.startsWith("Hi! I'm Nova"))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 p-4 rounded-full shadow-2xl text-white z-50 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform active:scale-95 group"
        style={{ backgroundColor: currentAccent }}
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <div className="relative">
          <MessageCircle size={28} className="transition-transform group-hover:rotate-12" />
          {/* Online Indicator Badge on FAB */}
          <div className="absolute -top-1 -right-1">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-white/20" style={{ borderColor: currentAccent }}></span>
            </span>
          </div>
        </div>
      </motion.button>

      {/* Chat Window */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' } : { opacity: 0, y: 20, scale: 0.95, pointerEvents: 'none' }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:w-100 h-[calc(100dvh-2rem)] sm:h-125 max-h-[85dvh] bg-card border border-border/50 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div 
          className="p-4 mb-4 flex items-center justify-between text-white shadow-md z-10 rounded-t-2xl relative overflow-hidden shrink-0"
          style={{ backgroundColor: currentAccent }}
        >
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
                <Bot size={22} className="text-white" />
              </div>
              {/* Online Indicator */}
              <div className="absolute -bottom-0.5 -right-0.5">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-white/50" style={{ borderColor: currentAccent }}></span>
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-tight drop-shadow-sm">Nova</span>
              <span className="text-[11px] text-white/90 font-medium flex items-center gap-1 opacity-90">
                Always online
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="relative z-10 hover:bg-black/20 p-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <MessageScrollerProvider>
          <MessageScroller className="flex-1 overflow-hidden">
            <MessageScrollerViewport data-lenis-prevent>
              <MessageScrollerContent className="p-4 gap-4">
                {messages.map((msg, idx) => {
                  const isUser = msg.role === 'user';
                  const isLastUserMessage = isUser && idx === messages.map(m => m.role).lastIndexOf('user');
                  
                  return (
                  <MessageScrollerItem key={idx}>
                    <Message align={isUser ? "end" : "start"}>
                      <MessageAvatar className={isUser ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary text-secondary-foreground border border-border/50"}>
                        {isUser ? <User size={15} /> : <Bot size={15} />}
                      </MessageAvatar>
                      <MessageContent className="max-w-[85%]">
                        <div className={isUser ? "ml-auto" : ""}>
                          <AnimatedMessage 
                            content={msg.content} 
                            isBot={msg.role === 'model'} 
                            animate={!animatedIndicesRef.current.has(idx)}
                            onAnimationComplete={() => animatedIndicesRef.current.add(idx)}
                          />
                        </div>
                        {/* Seen Indicator for the last user message */}
                        {isLastUserMessage && !isLoading && (
                          <MessageFooter className="mt-[-5px] gap-1 text-[11px] opacity-80">
                            <CheckCheck size={14} className="text-primary" />
                            <span>Seen</span>
                          </MessageFooter>
                        )}
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                )})}
                
                {isLoading && (
                  <MessageScrollerItem>
                    <Message align="start">
                      <MessageAvatar className="bg-secondary text-secondary-foreground border border-border/50">
                        <Bot size={15} />
                      </MessageAvatar>
                      <MessageContent className="max-w-[85%]">
                        <div className="p-3 rounded-2xl bg-secondary/80 backdrop-blur-sm text-secondary-foreground rounded-tl-sm overflow-hidden shadow-sm border border-border/50 flex items-center justify-center min-w-12 w-fit">
                          <TypingIndicator />
                        </div>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                )}
                <div ref={messagesEndRef} />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-border/50 bg-background flex gap-2 items-center shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Nova about Eli..."
            className="flex-1 bg-secondary/50 text-foreground text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-border/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-transform hover:scale-105 active:scale-95 shrink-0 shadow-sm"
            style={{ backgroundColor: currentAccent }}
          >
            <Send size={16} className="-ml-0.5" />
          </button>
        </form>
      </motion.div>
    </>
  );
};
