import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cornsilk-100': '#fffcf0',
        'cornsilk-200': '#fff8dc',
        'cornsilk-300': '#fff4c8',
        'cornsilk-400': '#fff0b5',
        'cornsilk-500': '#ffeca1',
        'cornsilk-600': '#ffe88e',
        'cornsilk-700': '#ffe47a',
        'cornsilk-800': '#ffe066',
        'cornsilk-900': '#ffdd53',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  // plugins: [require("tailwind-scrollbar")],
};
export default config;
