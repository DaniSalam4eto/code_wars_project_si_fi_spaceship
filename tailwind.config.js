export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sci-red': '#ff5500',
        'sci-text': '#ffaaaa',
        'sci-alert': '#ff0080',
        'panel-dark': '#1a0a0a',
        'panel-mid': '#2a1515',
        'panel-light': '#441111',
      },
      backgroundImage: {
        'metal-gradient': 'linear-gradient(to bottom, #2a1515 0%, #1a0a0a 50%, #0a0505 100%)',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}


