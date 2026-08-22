import React from 'react';
import { Section } from '@/components/layout/Section';
import { useAccent } from '@/contexts/AccentContext';
import { motion } from 'framer-motion';
import {
  Target,
  TrendingUp,
  Layers,
  GraduationCap,
  MapPin,
  Briefcase,
  Sparkles,
  ChessPawnIcon,
} from 'lucide-react';
import {
  EDUCATION,
  EXPERIENCE_DATA,
  EXPLORING,
  INTERESTS,
  PERSONAL_DATA,
} from '@/constants/constants';
import { GithubStatsWidget } from '@/components/shared/GithubStatsWidget';
import { TerminalSectionHeader, TerminalWindow, TerminalBadge } from '@/components/shared/terminal';

const VALUES = [
  {
    icon: Target,
    key: 'calm_flow',
    title: 'Challenge → Calm',
    service: 'calm-flow.service',
    status: 'ACTIVE',
    tag: 'RULE_01',
    description:
      'I take noisy, tangled problems and ship systems that feel effortless — turning chaos into something calm and dependable.',
    telemetry: 'LOAD: 0.04 · THREAD: 0x01',
  },
  {
    icon: TrendingUp,
    key: 'eval_growth',
    title: 'Feedback → Growth',
    service: 'continuous-eval.service',
    status: 'OPTIMIZED',
    tag: 'RULE_02',
    description:
      "I'm highly coachable. Every code review and industry benchmark is a chance to level up, not a critique to defend.",
    telemetry: 'ITER: 1,420+ · EPOCH: INF',
  },
  {
    icon: Layers,
    key: 'scale_arch',
    title: 'Complexity → Scalability',
    service: 'arch-opt.service',
    status: 'ENFORCED',
    tag: 'RULE_03',
    description:
      'I care about code that stays clean, type-safe, and maintainable long after launch — strict standards over quick shortcuts.',
    telemetry: 'DEBT: 0.0% · TYPE_SAFE: 100%',
  },
];

export const About: React.FC = () => {
  const { currentAccent } = useAccent();

  return (
    <Section id="about">
      {/* Section Header */}
      <TerminalSectionHeader
        command="curl -s https://api.elifloresca.dev/bio"
        title="About Me"
        description="A little bit about the engineer behind the console."
        executionTime="11ms"
      />

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Narrative Terminal Window */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-full flex"
        >
          <TerminalWindow title="engineer-manifest.md" command="cat summary.txt" className="h-fit">
            <div className="space-y-4 text-xs sm:text-sm font-mono text-muted-foreground leading-relaxed">
              <p>
                <span className="text-primary font-bold"># 01. Background & Education</span>
                <br />I am a <span className="text-primary font-semibold">
                  BSIT graduate
                </span> of{' '}
                <span className="text-primary font-semibold">Bulacan State University</span> from{' '}
                <span className="text-foreground font-medium">Marilao, Bulacan</span>, currently
                working as a{' '}
                <span className="text-primary font-semibold">{EXPERIENCE_DATA[0].role}</span> at{' '}
                <span className="text-foreground font-medium underline decoration-primary/50 underline-offset-4">
                  {EXPERIENCE_DATA[0].company}
                </span>
                .
              </p>
              <p>
                <span className="text-primary font-bold"># 02. Philosophy & Growth</span>
                <br />
                As a <span className="text-primary font-semibold">highly coachable developer</span>,
                I thrive on constructive feedback and industry-best practices to continuously
                sharpen my architecture skills.
              </p>
              <p>
                <span className="text-primary font-bold"># 03. Engineering Standards</span>
                <br />I bring hands-on project experience with a strict commitment to maintaining
                high standards for{' '}
                <span className="text-primary font-semibold">
                  code scalability, type safety, and runtime performance
                </span>{' '}
                across both modern cloud stacks and legacy systems.
              </p>
            </div>
          </TerminalWindow>
        </motion.div>

        {/* Right Column: Structured Telemetry JSON / Specs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="h-full flex"
        >
          <TerminalWindow
            title="telemetry-specs.json"
            command="jq '.profile' telemetry.json"
            className="h-fit"
          >
            <div className="space-y-2 font-mono">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/40">
                <div
                  className="size-9 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                >
                  <Briefcase size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    CURRENT_ROLE
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground">
                    {EXPERIENCE_DATA[0].role} @ {EXPERIENCE_DATA[0].company}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/40">
                <div
                  className="size-9 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                >
                  <GraduationCap size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    EDUCATION_CREDENTIAL
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground">
                    BSIT @ {EDUCATION.uninversity_attended}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/40">
                <div
                  className="size-9 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                >
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    PRIMARY_LOCATION
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground">
                    {PERSONAL_DATA.based_in}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/40">
                <div
                  className="size-9 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                >
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    CURRENTLY_EXPLORING
                  </p>
                  <p className="text-xs font-medium text-foreground">{EXPLORING.join(' · ')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/40">
                <div
                  className="size-9 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                >
                  <ChessPawnIcon size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    INTERESTS_AND_HOBBIES
                  </p>
                  <p className="text-xs font-medium text-foreground">{INTERESTS.join(' · ')}</p>
                </div>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>

      {/* What Drives Me: Core Principles */}
      <motion.div
        className="mt-16 sm:mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <TerminalSectionHeader
          command="cat /etc/core-principles.conf"
          title="What Drives Me"
          description="The engineering principles that keep me coding late into the night."
          executionTime="4ms"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full flex flex-col"
              >
                <TerminalWindow
                  title={`sysctl://${value.service}`}
                  command={`systemctl status ${value.service}`}
                  className="h-full flex flex-col shadow-md"
                  bodyClassName="p-5 flex flex-col flex-1 justify-between font-mono"
                >
                  <div className="space-y-4">
                    {/* Status & Tag */}
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className="size-9 rounded-lg flex items-center justify-center border border-primary/20"
                        style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground font-bold">
                          {value.tag}
                        </span>
                        <TerminalBadge variant="success" label={value.status} pulse />
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                        {value.title}
                      </h4>
                      <p className="text-[11px] text-primary/80 font-semibold mt-0.5">
                        daemon://{value.key}
                      </p>
                    </div>

                    {/* Code Block Description */}
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/40 text-xs text-muted-foreground leading-relaxed">
                      <span className="text-primary font-bold mr-1.5">#</span>
                      {value.description}
                    </div>
                  </div>

                  {/* Telemetry Footer */}
                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                    <span className="text-emerald-500 font-semibold">[ACTIVE_DAEMON]</span>
                    <span className="text-foreground/70">{value.telemetry}</span>
                  </div>
                </TerminalWindow>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* GitHub Activity & Stats */}
      <motion.div
        className="mt-16 sm:mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <TerminalSectionHeader
          command='git log --stat --author="elli1216"'
          title="GitHub Telemetry"
          description="Live commit frequency, streak diagnostics, and repository telemetry."
          executionTime="14ms"
        />
        <GithubStatsWidget />
      </motion.div>
    </Section>
  );
};

export default About;
