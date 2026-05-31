/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'Orbitron', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
