const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    groups: [
      'card'
    ]
  },
  plugins: [plugin(({ addVariant, theme }) => {
    const groups = theme('groups') || []

    groups.forEach((group) => {
      addVariant(`group-${group}-hover`, () => {
        return `:merge(.group-${group}):hover &`
      })
    })
  })],
}
