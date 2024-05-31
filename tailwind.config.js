/** @type {import('tailwindcss').Config} */

export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: {
        light: 'rgba(33, 33, 33, 0.2)',
        DEFAULT: '#212121',
      },
      gray: {
        light: '#F9F9F9',
        DEFAULT: '#F2F2F2',
        dark: '#6B6B6B',
      },
      success: '#02C66F',
      warning: '#FF9900',
      danger: '#e94d37',
    },
    fontFamily: {
      segoe: [
        'Segoe UI',
        'Tahoma',
        'Geneva',
        'Verdana',
        'sans-serif',
      ],
    },
  },
  plugins: [],
};
