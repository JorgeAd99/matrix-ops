import { useState, useEffect } from 'react';
import { X, Calculator, Heart, Bug, Sparkles } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/*
        Scroll container: fixed, full screen, scrollable.
        Uses padding + margin:auto on the card to center it while
        still allowing scroll when the viewport is too short.
      */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 201,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          padding: '24px 16px',
        }}
      >
        {/* Card */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--border-card)',
            borderRadius: 20,
            width: '100%',
            maxWidth: 520,
            margin: '0 auto',          /* horizontal center */
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
            overflow: 'hidden',
            position: 'relative',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
            transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Shimmer bar */}
          <div style={{
            height: 4,
            background: 'linear-gradient(90deg, #c2884d 0%, #d4a96a 50%, #c2884d 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmerWelcome 3s linear infinite',
          }} />

          {/* Close button */}
          <button
            onClick={handleClose}
            id="welcome-modal-x-btn"
            aria-label="Cerrar bienvenida"
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'var(--bg-3)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-dim)',
              zIndex: 2,
              transition: 'background 0.15s, color 0.15s',
              touchAction: 'manipulation',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--border-hi)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-hi)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-3)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-dim)';
            }}
          >
            <X size={16} />
          </button>

          {/* ── Header ── */}
          <div style={{ padding: '28px 28px 0' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 13,
              background: 'linear-gradient(135deg, rgba(194,136,77,0.18) 0%, rgba(194,136,77,0.06) 100%)',
              border: '1px solid rgba(194,136,77,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 18,
              boxShadow: '0 4px 16px rgba(194,136,77,0.1)',
            }}>
              <Calculator size={24} color="var(--accent-b-light)" />
            </div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--accent-b-bg)',
              border: '1px solid rgba(194,136,77,0.2)',
              borderRadius: 20, padding: '4px 10px', marginBottom: 12,
            }}>
              <Sparkles size={11} color="var(--accent-b-light)" />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-b-light)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Bienvenido/a
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(18px, 4vw, 22px)',
              fontWeight: 700, color: 'var(--text-hi)',
              lineHeight: 1.25, marginBottom: 10,
              fontFamily: 'var(--sans)',
              paddingRight: 44,
            }}>
              Matrix Ops — Calculadora de Álgebra Lineal
            </h2>

            <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65 }}>
              Herramienta educativa <strong style={{ color: 'var(--text-mid)' }}>gratuita</strong> para operar
              con matrices y sistemas de ecuaciones — directo en tu navegador, sin instalar nada.
            </p>
          </div>

          {/* ── Info cards ── */}
          <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* Donation */}
            <div style={{
              display: 'flex', gap: 12,
              background: 'linear-gradient(135deg, rgba(194,136,77,0.07) 0%, rgba(194,136,77,0.02) 100%)',
              border: '1px solid rgba(194,136,77,0.16)',
              borderRadius: 12, padding: '14px 16px',
            }}>
              <div style={{
                flexShrink: 0, width: 34, height: 34, borderRadius: 9,
                background: 'rgba(194,136,77,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Heart size={16} color="var(--accent-b-light)" />
              </div>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-hi)', marginBottom: 3 }}>
                  Apoyá el proyecto ☕
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.55 }}>
                  Si la herramienta te es útil, una pequeña donación ayuda a mantenerla viva.{' '}
                  <a
                    href="https://cafecito.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ color: 'var(--accent-b-light)', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(194,136,77,0.4)' }}
                  >
                    ¡Invitame un cafecito!
                  </a>
                </p>
              </div>
            </div>

            {/* Bug report */}
            <div style={{
              display: 'flex', gap: 12,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 12, padding: '14px 16px',
            }}>
              <div style={{
                flexShrink: 0, width: 34, height: 34, borderRadius: 9,
                background: 'rgba(248,113,113,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Bug size={16} color="var(--red)" />
              </div>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-hi)', marginBottom: 3 }}>
                  ¿Encontraste un error?
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.55 }}>
                  Reportalo desde la sección{' '}
                  <span style={{ color: 'var(--text-hi)', fontWeight: 600 }}>Reportar problema</span>.
                  Tu ayuda mejora la herramienta para todos 🙏
                </p>
              </div>
            </div>

          </div>

          {/* ── Footer CTA ── */}
          <div style={{
            padding: '4px 28px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}>
            <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              Este mensaje aparece siempre al abrir la página.
            </p>
            <button
              id="welcome-modal-close-btn"
              onClick={handleClose}
              style={{
                padding: '11px 24px',
                background: 'linear-gradient(135deg, #c2884d 0%, #d4a96a 100%)',
                border: 'none',
                borderRadius: 10,
                color: '#fff',
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(194,136,77,0.35), 0 1px 0 rgba(255,255,255,0.15) inset',
                transition: 'transform 0.15s, box-shadow 0.15s',
                touchAction: 'manipulation',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 22px rgba(194,136,77,0.45), 0 1px 0 rgba(255,255,255,0.15) inset';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(194,136,77,0.35), 0 1px 0 rgba(255,255,255,0.15) inset';
              }}
            >
              ¡Entendido, a calcular! 🚀
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmerWelcome {
          0%   { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      ` }} />
    </>
  );
}
