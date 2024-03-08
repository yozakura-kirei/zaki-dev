import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        White: '#FFFFFF',
        Basic: '#030a12cf',
      },
      fontFamily: {
        Basic: [
          'Noto Sans JP',
          '-apple-system',
          'blinkmacsystemfont',
          'Segoe UI',
          'Hiragino Kaku Gothic ProN',
          'BIZ UDPGothic',
          'meiryo',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
export default config;
