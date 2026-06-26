import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllArticles, getArticle } from '@/lib/news';
import { langs, t, isValidLang } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  // 用 zh 作为基准列出所有文章 slug，每种语言都生成页面
  const articles = getAllArticles('zh');
  for (const lang of langs) {
    for (const a of articles) {
      params.push({ lang, slug: a.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) return { title: 'Not Found' };
  const a = getArticle(lang, slug);
  if (!a) return { title: 'Not Found' };
  return { title: `${a.title} - 茜帆`, description: a.summary };
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();
  const a = getArticle(lang, slug);
  if (!a) notFound();

  return (
    <>
      <article>
        {/* Header */}
        <section className="bg-brand-dark text-white py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4">
            <a href={`/${lang}/`} className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-red-light transition mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              {t(lang, 'backToList')}
            </a>
            <time className="text-xs text-white/50">{a.date}</time>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold leading-snug">{a.title}</h1>
          </div>
        </section>

        {/* Body */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-3xl px-4">
            <div className="prose" dangerouslySetInnerHTML={{ __html: a.bodyHtml }} />
          </div>
        </section>
      </article>

      {/* Share / IG link */}
      <section className="border-t border-black/5 py-10">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-sm text-muted mb-3">{t(lang, 'followUs')}</p>
          <a href="https://www.instagram.com/sinfaan2024/" target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-red-flag text-white px-6 py-2.5 text-sm font-semibold hover:bg-red-dark transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 5.8.1 5 .3 4.2.6c-.8.3-1.5.7-2.2 1.4C1.3 2.7.9 3.4.6 4.2.3 5 0 5.8 0 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9.3 2.2.6 2.9c.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.7.3 1.5.5 2.9.6C8.3 24 8.7 24 12 24s3.7 0 4.9-.1 2.2-.3 2.9-.6c.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.7.5-1.5.6-2.9.1-1.2.1-1.7.1-4.9s0-3.7-.1-4.9-.3-2.2-.6-2.9c-.3-.8-.7-1.5-1.4-2.2-.7-.7-1.4-1.1-2.2-1.4-.7-.3-1.5-.5-2.9-.6C15.7 0 15.3 0 12 0z"/><circle cx="12" cy="12" r="4.8"/><circle cx="18.4" cy="5.6" r="1.2"/></svg>
            {t(lang, 'trackUs')}
          </a>
        </div>
      </section>
    </>
  );
}
