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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <main className="grow">
          <Hero />
          <Experience />
          <Skills darkMode={darkMode} />
          <Projects />
          <Certificates />
          <About />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </SmoothScroll>
  );
};

export default App;