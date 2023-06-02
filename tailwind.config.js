/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [require('daisyui')],
};
