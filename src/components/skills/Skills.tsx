import { useState } from 'react';
import StackIcon from 'tech-stack-icons';
import { SKILL_DATA } from '@/constants/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { useTheme } from '@/contexts/ThemeContext';
import {
  TerminalSectionHeader,
  TerminalWindow,
  TerminalBadge,
  TerminalButton,
} from '@/components/shared/terminal';
import { Code2, Server, Wrench, CheckCircle2 } from 'lucide-react';

type CategoryFilter = 'all' | 'frontend' | 'backend' | 'tools';

interface CategoryConfig {
  key: 'frontend' | 'backend' | 'tools';
  title: 'Frontend & UI' | 'Backend & Core' | 'DevOps, Cloud & AI';
  icon: typeof Code2;
  windowTitle: string;
  command: string;
  description: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    key: 'frontend',
    title: 'Frontend & UI',
    icon: Code2,
    windowTitle: 'pkg://frontend-manifest.json',
    command: 'pnpm list --depth=0 --filter=ui',
    description: 'Modern component architectures, state engines, and reactive rendering.',
  },
  {
    key: 'backend',
    title: 'Backend & Core',
    icon: Server,
    windowTitle: 'sys://backend-runtime.d',
    command: 'mvn dependency:tree -Dscope=runtime',
    description: 'Distributed services, mainframe logic, databases, and microservice APIs.',
  },
  {
    key: 'tools',
    title: 'DevOps, Cloud & AI',
    icon: Wrench,
    windowTitle: 'cloud://infrastructure.conf',
    command: 'docker ps --format="{{.Names}}"',
    description: 'Containerization, cloud infrastructure, AI models, and CI/CD toolchains.',
  },
];

export const Skills = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');

  const visibleCategories =
    activeTab === 'all' ? CATEGORIES : CATEGORIES.filter((c) => c.key === activeTab);

  return (
    <Section id="skills">
      {/* Terminal Section Header */}
      <TerminalSectionHeader
        command="tree ./tech-stack --level=2 --classified"
        title="Tech Stack & Dependencies"
        description="Production dependencies, enterprise runtimes, databases, and AI tooling."
        executionTime="6ms"
      />

      {/* Category Filter CLI Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 font-mono text-xs">
        <TerminalButton
          command="--filter=all"
          active={activeTab === 'all'}
          size="sm"
          onClick={() => setActiveTab('all')}
        />
        <TerminalButton
          command="--filter=frontend"
          active={activeTab === 'frontend'}
          size="sm"
          onClick={() => setActiveTab('frontend')}
        />
        <TerminalButton
          command="--filter=backend"
          active={activeTab === 'backend'}
          size="sm"
          onClick={() => setActiveTab('backend')}
        />
        <TerminalButton
          command="--filter=tools"
          active={activeTab === 'tools'}
          size="sm"
          onClick={() => setActiveTab('tools')}
        />
      </div>

      {/* 3-Column Terminal Panes */}
      <div
        className={`grid gap-6 font-mono items-stretch ${
          activeTab === 'all' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 max-w-2xl mx-auto'
        }`}
      >
        <AnimatePresence mode="popLayout">
          {visibleCategories.map((category, catIndex) => {
            const skills = SKILL_DATA.filter((s) => s.category === category.key);
            const CategoryIcon = category.icon;

            return (
              <motion.div
                key={category.key}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: catIndex * 0.08 }}
                className="h-fit flex flex-col"
              >
                <TerminalWindow
                  title={category.windowTitle}
                  command={category.command}
                  className="h-full flex flex-col shadow-xl"
                  bodyClassName="p-5 flex flex-col flex-1 justify-between gap-4 font-mono"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-border/40 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-lg flex items-center justify-center border border-primary/20 bg-primary/10 text-primary">
                        <CategoryIcon size={16} />
                      </div>
                      <div>
                        <h3 className="font-bold text-xs sm:text-sm text-foreground">
                          {category.title}
                        </h3>
                        <span className="text-[10px] text-muted-foreground block">
                          {skills.length} packages listed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills List Items */}
                  <div className="space-y-2 flex-1">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: index * 0.02 }}
                        whileHover={{ x: 3 }}
                        className="group flex items-center justify-between p-2 rounded-lg bg-muted/20 hover:bg-muted/40 border border-border/40 hover:border-primary/40 transition-all text-xs select-none"
                      >
                        {/* Left: Icon + Skill Name */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-muted-foreground font-mono text-[11px] group-hover:text-primary">
                            ›
                          </span>
                          <div className="size-5 shrink-0 flex items-center justify-center">
                            {skill.icon ? (
                              <StackIcon
                                name={skill.icon}
                                variant={darkMode ? 'dark' : 'light'}
                                className="size-4.5"
                              />
                            ) : (
                              <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-primary/15 text-primary">
                                {skill.name.slice(0, 3)}
                              </span>
                            )}
                          </div>
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                            {skill.name}
                          </span>
                        </div>

                        {/* Right: Telemetry Tag */}
                        <div className="shrink-0 ml-2">
                          {skill.render ? (
                            <TerminalBadge variant="success" label="CORE" pulse />
                          ) : (
                            <span className="text-[10px] text-muted-foreground font-mono group-hover:text-foreground">
                              [installed]
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Terminal Card Footer */}
                  <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                    <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                      <CheckCircle2 size={11} />
                      <span>RESOLVED</span>
                    </span>
                    <span>{skills.filter((s) => s.render).length} primary strengths</span>
                  </div>
                </TerminalWindow>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </Section>
  );
};

export default Skills;
