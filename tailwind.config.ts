import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0D1B2A',   // 深海军蓝 - 主背景
          navy: '#1B2D45',   // 中蓝
          blue: '#2E5090',   // 亮蓝
        },
        red: {
          flag: '#C62828',   // 茜帆红
          light: '#E53935',
          dark: '#8B1A1A',
        },
        cream: '#FFF8F0',    // 暖白
        ink: '#1A1A1A',      // 正文黑
        muted: '#5A5A5A',    // 灰色文字
      },
      fontFamily: {
        sans: [
          'Noto Sans TC', 'Noto Sans SC', 'Noto Sans',
          '-apple-system', 'BlinkMacSystemFont', 'sans-serif',
        ],
        display: [
          'Noto Serif TC', 'Noto Serif SC', 'Georgia', 'serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
