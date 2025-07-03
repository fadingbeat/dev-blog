// tailwind.config.js
/** @type {import('tailwindcss').Config} */ // This JSDoc comment provides type hints for VS Code without requiring TypeScript
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'media', // Ensure this is set for system theme detection
  theme: {
    extend: {
      colors: {
        // Your Custom Color Palettes
        // Each palette is named semantically and contains all shades 50-950

        // Haiti Palette (for dark backgrounds, borders, or very dark text)
        'brand-background-dark': {
          50: '#ebe7ff',
          100: '#dbd3ff',
          200: '#c0afff',
          300: '#9f7fff',
          400: '#8e4eff',
          500: '#8826ff',
          600: '#8a01ff',
          700: '#8500ff',
          800: '#7000d5',
          900: '#590aa5',
          950: '#1a032e', // This is your original #1a032e (very dark purple)
        },

        // Your light background palette
        'brand-background-light': {
          50: '#f7f7f7', // This is the truly light background color we'll use for light theme
          100: '#ededed',
          200: '#d9d9d9',
          300: '#c8c8c8',
          400: '#adadad',
          500: '#999999',
          600: '#888888',
          700: '#7b7b7b',
          800: '#676767',
          900: '#545454', // Dark gray, suitable for dark text on light backgrounds
          950: '#363636', // Even darker, good for very dark text/elements
        },

        // Purple Palette (your main vibrant brand color for headings, buttons, links)
        'brand-primary': {
          // These shades should be LIGHT for use on DARK backgrounds (e.g., in dark theme)
          50: '#faf5ff', // Very light purple, good for main titles in dark mode
          100: '#f3e7ff', // Light purple, good for general text in dark mode
          200: '#e9d4ff', // Slightly more distinct light color (e.g., meta info in dark mode)
          300: '#d7b2ff', // Light-ish accent

          // These shades should be DARK for use on LIGHT backgrounds (e.g., in light theme)
          400: '#bf80ff', // Lighter dark purple (e.g., borders in light mode, if needed)
          500: '#a650fc', // Medium purple (e.g., meta info in light mode)
          600: '#912df0', // Darker purple (e.g., secondary text in light mode)
          700: '#7c1cd4', // Main body text color in light mode (dark purple)
          800: '#641ba3', // Even darker purple (e.g., hover states in light mode)
          900: '#57188b', // Very dark purple (e.g., main headings in light mode)
          950: '#3a0467', // Purest dark purple if you need it
        },

        // Amethyst Palette (for text highlighting, secondary accents)
        'brand-highlight': {
          // For Dark Theme (on dark background, need light highlight)
          50: '#faf5ff',
          100: '#f4e8ff',
          200: '#ebd5ff',
          300: '#dab4fe', // Lighter highlight for dark mode
          400: '#c184fc', // Main highlight for dark mode buttons/links

          // For Light Theme (on light background, need dark highlight)
          500: '#a855f7', // Your existing middle highlight
          600: '#9133ea', // Darker highlight for light mode buttons/links
          700: '#7a22ce',
          800: '#6621a8', // Even darker highlight for light mode
          900: '#531c87',
          950: '#370764',
        },
      },

      // Custom Fonts
      fontFamily: {
        // Display font for Titles and Subtitles
        display: ['var(--font-poetsen-one)', 'sans-serif'], // Use CSS variable
        // Body font for general text (e.g., paragraphs)
        body: ['var(--font-raleway)', 'sans-serif'], // Use CSS variable
        // Navigation font
        nav: ['var(--font-poppins)', 'sans-serif'], // Use CSS variable
        footer: ['var(--font-roboto)', 'Helvetica', 'Arial', 'sans-serif'], // Use CSS variable
      },

      // THIS IS CRITICAL FOR MARKDOWN STYLING
      // tailwind.config.js - Only the typography part shown for clarity

      // THIS IS CRITICAL FOR MARKDOWN STYLING
      // tailwind.config.js - Only the typography part for clarity

      typography: ({ theme }) => ({
        // Default (light mode) typography styles - applied when system is LIGHT
        'brand-light': {
          css: {
            color: theme('colors.brand-primary.700'), // Main body text: Dark purple on light background
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.brand-primary.900'), // Headings: Very dark purple on light background
            },
            'code::before': { content: '""' }, // Remove default backticks
            'code::after': { content: '""' }, // Remove default backticks
            code: {
              color: theme('colors.brand-primary.700'), // Inline code text: Dark purple
              backgroundColor: theme('colors.brand-background-light.100'), // Inline code background: Light gray
              padding: '0.2em 0.4em',
              borderRadius: '0.3em',
            },
            pre: {
              // Code blocks
              backgroundColor: theme('colors.brand-background-light.950'), // Code block background: Very dark gray
              color: theme('colors.brand-primary.100'), // Code block text: Light purple (still quite bright for contrast on dark background)
            },
            a: {
              // Links
              color: theme('colors.brand-highlight.600'), // Links: Dark highlight
              '&:hover': {
                color: theme('colors.brand-highlight.800'),
              },
            },
            blockquote: {
              color: theme('colors.brand-primary.600'),
              borderLeftColor: theme('colors.brand-background-light.400'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.brand-primary.500'), // Light theme bullet color
            },
            'ol > li::before': {
              color: theme('colors.brand-primary.500'), // Light theme list number color
            },
            hr: {
              borderColor: theme('colors.brand-background-light.400'), // Light theme horizontal rule
            },
          },
        },
        // Dark mode typography styles - applied when system is DARK
        'brand-dark': {
          css: {
            // --- CHANGES START HERE FOR DARK THEME ---
            color: theme('colors.brand-primary.200'), // Main body text: Changed from 100 to 200 for less contrast
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.brand-primary.200'), // Headings: Changed from 50 to 100 for less contrast
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              color: theme('colors.brand-primary.200'), // Inline code text: Changed from 100 to 200 for consistency with body
              backgroundColor: theme('colors.brand-background-dark.900'), // Inline code background: Darker purple
              padding: '0.2em 0.4em',
              borderRadius: '0.3em',
            },
            pre: {
              // Code blocks - keeping high contrast here for code readability
              backgroundColor: theme('colors.brand-background-dark.800'), // Code block background: Lighter dark purple
              color: theme('colors.brand-primary.50'), // Code block text: Very light purple (no change here)
            },
            a: {
              // Links
              color: theme('colors.brand-highlight.400'), // Links: Lighter highlight
              '&:hover': {
                color: theme('colors.brand-highlight.300'),
              },
            },
            blockquote: {
              color: theme('colors.brand-primary.300'), // Changed from 200 to 300 for slightly more saturation/less brightness
              borderLeftColor: theme('colors.brand-background-dark.600'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.brand-primary.300'), // Changed from 200 to 300 for bullet color
            },
            'ol > li::before': {
              color: theme('colors.brand-primary.300'), // Changed from 200 to 300 for list number color
            },
            hr: {
              borderColor: theme('colors.brand-background-dark.600'), // Dark theme horizontal rule
            },
            // --- CHANGES END HERE ---
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

module.exports = config;
