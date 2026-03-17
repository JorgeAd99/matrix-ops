import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Matrix Ops — Calculadora Matricial',
  description: 'Operaciones matriciales: inversas, determinantes, transpuestas, multiplicación y más.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
