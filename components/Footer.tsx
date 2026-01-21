import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-accent border-t border text-center">
      <p className="text-muted-foreground">
        © {new Date().getFullYear()} Eli. All rights reserved. Built with React & Tailwind.
      </p>
    </footer>
  );
};