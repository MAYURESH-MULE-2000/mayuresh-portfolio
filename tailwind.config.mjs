/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-black': '#1C1B1B',
        'primary-white': '#FFFFFF',
      },
      backgroundColor: {
        light: '#FFFFFF',
        dark: '#1C1B1B',
      },
      textColor: {
        light: '#1C1B1B',
        dark: '#FFFFFF',
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
