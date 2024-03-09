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
        BackGrund: '#fafafa',
        ThinGray: '#f5f5f5',
        BorderGray: '#d4d4d4',
        HoverBlue: '#2563eb',
        HoverGray: '#a3a3a3',
        // BgNeutral: '#F3EEE5',
        BgNeutral: '#f3eee6',
        CardText: '#404040',
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
