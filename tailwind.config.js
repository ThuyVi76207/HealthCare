/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './public/index.html',
    './src/*.js',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  mode: 'jit',
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [],
}
