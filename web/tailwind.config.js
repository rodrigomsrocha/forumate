/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-text': '#ffffff',
        'secondary-text': '#c7c7c7',
        'primary-gray': '#070707',
        'secondary-gray': '#181818',
        'accent-yellow': '#ffcc4a',
        'accent-purple': '#c07ecf',
      },
    },
  },
  plugins: [],
}
