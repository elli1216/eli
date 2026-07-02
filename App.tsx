import React from 'react';
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
import { AccentProvider } from './contexts/AccentContext';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AccentProvider>
        <SmoothScroll>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="grow">
              <Hero />
              <Projects />
              <Skills />
              <Experience />
              <Certificates />
              <About />
              <Contact />
            </main>
            <Footer />
            <BackToTop />
          </div>
        </SmoothScroll>
      </AccentProvider>
    </ThemeProvider>
  );
};

export default App;