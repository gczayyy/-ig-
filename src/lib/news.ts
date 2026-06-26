import fs from 'node:fs';
import path from 'node:path';

export interface Article {
  slug: string;
  title: string;
  date: string;
  summary: string;
  bodyHtml: string;
  coverImage?: string;
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
  let h = md;
  h = h.replace(/### (.+)/g, '<h3>$1</h3>');
  h = h.replace(/## (.+)/g, '<h2>$1</h2>');
  h = h.replace(/# (.+)/g, '<h1>$1</h1>');
  h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\*(.+?)\*/g, '<em>$1</em>');
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  h = h.replace(/((?:^- .+\n?)+)/gm, (b) => {
    const items = b.split('\n').filter(l => l.startsWith('- ')).map(l => `<li>${l.slice(2)}</li>`).join('');
    return `<ul>${items}</ul>`;
  });
  h = h.replace(/((?:^\d+\. .+\n?)+)/gm, (b) => {
    const items = b.split('\n').filter(l => /^\d+\. /.test(l)).map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('');
    return `<ol>${items}</ol>`;
  });
  const blocks = h.split(/\n\n+/);
  return blocks.map(b => {
    const t = b.trim();
    if (!t) return '';
    if (/^<(h[1-3]|ul|ol|li|pre|blockquote)/.test(t)) return t;
    return `<p>${t.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');
}

const DIR = path.join(process.cwd(), 'content', 'news');

export function getAllArticles(): Article[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const { meta, body } = parseFrontmatter(fs.readFileSync(path.join(DIR, f), 'utf-8'));
      return {
        slug: meta.slug || f.replace('.md', ''),
        title: meta.title || '',
        date: meta.date || '',
        summary: meta.summary || '',
        bodyHtml: mdToHtml(body),
        coverImage: meta.coverImage || undefined,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find(a => a.slug === slug);
}
