import Link from 'next/link';
import { getAllMaterials } from '@/lib/mdx';
import { FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Material Didáctico — Matrix Ops',
};

export default function MaterialPage() {
  const materials = getAllMaterials();

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 80px' }}>
        
        {/* ── Header ── */}
        <header style={{ padding: '40px 0 32px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--accent-b-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-b-light)'
            }}>
              <FileText size={18} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
              Biblioteca
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--sans)', fontWeight: 700,
            fontSize: 'clamp(24px,4vw,34px)',
            letterSpacing: '-0.02em', lineHeight: 1.1,
            color: 'var(--text-hi)'
          }}>
            Material Didáctico
          </h1>
          <p style={{ marginTop: 12, color: 'var(--text)', fontSize: 15, maxWidth: 600, lineHeight: 1.5 }}>
            Conceptos teóricos, propiedades y guías prácticas sobre álgebra lineal y cálculo matricial para complementar la herramienta.
          </p>
        </header>

        {/* ── Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20
        }}>
          {materials.map((mat) => (
            <Link key={mat.slug} href={`/material/${mat.slug}`} style={{ textDecoration: 'none' }}>
              <div className="material-card" style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 14,
                padding: '24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--accent-b)', fontWeight: 600 }}>
                      {mat.date}
                    </span>
                    <ArrowRight size={16} color="var(--text-dim)" className="arrow-icon" />
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-hi)', marginBottom: 8, lineHeight: 1.3 }}>
                    {mat.title}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>
                    {mat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          
          {materials.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-dim)', border: '1px dashed var(--border-hi)', borderRadius: 12 }}>
              No hay material didáctico disponible. Agrega archivos .md en la carpeta content/material/.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
