/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.vue',
  ],
  theme: {
    fontFamily: {
      icon: '"EsquireGenericGamepdFont_CL", "EsquireGenericGamepdFont_CS"',
    },
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
      'base': '#000000',
      'secondary': '#ffffff',
      'background': '#d7d7d7',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

