const plugin = require('tailwindcss/plugin');

const capitalizeFirst = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.capitalize-first:first-letter': {
      textTransform: 'uppercase',
    },
  };
  addUtilities(newUtilities, ['responsive', 'hover']);
});

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: '#323237',
      blue: {
        light: '#6CB6EE',
        DEFAULT: '#4F90FF',
        dark: '#1E4B96',
      },
      current: 'currentColor',
      gray: {
        light: '#707070',
        DEFAULT: '#5A5A64',
        ghost: 'rgba(255,255,255,0.3)',
        smoke: '#EDF2F2',
      },
      green: {
        light: '#60FF95',
        DEFAULT: '#30BF1A',
      },
      lightpurple: '#A8A3B2',
      red: {
        light: '#FFE0E0',
        DEFAULT: '#ff0000',
      },
      white: {
        dirty: '#FAFBFB',
        DEFAULT: '#ffffff',
      },
      transparent: 'transparent',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    borderRadius: {
      none: '0',
      sm: '7px',
      DEFAULT: '14px',
      md: '14px',
      lg: '17px',
      full: '9999px',
    },
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      inherit: 'inherit',
      none: 'none',
      2: '2 2 0%',
    },
    fontFamily: {
      inter: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    padding: {
      0: '0',
      2: '2px',
      4: '4px',
      8: '8px',
      12: '12px',
      18: '18px',
      24: '24px',
      30: '30px',
      36: '36px',
      '1/10': '10%',
      '2/10': '20%',
      '3/10': '30%',
      '4/10': '40%',
      '5/10': '50%',
      '6/10': '60%',
      '7/10': '70%',
      '8/10': '80%',
      '9/10': '90%',
      full: '100%',
    },
    minHeight: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
      screen: '100vh',
    },

    minWidth: {
      120:"120px",
      160:"160px",
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
      screen: '100vh',
    },
    extend: {
      fontSize: {
        xxs: ['0.625rem', '0.875rem'],
        xs: ['0.75rem', '1rem'],
      },
      translate: ['motion-safe'],
      width: {
        'formCol-1': '15rem',
        'formCol-2': '32rem',
      },
      zIndex: {
        '-10': '-10',
      },
    },
  },
  variants: {
    child: ['not-last'],
  },
  plugins: [
    capitalizeFirst,
    plugin(({ addUtilities, theme }) => {
      const newUtilities = {
        '.active-underline': {
          boxShadow: `inset 0 -1px 0 0 ${theme('colors.blue.DEFAULT')}`,
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
