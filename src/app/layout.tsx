import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SINFAAN 茜帆',
  description: '茜帆 - 為勞動者發聲，記錄前線',
  icons: { icon: '/logo.jpg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#0D1B2A" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream">
        {children}
      </body>
    </html>
  );
}
