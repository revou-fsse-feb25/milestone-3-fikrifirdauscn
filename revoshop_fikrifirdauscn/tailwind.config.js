module.exports = {
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './context/**/*.{js,jsx}'
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
    ],
  }
  