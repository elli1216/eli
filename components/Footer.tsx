import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-gray-100 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 text-center">
      <p className="text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Eli. All rights reserved. Built with React & Tailwind.
      </p>
    </footer>
  );
};