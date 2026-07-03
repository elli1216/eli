import React, { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SectionLoader } from '@/components/SectionLoader';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import SmoothScroll from '@/SmoothScroll';
import { AccentProvider } from '@/contexts/AccentContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const About = React.lazy(() => import('@/components/About').then(m => ({ default: m.About })));
const Experience = React.lazy(() => import('@/components/Experience').then(m => ({ default: m.Experience })));
const Projects = React.lazy(() => import('@/components/Projects').then(m => ({ default: m.Projects })));
const Skills = React.lazy(() => import('@/components/Skills').then(m => ({ default: m.Skills })));
const Contact = React.lazy(() => import('@/components/Contact').then(m => ({ default: m.Contact })));
const Certificates = React.lazy(() => import('@/components/Certificates').then(m => ({ default: m.Certificates })));

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AccentProvider>
        <SmoothScroll>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="grow">
              <Hero />
              <Suspense fallback={<SectionLoader />}>
                <Projects />
                <Skills />
                <Experience />
                <Certificates />
                <About />
                <Contact />
              </Suspense>
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