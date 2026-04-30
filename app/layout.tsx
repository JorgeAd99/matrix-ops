import type { Metadata, Viewport } from 'next';
import './globals.css';
import GlobalNav from '@/components/GlobalNav';
import ThemeProvider from '@/components/ThemeProvider';
import PWAInstallBanner from '@/components/PWAInstallBanner';

export const metadata: Metadata = {
  title: 'Matrix Ops — Calculadora Matricial',
  description: 'Operaciones matriciales: inversas, determinantes, transpuestas, multiplicación y más.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Matrix Ops',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#09090b',
};

// Blocking script: runs before first paint to avoid theme flash (FOUC)
const themeScript = `
(function() {
  var stored = localStorage.getItem('theme');
  var theme = (stored === 'dark' || stored === 'light')
    ? stored
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body style={{ display: 'flex', minHeight: '100vh', margin: 0, padding: 0 }}>
        <ThemeProvider>
          <GlobalNav />
          <div style={{ flex: 1, minWidth: 0, height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              {children}
            </div>
          </div>
          <PWAInstallBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
