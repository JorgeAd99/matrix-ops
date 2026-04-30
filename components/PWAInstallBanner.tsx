'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

// Tipado del evento nativo de PWA
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const STORAGE_KEY = 'pwa-install-dismissed';

export default function PWAInstallBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Si ya fue descartado permanentemente, no mostramos nada
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Evitamos mostrarlo si ya estamos en la PWA (standalone)
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // Evitar que el navegador muestre su propio prompt
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Pequeño delay para que no aparezca de golpe al cargar
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    };

    const handleAppInstalled = () => {
      setIsVisible(false);
      localStorage.setItem(STORAGE_KEY, 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    // Ocultar nuestro banner personalizado inmediatamente
    setIsVisible(false);
    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem(STORAGE_KEY, 'true');
      }
    } catch (err) {
      console.error("Error al instalar PWA:", err);
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true'); // No volver a mostrar nunca
  };

  return (
    <>
      {/* Banner de instalación */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: `translate(-50%, ${isVisible ? '0px' : '150%'})`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: 50,
        width: 'calc(100% - 48px)',
        maxWidth: 480,
        background: 'var(--bg-2)',
        border: '1px solid var(--border-card)',
        borderRadius: 16,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        boxShadow: '0 8px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
        backdropFilter: 'blur(16px)',
      }}>
        {/* Ícono */}
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: 'var(--accent-b-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent-b-light)',
        }}>
          <Smartphone size={22} />
        </div>

        {/* Texto */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text-hi)', lineHeight: 1.3 }}>
            Instalar Matrix Ops
          </p>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.4, marginTop: 2 }}>
            Accedé más rápido desde tu pantalla de inicio
          </p>
        </div>

        {/* Botón instalar */}
        <button
          onClick={handleInstall}
          disabled={isInstalling}
          style={{
            padding: '9px 16px',
            background: '#c2884d',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10,
            color: '#fff',
            fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13,
            cursor: isInstalling ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset, 0 4px 12px rgba(194,136,77,0.25)',
            transition: 'opacity 0.2s',
            opacity: isInstalling ? 0.7 : 1,
          }}
        >
          <Download size={14} />
          {isInstalling ? 'Instalando…' : 'Instalar'}
        </button>

        {/* Cerrar */}
        <button
          onClick={handleDismiss}
          style={{
            background: 'transparent', border: 'none',
            color: 'var(--text-dim)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 4, flexShrink: 0,
          }}
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
      </div>
    </>
  );
}
