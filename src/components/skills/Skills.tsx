import StackIcon from 'tech-stack-icons';
import { SKILL_DATA } from '@/constants/constants';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { useAccent } from '@/contexts/AccentContext';
import { useTheme } from '@/contexts/ThemeContext';
import { TerminalSectionHeader, TerminalBadge } from '@/components/shared/terminal';

const SKILL_GROUPS = [
  { label: 'dependencies.frontend', display: 'Frontend & UI Architecture', key: 'frontend' as const, prefix: '├──' },
  { label: 'dependencies.backend', display: 'Backend & Enterprise Core', key: 'backend' as const, prefix: '├──' },
  { label: 'devDependencies.tools', display: 'DevOps, Tooling & Cloud', key: 'tools' as const, prefix: '└──' },
];

export const Skills = () => {
  const { currentAccent } = useAccent();
  const { darkMode } = useTheme();

  return (
    <Section id="skills">
      {/* Terminal Section Header */}
      <TerminalSectionHeader
        command="tree ./tech-stack --level=2"
        title="Tech Stack & Dependencies"
        description="Production dependencies, frameworks, databases, and enterprise runtime systems."
        executionTime="6ms"
      />

      <div className="space-y-10 font-mono">
        {SKILL_GROUPS.map((group) => {
          const skills = SKILL_DATA.filter((s) => s.category === group.key);
          if (skills.length === 0) return null;

          return (
            <div key={group.key} className="space-y-4">
              {/* Manifest Group Header */}
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-xs sm:text-sm">
                <span className="text-primary font-bold">{group.prefix}</span>
                <span className="text-foreground font-bold">{group.label}</span>
                <span className="text-muted-foreground hidden sm:inline">({group.display})</span>
                <div className="flex-1" />
                <TerminalBadge variant="neutral" label={`${skills.length} packages`} />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 pl-2 sm:pl-4 border-l border-dashed border-border/60 ml-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="h-full"
                  >
                    <DecorativeFrame accentColor={currentAccent} className="h-full">
                      <div className="group bg-card/90 rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2.5 justify-center min-h-[96px] h-full border border-border/50 transition-all hover:border-primary/50 hover:bg-muted/20">
                        {skill.icon ? (
                          <div className="size-8 sm:size-9 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                            <StackIcon name={skill.icon} variant={darkMode ? 'dark' : 'light'} />
                          </div>
                        ) : (
                          <span
                            className="size-8 sm:size-9 rounded-md flex items-center justify-center text-xs font-bold transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                          >
                            {skill.name.slice(0, 3).toUpperCase()}
                          </span>
                        )}
                        <span className="text-[11px] sm:text-xs text-center text-muted-foreground group-hover:text-foreground font-medium transition-colors leading-tight">
                          {skill.name}
                        </span>
                      </div>
                    </DecorativeFrame>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Skills;
