const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin')],
  theme: {
    extend: {
      colors: {
        red: {
          500: '#E64449',
          100: 'rgba(255, 76, 81, 0.16)'
        },
        green: {
          500: '#24B364',
          100: 'rgba(40, 199, 111, 0.16)'
        },
        grey: {
          500: '#999CA6',
          600: '#827D8B',
          800: '#808390',
          400: 'rgb(47 43 61 / 0.22)',
          700: 'rgb(225 222 245 / 0.22)',
          100: 'rgba(128, 131, 144, 0.16)',
        },
        main: {
          500: '#675DD8',
          100: '#C7C2F9',
          700:'#CC63FE'
        },
        blue: {
          500: '#00A7BC',
          100: 'rgba(0, 186, 209, 0.16)'
        },
        warning: {
          500: '#FF9F43',
          100: 'rgba(255, 159, 67, 0.16)'
        }
      }
    }
  }
}

export default config
