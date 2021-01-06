module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['src/*.vue', 'src/views/*.vue']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        charcoal: '#394C5D',
        steelBlue: '#5B85AA',
        shadowBlue: '#7B95AC',
        xiketic: '#171123',
        gold: '#766C4B'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
