'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, BookOpen, Activity, Bug, ArrowRight } from 'lucide-react';

export default function ChangelogBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show banner after a slight delay for smooth entry, if not already dismissed in session
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('changelog-v2-dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissBanner = () => {
    setIsVisible(false);
    sessionStorage.setItem('changelog-v2-dismissed', 'true');
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsVisible(false); // Hide the banner if modal is opened
    sessionStorage.setItem('changelog-v2-dismissed', 'true');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* ── Top Banner ── */}
      <div style={{
        position: 'fixed',
        top: isVisible ? 0 : -60,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'linear-gradient(90deg, #1c1917 0%, #2a2420 100%)',
        borderBottom: '1px solid var(--border)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={16} color="var(--accent-b-light)" />
          <span style={{ fontSize: 13, color: 'var(--text-hi)', fontWeight: 500 }}>
            Matrix Ops v2.0: Graficadora 3D, Material Didáctico y nuevo diseño.
          </span>
        </div>
        <button
          onClick={openModal}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-b-light)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          Ver novedades <ArrowRight size={14} />
        </button>
        <button
          onClick={dismissBanner}
          style={{
            position: 'absolute',
            right: 16,
            background: 'transparent',
            border: 'none',
            color: 'var(--text-dim)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* ── Modal Overlay ── */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          animation: 'fadeIn 0.2s ease'
        }}>
          {/* Modal Container */}
          <div style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--border-card)',
            borderRadius: 16,
            width: '100%',
            maxWidth: 540,
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            
            {/* Modal Header */}
            <div style={{ padding: '32px 32px 0' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'var(--accent-b-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-b-light)',
                marginBottom: 20
              }}>
                <Sparkles size={24} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-hi)', marginBottom: 8, fontFamily: 'var(--sans)' }}>
                Novedades en la v2.0
              </h2>
              <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.5 }}>
                Hemos renovado completamente la aplicación para hacerla más poderosa, educativa y estéticamente profesional.
              </p>
            </div>

            {/* Modal Features */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ marginTop: 2, color: 'var(--accent-b)' }}><Activity size={20} /></div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-hi)', marginBottom: 4 }}>Graficadora 2D y 3D</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5 }}>Nuevo motor interactivo impulsado por Plotly. Visualiza curvas y superficies complejas como paraboloides y sillas de montar directamente desde tu navegador.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ marginTop: 2, color: 'var(--accent-b)' }}><BookOpen size={20} /></div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-hi)', marginBottom: 4 }}>Material Didáctico</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5 }}>Añadimos un lector de Markdown integrado. Sube tus archivos `.md` a la carpeta del repositorio y estúdialos con una interfaz altamente legible.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ marginTop: 2, color: 'var(--accent-b)' }}><Bug size={20} /></div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-hi)', marginBottom: 4 }}>Centro de Soporte</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5 }}>Un formulario estético y dedicado para que puedas reportar fallos de interfaz o errores matemáticos fácilmente.</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ marginTop: 2, color: 'var(--accent-b)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: 'var(--accent-b-bg)', fontSize: 12, fontWeight: 700 }}>M</div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-hi)', marginBottom: 4 }}>Rediseño Claude-style</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5 }}>Migramos hacia una paleta de colores "stone" (piedra y arena) cálida y elegante, con navegación lateral global.</p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{ padding: '24px 32px', background: 'var(--bg-3)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={closeModal}
                style={{
                  padding: '12px 24px',
                  background: '#c2884d',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  color: '#fff',
                  fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset, 0 4px 16px rgba(194,136,77,0.22)',
                }}
              >
                ¡Genial, a probar!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Animations directly injected for modal */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}} />
    </>
  );
}
