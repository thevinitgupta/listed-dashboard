/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textColor : {
        link : "#346BD4",
        grey : "#858585",
        lightgrey : "#B0B0B0",
        roshi : "#3CC952"
      },
      backgroundColor : {
        primary : "#4285F4",
        primarydark : "#4285E4",
        iconGreen : "#7FCD93",
        iconYellow : "#DEBF85",
        iconPeach : "#ECA4A4",
        iconViolet : "#A9B0E5",
        labelGreen : "#E9F9EB",
        pieYellow : "#F6DC7D",

      },
      borderColor : {
        grey : "#E0E0E0"
      }
    },
  },
  plugins: [],
}
