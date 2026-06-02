import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop'
import SmoothScroll from './SmoothScroll';
import { Certificates } from './components/Certificates';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [accentColor, setAccentColor] = useState(() => {
    const savedAccent = localStorage.getItem('accentColor');
    if (savedAccent) {
      return savedAccent;
    }
    return 'gray';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    root.classList.remove('accent-green', 'accent-blue', 'accent-red', 'accent-orange', 'accent-purple', 'accent-gray');
    root.classList.add(`accent-${accentColor}`);
    localStorage.setItem('accentColor', accentColor);
  }, [darkMode, accentColor]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const setAccent = (color: string) => {
    setAccentColor(color);
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} accentColor={accentColor} setAccent={setAccent} />
        <main className="grow">
          <Hero accentColor={accentColor} />
          <Experience accentColor={accentColor} />
          <Skills darkMode={darkMode} accentColor={accentColor} />
          <Projects accentColor={accentColor} />
          <Certificates accentColor={accentColor} />
          <About />
          <Contact accentColor={accentColor} />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </SmoothScroll>
  );
};

export default App;