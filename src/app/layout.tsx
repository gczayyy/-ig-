import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SINFAAN 茜帆',
  description: '茜帆 - 為勞動者發聲，記錄前線',
  icons: { icon: '/logo.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#0D1B2A" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <img src="/logo.svg" alt="SINFAAN" className="h-8 w-8" />
          <span className="text-white font-bold text-base tracking-wide">茜帆</span>
        </a>
        <nav className="flex items-center gap-4 text-xs font-medium">
          <a href="/" className="text-white/80 hover:text-red-light transition">文章</a>
          <a href="https://www.instagram.com/sinfaan2024/" target="_blank" rel="noopener" className="text-white/60 hover:text-red-light transition">Instagram ↗</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-dark text-white/40 py-8">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} SINFAAN 茜帆 &mdash;{' '}
          <a href="https://www.instagram.com/sinfaan2024/" target="_blank" rel="noopener" className="hover:text-red-light transition">
            @sinfaan2024
          </a>
        </p>
      </div>
    </footer>
  );
}
