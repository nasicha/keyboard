/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    fontFamily: {
      icon: '"EsquireGenericGamepdFont_CL", "EsquireGenericGamepdFont_CS"',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

