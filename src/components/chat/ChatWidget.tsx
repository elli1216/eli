import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';
import TypingIndicator from './TypingIndicator';
import AnimatedMessage from './AnimatedMessage';
import { Message } from '@/types/types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi! I'm Eli's portfolio assistant. Ask me anything about his skills, experience, or projects!" }
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
          history: messages.filter(m => m.role !== 'model' || m.content !== "Hi! I'm Eli's portfolio assistant. Ask me anything about his skills, experience, or projects!")
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
        className="fixed bottom-6 left-6 p-4 rounded-full shadow-lg text-white z-50 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
        style={{ backgroundColor: currentAccent }}
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' } : { opacity: 0, y: 20, scale: 0.95, pointerEvents: 'none' }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-6 left-6 w-85 sm:w-100 h-125 max-h-[80vh] bg-card border border-border/50 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div 
          className="p-4 flex items-center justify-between text-white"
          style={{ backgroundColor: currentAccent }}
        >
          <div className="flex items-center gap-2 font-bold">
            <Bot size={20} />
            Portfolio Assistant
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="hover:bg-black/20 p-1 rounded-md transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 flex flex-col gap-4" data-lenis-prevent>
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary/20 text-secondary' : 'bg-secondary text-secondary-foreground'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <AnimatedMessage 
                content={msg.content} 
                isBot={msg.role === 'model'} 
                animate={!animatedIndicesRef.current.has(idx)}
                onAnimationComplete={() => animatedIndicesRef.current.add(idx)}
              />
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 max-w-[85%] self-start">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="p-3 rounded-2xl bg-secondary text-secondary-foreground rounded-tl-sm flex items-center justify-center min-w-12">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-border/50 bg-background/50 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Eli's experience..."
            className="flex-1 bg-secondary text-foreground text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-transform hover:scale-105 active:scale-95 shrink-0"
            style={{ backgroundColor: currentAccent }}
          >
            <Send size={16} />
          </button>
        </form>
      </motion.div>
    </>
  );
};
