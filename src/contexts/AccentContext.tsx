import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ACCENT_COLORS } from '@/constants/constants';

interface AccentContextValue {
  accentColor: string;
  setAccentColor: (color: string) => void;
  currentAccent: string;
}

const AccentContext = createContext<AccentContextValue | undefined>(undefined);

export const AccentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accentColor, setAccentColorState] = useState(() => {
    const saved = localStorage.getItem('accentColor');
    return saved || 'gray';
  });

  const currentAccent = ACCENT_COLORS.find(c => c.name === accentColor)?.value || '#71717a';

  const setAccentColor = useCallback((color: string) => {
    setAccentColorState(color);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('accent-green', 'accent-blue', 'accent-red', 'accent-orange', 'accent-purple', 'accent-gray');
    root.classList.add(`accent-${accentColor}`);
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor]);

  return (
    <AccentContext.Provider value={{ accentColor, setAccentColor, currentAccent }}>
      {children}
    </AccentContext.Provider>
  );
};

export const useAccent = (): AccentContextValue => {
  const context = useContext(AccentContext);
  if (!context) {
    throw new Error('useAccent must be used within an AccentProvider');
  }
  return context;
};
