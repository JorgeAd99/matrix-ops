import matter from 'gray-matter';

export interface MaterialMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
}

// In Vite, we can import all markdown files in a directory as raw strings
const mdFiles = import.meta.glob('../../content/material/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllMaterials(): MaterialMetadata[] {
  const materials = Object.entries(mdFiles).map(([filepath, content]) => {
    const slug = filepath.split('/').pop()?.replace('.md', '') || '';
    const { data } = matter(content as string);
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
    };
  });

  return materials.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getMaterialData(slug: string) {
  const targetPath = `../../content/material/${slug}.md`;
  const content = mdFiles[targetPath];
  if (!content) return null;

  const { data, content: mdContent } = matter(content as string);
  return {
    slug,
    content: mdContent,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || '',
  };
}
