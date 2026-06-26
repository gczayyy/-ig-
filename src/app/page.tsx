import { getAllArticles } from '@/lib/news';

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <>
      {/* Hero banner */}
      <section className="bg-brand-dark text-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-5">
            <img src="/logo.svg" alt="" className="h-10 w-10" />
            <div>
              <h1 className="text-lg font-bold tracking-wide">SINFAAN 茜帆</h1>
              <p className="text-xs text-white/60">@sinfaan2024</p>
            </div>
          </div>
          <p className="max-w-lg text-base text-white/80 leading-relaxed">
            記錄前線，為勞動者發聲。這裡是茜帆的文章主頁——
            <br className="hidden sm:block" />
            點擊任意文章，深入了解我們關注的議題。
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a href="https://www.instagram.com/sinfaan2024/" target="_blank" rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-full bg-red-flag hover:bg-red-dark text-white px-4 py-1.5 text-xs font-semibold transition">
              <span>Instagram</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Article list */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4">
          {articles.length === 0 ? (
            <div className="text-center py-20 text-muted">
              <p className="text-lg font-bold text-ink/60">暫無文章</p>
              <p className="text-sm mt-2">敬請期待，西西帆正在準備內容。</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {articles.map((a) => (
                <a key={a.slug} href={`/${a.slug}`} className="group block">
                  <article className="border-b border-black/5 pb-8 hover:border-red-flag/30 transition-colors">
                    <div className="flex items-center gap-3 text-xs text-muted mb-2">
                      <time>{a.date}</time>
                    </div>
                    <h2 className="text-xl font-bold text-brand-dark group-hover:text-red-flag transition-colors mb-2 leading-snug">
                      {a.title}
                    </h2>
                    <p className="text-sm text-ink/65 leading-relaxed">{a.summary}</p>
                    <span className="inline-block mt-3 text-xs font-semibold text-red-flag group-hover:underline">
                      閱讀全文 →
                    </span>
                  </article>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
