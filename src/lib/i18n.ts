export const langs = ['zh', 'zh-CN', 'en', 'id'] as const;
export type Lang = (typeof langs)[number];

export const langNames: Record<Lang, string> = {
  zh: '繁體中文',
  'zh-CN': '简体中文',
  en: 'English',
  id: 'Bahasa Indonesia',
};

type Dict = Record<string, string>;

const dicts: Record<Lang, Dict> = {
  zh: {
    siteTitle: 'SINFAAN 茜帆',
    siteDesc: '茜帆 - 為勞動者發聲，記錄前線',
    navArticles: '文章',
    heroDesc1: '記錄前線，為勞動者發聲。這裡是茜帆的文章主頁——',
    heroDesc2: '點擊任意文章，深入了解我們關注的議題。',
    noArticles: '暫無文章',
    noArticlesSub: '敬請期待，茜帆正在準備內容。',
    readMore: '閱讀全文 →',
    backToList: '返回文章列表',
    followUs: '關注茜帆，獲取更多內容',
    trackUs: '@sinfaan2024 追蹤我們',
    notFound: '頁面不存在',
    notFoundSub: '請檢查網址是否正確，或返回首頁。',
    backHome: '返回首頁',
  },

  'zh-CN': {
    siteTitle: 'SINFAAN 茜帆',
    siteDesc: '茜帆 - 为劳动者发声，记录前线',
    navArticles: '文章',
    heroDesc1: '记录前线，为劳动者发声。这里是茜帆的文章主页——',
    heroDesc2: '点击任意文章，深入了解我们关注的议题。',
    noArticles: '暂无文章',
    noArticlesSub: '敬请期待，茜帆正在准备内容。',
    readMore: '阅读全文 →',
    backToList: '返回文章列表',
    followUs: '关注茜帆，获取更多内容',
    trackUs: '@sinfaan2024 追踪我们',
    notFound: '页面不存在',
    notFoundSub: '请检查网址是否正确，或返回首页。',
    backHome: '返回首页',
  },

  en: {
    siteTitle: 'SINFAAN',
    siteDesc: 'SINFAAN - Voice for Workers, Stories from the Frontline',
    navArticles: 'Articles',
    heroDesc1: 'Documenting the frontline, amplifying workers\' voices. Welcome to the SINFAAN article hub —',
    heroDesc2: 'Click any article to explore the issues we care about.',
    noArticles: 'No articles yet',
    noArticlesSub: 'Stay tuned, SINFAAN is preparing content.',
    readMore: 'Read more →',
    backToList: 'Back to articles',
    followUs: 'Follow SINFAAN for more content',
    trackUs: '@sinfaan2024 Follow us',
    notFound: 'Page not found',
    notFoundSub: 'Check the URL or go back to the homepage.',
    backHome: 'Back to home',
  },

  id: {
    siteTitle: 'SINFAAN',
    siteDesc: 'SINFAAN - Suara untuk Pekerja, Cerita dari Garis Depan',
    navArticles: 'Artikel',
    heroDesc1: 'Mendokumentasikan garis depan, menyuarakan pekerja. Selamat datang di pusat artikel SINFAAN —',
    heroDesc2: 'Klik artikel mana pun untuk menjelajahi isu yang kami pedulikan.',
    noArticles: 'Belum ada artikel',
    noArticlesSub: 'Nantikan, SINFAAN sedang menyiapkan konten.',
    readMore: 'Baca selengkapnya →',
    backToList: 'Kembali ke daftar artikel',
    followUs: 'Ikuti SINFAAN untuk konten lainnya',
    trackUs: '@sinfaan2024 Ikuti kami',
    notFound: 'Halaman tidak ditemukan',
    notFoundSub: 'Periksa URL atau kembali ke beranda.',
    backHome: 'Kembali ke beranda',
  },
};

export function t(lang: Lang, key: string): string {
  return dicts[lang]?.[key] ?? dicts['zh'][key] ?? key;
}

export function isValidLang(s: string): s is Lang {
  return langs.includes(s as Lang);
}
