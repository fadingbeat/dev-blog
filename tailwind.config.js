// tailwind.config.js
/** @type {import('tailwindcss').Config} */ // This JSDoc comment provides type hints for VS Code without requiring TypeScript
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      // ... your theme extensions
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Still recommended for blog styling
  ],
};

module.exports = config; // Use module.exports for JS config files
