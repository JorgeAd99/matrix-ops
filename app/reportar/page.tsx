'use client';
import { Bug, Send } from 'lucide-react';

export default function ReportarPage() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px', flex: 1, width: '100%' }}>
        
        {/* ── Header ── */}
        <header style={{ padding: '40px 0 32px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(248,113,113,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--red)',
              border: '1px solid rgba(248,113,113,0.2)'
            }}>
              <Bug size={18} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
              Soporte
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--sans)', fontWeight: 700,
            fontSize: 'clamp(24px,4vw,34px)',
            letterSpacing: '-0.02em', lineHeight: 1.1,
            color: 'var(--text-hi)'
          }}>
            Reportar un Error
          </h1>
          <p style={{ marginTop: 12, color: 'var(--text)', fontSize: 15, maxWidth: 600, lineHeight: 1.5 }}>
            ¿Encontraste un fallo matemático, un problema visual o algo que no funciona bien? Déjanos los detalles aquí abajo para poder solucionarlo.
          </p>
        </header>

        {/* ── Form Container ── */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 14,
          padding: '32px',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: 24 }} onSubmit={(e) => e.preventDefault()}>
            
            {/* Title / Asunto */}
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-hi)', fontWeight: 500 }}>
                Título del problema
              </label>
              <input
                type="text"
                placeholder="Ej. El cálculo de la inversa da un error en matrices 3x3"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  color: 'var(--text-hi)',
                  fontFamily: 'var(--sans)', fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.15s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-b)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Categoria */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-hi)', fontWeight: 500 }}>
                  Categoría
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--text-hi)',
                    fontFamily: 'var(--sans)', fontSize: 14,
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="math">Error matemático de cálculo</option>
                  <option value="ui">Problema visual o de interfaz</option>
                  <option value="graph">Error en la graficadora 2D/3D</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-hi)', fontWeight: 500 }}>
                  Tu correo electrónico (opcional)
                </label>
                <input
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--text-hi)',
                    fontFamily: 'var(--sans)', fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.15s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-b)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-hi)', fontWeight: 500 }}>
                Descripción detallada
              </label>
              <textarea
                placeholder="Por favor describe qué estabas intentando hacer, qué matrices estabas usando y qué error apareció..."
                rows={6}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  color: 'var(--text-hi)',
                  fontFamily: 'var(--sans)', fontSize: 14,
                  lineHeight: 1.6,
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.15s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-b)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Acciones */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
              <button
                type="button"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px',
                  background: '#c2884d',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  color: '#fff',
                  fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13,
                  letterSpacing: '0.02em', cursor: 'pointer',
                  boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset, 0 4px 16px rgba(194,136,77,0.22)',
                  transition: 'transform 0.1s, box-shadow 0.1s'
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => alert("Reporte de error enviado (Simulación)")}
              >
                <Send size={16} />
                Enviar Reporte
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
