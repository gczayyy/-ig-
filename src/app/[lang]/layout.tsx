import { langs, langNames, t, isValidLang } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return langs.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = isValidLang(lang) ? lang : 'zh';
  return {
    title: t(l, 'siteTitle'),
    description: t(l, 'siteDesc'),
  };
}

export default function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/zh/" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.jpg" alt="SINFAAN" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-white font-bold text-base tracking-wide">茜帆</span>
          </a>
          <nav className="flex items-center gap-3 text-xs font-medium">
            <a href="/zh/" className="text-white/80 hover:text-red-light transition">文章</a>
            <a href="https://www.instagram.com/sinfaan2024/" target="_blank" rel="noopener" className="text-white/60 hover:text-red-light transition">Instagram ↗</a>
          </nav>
        </div>
        <LangSwitcher />
      </div>
    </header>
  );
}

function LangSwitcher() {
  return (
    <div className="flex items-center gap-1 text-[10px] font-medium">
      {langs.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          <a href={`/${l}/`} className="text-white/60 hover:text-red-light transition px-1 py-0.5">
            {langNames[l]}
          </a>
          {i < langs.length - 1 && <span className="text-white/20">|</span>}
        </span>
      ))}
    </div>
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
