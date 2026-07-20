export interface MaterialMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
}

// In Vite, we can import all markdown files in a directory as raw strings
const mdFiles = import.meta.glob('../../content/material/*.md', { query: '?raw', import: 'default', eager: true });

/**
 * Lightweight frontmatter parser — no Node.js globals needed, runs in browser.
 * Handles simple YAML frontmatter delimited by `---`.
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const delimiter = '---';
  if (!raw.trimStart().startsWith(delimiter)) {
    return { data: {}, content: raw };
  }

  const start = raw.indexOf(delimiter);
  const end = raw.indexOf(delimiter, start + delimiter.length);
  if (end === -1) {
    return { data: {}, content: raw };
  }

  const yamlBlock = raw.slice(start + delimiter.length, end);
  const content = raw.slice(end + delimiter.length).trimStart();

  const data: Record<string, string> = {};
  for (const line of yamlBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, ''); // strip surrounding quotes
    if (key) data[key] = value;
  }

  return { data, content };
}

export function getAllMaterials(): MaterialMetadata[] {
  const materials = Object.entries(mdFiles).map(([filepath, raw]) => {
    const slug = filepath.split('/').pop()?.replace('.md', '') || '';
    const { data } = parseFrontmatter(raw as string);
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
    };
  });

  return materials.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getMaterialData(slug: string) {
  const targetPath = `../../content/material/${slug}.md`;
  const raw = mdFiles[targetPath];
  if (!raw) return null;

  const { data, content } = parseFrontmatter(raw as string);
  return {
    slug,
    content,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || '',
  };
}
