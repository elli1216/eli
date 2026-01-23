import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-accent border-t text-center">
      <p className="text-muted-foreground">
        © {new Date().getFullYear()} Eli. All rights reserved. Built with React, TypeScript and
        {" "}
        <a href="https://www.reactbits.dev/" target='blank' className='text-blue-500 underline'>ReactBits.</a>
      </p>
    </footer>
  );
};