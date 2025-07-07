'use client';

import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();
    const listener = () => applyTheme();
    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  const handleEnterClick = () => {
    window.location.href = '/blog';
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-background-light-300 dark:bg-brand-background-dark-950 transition-colors duration-500">
      {/* Main content centered vertically */}
      <main className="flex-grow flex items-center justify-center">
        <button
          onClick={handleEnterClick}
          className="rounded-full w-64 h-64 bg-brand-highlight-400 dark:bg-brand-background-dark-900 flex items-center justify-center text-xl font-nav cursor-pointer shadow-lg hover:scale-105 transition-transform duration-300 animate-[pulse-medium_2s_infinite_ease-in-out]"
          aria-label="Enter the Blog"
        >
          Enter the Blog
        </button>
      </main>

      {/* Footer at the bottom with centered link */}
      <footer className="py-4">
        <div className="text-center">
          <p>Expert Driven Web Development</p>
          <a
            href="https://www.vibeit.hr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary-900 dark:text-brand-primary-300 hover:underline"
          >
            www.vibeit.hr
          </a>
        </div>
      </footer>

      {/* Custom pulse animation */}
      <style>
        {`
          @keyframes pulse-medium {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
          }
        `}
      </style>
    </div>
  );
}
