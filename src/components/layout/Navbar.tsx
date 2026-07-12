import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Palette } from 'lucide-react';
import { NAV_ITEMS, ACCENT_COLORS } from '@/constants/constants';
import { motion } from 'framer-motion';
import { useAccent } from '@/contexts/AccentContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SectionTitle } from './SectionTitle';

export const Navbar = () => {
  const { accentColor, setAccentColor } = useAccent();
  const { darkMode, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

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
          <SectionTitle textSize='2xl'>Eli</SectionTitle>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 relative">
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
          <div className="flex items-center gap-1">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
              aria-label="Toggle Theme"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <div className="relative">
              <motion.button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Palette size={20} />
              </motion.button>
              {showColorPicker && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-full mt-2 p-3 bg-card border border-border rounded-lg shadow-lg flex gap-2"
                >
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setAccentColor(color.name);
                        setShowColorPicker(false);
                      }}
                      className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${accentColor === color.name ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''
                        }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Set accent color to ${color.name}`}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
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
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Palette size={20} />
          </motion.button>
          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-16 right-6 p-3 bg-card border border-border rounded-lg shadow-lg flex gap-2"
            >
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setAccentColor(color.name);
                    setShowColorPicker(false);
                  }}
                  className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${accentColor === color.name ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''
                    }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Set accent color to ${color.name}`}
                />
              ))}
            </motion.div>
          )}
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