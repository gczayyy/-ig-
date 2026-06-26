import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import type { Lang } from './i18n';

export interface Article {
  slug: string;
  title: string;
  date: string;
  summary: string;
  bodyHtml: string;
  coverImage?: string;
  lang: Lang;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    meta[line.slice(0, idx).trim()] = val;
  }
  return { meta, body: match[2].trim() };
}

function mdToHtml(md: string): string {
  return marked.parse(md, { async: false, gfm: true, breaks: false }) as string;
}

const DIR = path.join(process.cwd(), 'content', 'news');

function loadArticle(slug: string, lang: Lang): Article | null {
  const candidates = [lang, 'zh'];
  for (const l of candidates) {
    const fp = path.join(DIR, slug, `${l}.md`);
    if (fs.existsSync(fp)) {
      const { meta, body } = parseFrontmatter(fs.readFileSync(fp, 'utf-8'));
      return {
        slug,
        title: meta.title || '',
        date: meta.date || '',
        summary: meta.summary || '',
        bodyHtml: mdToHtml(body),
        coverImage: meta.coverImage || undefined,
        lang: l as Lang,
      };
    }
  }
  return null;
}

export function getAllArticles(lang: Lang): Article[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => loadArticle(d.name, lang))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(lang: Lang, slug: string): Article | undefined {
  return loadArticle(slug, lang) ?? undefined;
}
