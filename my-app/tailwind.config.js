/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg': 'url("/img/bgHero.png")',
        'phone' : 'url("/my-app/public/phone.svg")',
      },
      colors : {
        "red": "#FF3D3D"
      },
      fontFamily:{
        Title: ["Montserrat"],
        Subtitle : ["Poppins"]
      },
    },
  },
  plugins: [],
}
