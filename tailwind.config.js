/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.vue',
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'black': '#000000',
      'white': '#ffffff',
      'base': 'var(--primary-color)',
      'secondary': 'var(--secondary-color)',
      'background': 'var(--background-color)',
      'background-light': 'var(--background-light-color)',
      'icon': 'var(--icon-color)'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

