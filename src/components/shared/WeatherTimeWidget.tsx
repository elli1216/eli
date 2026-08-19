import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';

export const WeatherTimeWidget: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', minute: '2-digit', hour12: true }) + ' PHT');
    }, 1000);
    
    setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', minute: '2-digit', hour12: true }) + ' PHT');

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=14.5995&longitude=120.9842&current_weather=true')
      .then(res => res.json())
      .then(data => {
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          code: data.current_weather.weathercode,
        });
      })
      .catch(console.error);
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return <Sun size={14} className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />;
    if (code >= 51 && code <= 99) return <CloudRain size={14} className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />;
    return <Cloud size={14} className="text-slate-400 drop-shadow-[0_0_8px_rgba(148,163,184,0.5)]" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative group cursor-default"
    >
      {/* Animated glow behind the widget */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
      
      <div className="relative flex items-center gap-4 text-xs font-medium bg-background/80 backdrop-blur-md border border-border/50 hover:border-primary/30 transition-colors px-4 py-2 rounded-full shadow-sm mb-4 md:mb-0">
        <div className="flex items-center gap-2 border-r border-border/50 pr-4">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </div>
          <span className="text-foreground tracking-widest font-semibold">{time || 'Loading...'}</span>
        </div>
        <div className="flex items-center gap-2">
          {weather ? (
            <>
              {getWeatherIcon(weather.code)}
              <span className="text-muted-foreground"><span className="text-foreground font-semibold">{weather.temp}°C</span> in Manila</span>
            </>
          ) : (
            <span className="text-muted-foreground animate-pulse">Fetching sky...</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
