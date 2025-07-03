'use client'; // This directive marks the component as a Client Component

import React, { useEffect } from 'react';
// Removed: import { useRouter } from 'next/navigation'; // Corrected import for App Router

// This component will be the default export for your Next.js root page
export default function Home() {
  // Removed: const router = useRouter(); // Initialize the router hook

  // useEffect hook to handle system theme preference (light/dark mode)
  useEffect(() => {
    // Check if the user's system prefers dark mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to apply the theme based on the media query result
    const applyTheme = () => {
      if (mediaQuery.matches) {
        // If dark mode is preferred, add the 'dark' class to the HTML element
        document.documentElement.classList.add('dark');
      } else {
        // Otherwise, remove the 'dark' class (for light mode)
        document.documentElement.classList.remove('dark');
      }
    };

    // Apply the theme immediately when the component mounts
    applyTheme();

    // Add an event listener to react to changes in the system's theme preference
    const listener = (event) => applyTheme();
    mediaQuery.addEventListener('change', listener);

    // Cleanup function: remove the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Function to handle the click event on the circle, navigating to the blog page
  const handleEnterClick = () => {
    window.location.href = '/blog'; // Reverted to generic navigation to fix compilation issue
  };

  return (
    // Main container for the component, covering the full screen height
    // and centering its content using flexbox.
    // Background color adapts to light (white) or dark (gray-900) theme.
    <div className="min-h-screen flex items-center justify-center bg-brand-background-light-300 dark:bg-brand-background-dark-950 transition-colors duration-500">
      {/*
        The pulsating circle element.
        - rounded-full: Makes it a perfect circle.
        - w-48 h-48: Sets a fixed size for the circle.
        - bg-blue-500: Sets the background color of the circle.
        - text-white: Sets the text color inside the circle.
        - flex items-center justify-center: Centers the text vertically and horizontally.
        - text-xl font-bold: Styles the text.
        - cursor-pointer: Indicates it's clickable.
        - shadow-lg: Adds a subtle shadow.
        - hover:scale-105: Slight scale effect on hover for interactivity.
        - transition-transform duration-300: Smooth transition for hover effect.
        - animate-[pulse-medium_2s_infinite_ease-in-out]: Applies a custom pulsation animation.
          Note: The keyframe animation 'pulse-medium' is defined globally via a style tag below.
      */}
      <button
        onClick={handleEnterClick}
        className="rounded-full w-64 h-64 bg-brand-highlight-400 dark:bg-brand-background-dark-900 flex items-center justify-center text-xl font-nav cursor-pointer shadow-lg hover:scale-105 transition-transform duration-300
                   animate-[pulse-medium_2s_infinite_ease-in-out]"
        aria-label="Enter the Blog" // Accessibility label for the button
      >
        Enter the Blog
      </button>

      {/*
        Inline style block for custom keyframe animation.
        This is necessary because Tailwind CSS by default doesn't allow defining
        arbitrary keyframes directly within utility classes.
      */}
      <style>
        {`
          @keyframes pulse-medium {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05); /* Slightly larger */
              opacity: 0.8; /* Slightly transparent */
            }
          }
        `}
      </style>
    </div>
  );
}
