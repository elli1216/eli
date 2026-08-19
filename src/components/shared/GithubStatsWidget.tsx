import React, { useRef, useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { GitCommitHorizontal, Github, ExternalLink, BookMarked, ArrowUpRight, Users } from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';
import { useTheme } from '@/contexts/ThemeContext';
import { DecorativeFrame } from './DecorativeFrame';

interface GithubUser {
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export const GithubStatsWidget: React.FC = () => {
  const { currentAccent } = useAccent();
  const { darkMode } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [userStats, setUserStats] = useState<GithubUser | null>(null);
  const [streakUrl, setStreakUrl] = useState<string>('');
  const [streakLoading, setStreakLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/elli1216')
      .then((res) => res.json())
      .then((data) => {
        setUserStats(data);
      })
      .catch((err) => console.error('Failed to fetch github stats:', err));
  }, []);

  // Update Streak Stats card URL with cache-buster whenever accent or theme changes
  useEffect(() => {
    const cleanHex = currentAccent.replace('#', '');
    const textColor = darkMode ? '9ca3af' : '475569';
    const numColor = darkMode ? 'f3f4f6' : '0f172a';
    
    setStreakLoading(true);
    setStreakUrl(
      `https://github-readme-streak-stats.herokuapp.com/?user=elli1216&theme=transparent&hide_border=true&ring=${cleanHex}&fire=${cleanHex}&currStreakLabel=${cleanHex}&currStreakNum=${numColor}&sideNums=${numColor}&sideLabels=${textColor}&dates=${textColor}&_t=${Date.now()}`
    );
  }, [currentAccent, darkMode]);

  // Dynamic theme colors that scale from inactive to full accent
  const calendarTheme = {
    light: [
      '#ebedf0',
      `${currentAccent}35`,
      `${currentAccent}70`,
      `${currentAccent}aa`,
      currentAccent,
    ],
    dark: [
      '#161b22',
      `${currentAccent}35`,
      `${currentAccent}70`,
      `${currentAccent}aa`,
      currentAccent,
    ],
  };

  // Auto-scroll the calendar to the right (latest activity) on mobile screens
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github size={18} className="text-primary" />
          <h3 className="text-base font-semibold text-foreground">GitHub Activity</h3>
        </div>
        <a
          href="https://github.com/elli1216"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors group"
        >
          <span>@elli1216</span>
          <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* GitHub Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Streak Stats Card */}
        <DecorativeFrame accentColor={currentAccent} className="h-fit">
          <div className="flex items-center justify-center p-2 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/40 transition-all duration-300 h-full min-h-40 overflow-hidden">
            {streakUrl && (
              <img
                key={streakUrl}
                src={streakUrl}
                alt="GitHub Streak Stats"
                className={`w-full max-w-100 h-auto object-contain transition-opacity duration-300 ${
                  streakLoading ? 'opacity-40 animate-pulse' : 'opacity-100'
                }`}
                onLoad={() => setStreakLoading(false)}
                loading="eager"
              />
            )}
          </div>
        </DecorativeFrame>

        {/* Repositories & Profile Stats Card */}
        <DecorativeFrame accentColor={currentAccent} className="h-fit">
          <div className="flex flex-col justify-between p-5 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/40 transition-all duration-300 h-full min-h-40">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="size-11 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                >
                  <BookMarked size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Public Repos</p>
                  <p className="text-2xl font-bold text-foreground leading-none mt-1">
                    {userStats ? userStats.public_repos : '...'}
                  </p>
                </div>
              </div>

              {userStats && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full border border-border/40">
                  <Users size={13} className="text-primary" />
                  <span><strong className="text-foreground">{userStats.followers}</strong> followers</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Explore open-source repositories</span>
              <a
                href="https://github.com/elli1216?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium transition-colors"
              >
                <span>View Repos</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </DecorativeFrame>
      </div>

      {/* Interactive Contribution Calendar */}
      <DecorativeFrame accentColor={currentAccent}>
        <div className="p-5 md:p-6 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/40 hover:bg-card transition-all duration-300 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <GitCommitHorizontal size={16} className="text-primary" />
            <h4 className="text-xs text-foreground uppercase tracking-widest font-bold">Contribution Graph</h4>
          </div>

          <div className="relative w-full">
            {/* Scroll fade gradients for mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-linear-to-r from-card/80 to-transparent z-10 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-linear-to-l from-card/80 to-transparent z-10 pointer-events-none md:hidden" />

            <div
              ref={scrollRef}
              className="w-full overflow-x-auto scrollbar-none flex justify-start md:justify-center pb-1 text-xs text-muted-foreground [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="min-w-180 md:min-w-0 md:w-full flex justify-center">
                <GitHubCalendar
                  username="elli1216"
                  colorScheme={darkMode ? 'dark' : 'light'}
                  theme={calendarTheme}
                  blockSize={13}
                  blockMargin={4}
                  fontSize={12}
                />
              </div>
            </div>
          </div>
        </div>
      </DecorativeFrame>
    </div>
  );
};
