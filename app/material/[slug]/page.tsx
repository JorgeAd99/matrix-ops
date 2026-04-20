import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getMaterialData, getAllMaterialSlugs } from '@/lib/mdx';
import { ArrowLeft, Calendar } from 'lucide-react';
import './markdown.css';

export async function generateStaticParams() {
  return getAllMaterialSlugs().map(slugObj => ({ slug: slugObj.params.slug }));
}

export default async function MaterialDoc({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const materialData = getMaterialData(resolvedParams.slug);

  if (!materialData) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 24px 80px' }}>
        
        {/* ── Nav ── */}
        <div style={{ padding: '32px 0 24px' }}>
          <Link href="/material" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'var(--text-mid)', textDecoration: 'none',
            fontSize: 14, fontWeight: 500,
            transition: 'color 0.15s'
          }}>
            <ArrowLeft size={16} />
            Volver a Material Didáctico
          </Link>
        </div>

        {/* ── Header ── */}
        <header style={{ marginBottom: 40 }}>
          <h1 style={{
            fontFamily: 'var(--sans)', fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 40px)',
            letterSpacing: '-0.02em', lineHeight: 1.15,
            color: 'var(--text-hi)',
            marginBottom: 16
          }}>
            {materialData.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: 14 }}>
            <Calendar size={14} />
            <span style={{ fontFamily: 'var(--mono)' }}>{materialData.date}</span>
          </div>
          {materialData.description && (
            <p style={{ marginTop: 20, fontSize: 18, color: 'var(--text)', lineHeight: 1.6, borderLeft: '3px solid var(--accent-b-bg)', paddingLeft: 16 }}>
              {materialData.description}
            </p>
          )}
        </header>

        {/* ── Markdown Content ── */}
        <article className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {materialData.content}
          </ReactMarkdown>
        </article>

      </div>
    </div>
  );
}
