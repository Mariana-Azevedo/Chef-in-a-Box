/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.edge",
    "./resources/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: [
      "autumn",
      {
        mytheme: {
          "primary2": "#421613",
          "secondary": "#F95242",
          "accent": "#FA9C92",
          "base": "#d85251",
          "MarronClaro": "#D59B6A",
          "MarronEscuro": "#826A5C",
        },
      },
    ],
  }
}

