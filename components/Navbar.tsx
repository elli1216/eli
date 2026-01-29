import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { motion } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-card/80 backdrop-blur-md shadow-sm border-b'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl font-bold text-foreground tracking-tighter"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Eli.
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1, color: "var(--primary)" }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
            aria-label="Toggle Theme"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden gap-4">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="text-muted-foreground"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-card border-b border px-6 py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-primary"
                whileHover={{ x: 10, color: "var(--primary)" }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
};