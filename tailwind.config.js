/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
   './app/**/*.{js,ts,jsx,tsx,mdx}',
     './components/**/*.{js,ts,jsx,tsx,mdx}',
     './providers/**/*.{js,ts,jsx,tsx}',
  // Scans all files in the `src` directory
  ],
  theme: {
    extend: {    colors: {
      // Your color palette
      primary: {
        DEFAULT: 'var(--primary)',
        dark: 'var(--primary-dark)',
      },
      // ... other colors
    }, },
  },
  plugins: [],
};



