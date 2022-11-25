/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': {'max':'968px'},
      'bigscreen': {'min':'1680px'},
    },
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'rubik' : ['Rubik', 'sans-serif'],
      },
      colors: {
        'bg-light': '#f8f5f2',
        'l-text': '#222525',
        'd-text': '#abd1c6',
        'bg-dark': '#004643',
        'buttonc': '#078080',
        'scolor': '#f45d48',
        'buttond': '#f9bc60',
        'sdarkc': '#abd1c6',
        'newbg': '#F3F1E4',
        'newtext': '#0A3534',
      },
    }
  },
  plugins: [],
}