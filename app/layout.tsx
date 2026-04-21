import type { Metadata, Viewport } from 'next';
import './globals.css';
import GlobalNav from '@/components/GlobalNav';
import ChangelogBanner from '@/components/ChangelogBanner';

export const metadata: Metadata = {
  title: 'Matrix Ops — Calculadora Matricial',
  description: 'Operaciones matriciales: inversas, determinantes, transpuestas, multiplicación y más.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ display: 'flex', minHeight: '100vh', margin: 0, padding: 0 }}>
        <ChangelogBanner />
        <GlobalNav />
        <div style={{ flex: 1, minWidth: 0, height: '100vh', overflowY: 'auto' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
