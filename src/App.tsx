import React, { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { SectionLoader } from '@/components/layout/SectionLoader';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/layout/BackToTop';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { AccentProvider } from '@/contexts/AccentContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotFound } from '@/components/home/NotFound';

const About = React.lazy(() => import('@/components/about/About').then(m => ({ default: m.About })));
const Experience = React.lazy(() => import('@/components/experience/Experience').then(m => ({ default: m.Experience })));
const Hackathons = React.lazy(() => import('@/components/hackathons/Hackathons').then(m => ({ default: m.Hackathons })));
const Projects = React.lazy(() => import('@/components/projects/Projects').then(m => ({ default: m.Projects })));
const Skills = React.lazy(() => import('@/components/skills/Skills').then(m => ({ default: m.Skills })));
const Contact = React.lazy(() => import('@/components/contact/Contact').then(m => ({ default: m.Contact })));
const Certificates = React.lazy(() => import('@/components/certificates/Certificates').then(m => ({ default: m.Certificates })));

const ChatWidget = React.lazy(() => import('@/components/chat/ChatWidget').then(m => ({ default: m.ChatWidget })));

const App: React.FC = () => {
  const isNotFound = window.location.pathname !== '/';

  return (
    <ThemeProvider>
      <AccentProvider>
        <SmoothScroll>
          {isNotFound ? (
            <NotFound />
          ) : (
            <div className="min-h-dvh w-full overflow-x-hidden flex flex-col">
              <Navbar />
              <main className="grow">
                <Hero />
                <Suspense fallback={<SectionLoader />}>
                  <About />
                  <Experience />
                  <Projects />
                  <Skills />
                  <Hackathons />
                  <Certificates />
                  <Contact />
                </Suspense>
              </main>
              <Footer />
              <BackToTop />
              <Suspense fallback={null}>
                <ChatWidget />
              </Suspense>
            </div>
          )}
        </SmoothScroll>
      </AccentProvider>
    </ThemeProvider>
  );
};

export default App;