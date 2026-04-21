'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, BookOpen, Activity, Bug } from 'lucide-react';

export default function GlobalNav() {
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop: vertical left sidebar ── */}
      <nav className="global-nav-desktop" style={{
        width: 72,
        flexShrink: 0,
        background: 'var(--bg-2)',
        borderRight: '1px solid var(--border)',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 0',
        gap: 16,
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: 'linear-gradient(135deg, #c2884d 0%, #d4a96a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 14px rgba(194,136,77,0.3)',
          marginBottom: 24,
        }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 700, color: '#fff' }}>M</span>
        </div>

        <NavItem href="/" icon={<Calculator size={22} />} label="Calculadora" active={pathname === '/'} />
        <NavItem href="/material" icon={<BookOpen size={22} />} label="Material Didáctico" active={pathname.startsWith('/material')} />
        <NavItem href="/graficadora" icon={<Activity size={22} />} label="Graficadora" active={pathname.startsWith('/graficadora')} />
        <NavItem href="/reportar" icon={<Bug size={22} />} label="Reportar Error" active={pathname.startsWith('/reportar')} />
      </nav>

      {/* ── Mobile: horizontal bottom bar ── */}
      <nav className="global-nav-mobile" style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        zIndex: 40,
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--border)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
        backdropFilter: 'blur(16px)',
      }}>
        <NavItemMobile href="/" icon={<Calculator size={20} />} label="Calc" active={pathname === '/'} />
        <NavItemMobile href="/material" icon={<BookOpen size={20} />} label="Material" active={pathname.startsWith('/material')} />
        <NavItemMobile href="/graficadora" icon={<Activity size={20} />} label="Graficar" active={pathname.startsWith('/graficadora')} />
        <NavItemMobile href="/reportar" icon={<Bug size={20} />} label="Error" active={pathname.startsWith('/reportar')} />
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .global-nav-desktop { display: flex; }
        .global-nav-mobile  { display: none; }
        @media (max-width: 640px) {
          .global-nav-desktop { display: none !important; }
          .global-nav-mobile  { display: flex !important; }
        }
      ` }} />
    </>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link href={href} title={label} style={{
      width: 44, height: 44,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 10,
      background: active ? 'var(--accent-b-bg)' : 'transparent',
      color: active ? 'var(--accent-b-light)' : 'var(--text)',
      transition: 'all 0.15s ease',
      border: `1px solid ${active ? 'rgba(194,136,77,0.2)' : 'transparent'}`,
    }}>
      {icon}
    </Link>
  );
}

function NavItemMobile({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link href={href} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
      padding: '6px 12px',
      borderRadius: 10,
      color: active ? 'var(--accent-b-light)' : 'var(--text-dim)',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
    }}>
      {icon}
      <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, fontFamily: 'var(--sans)' }}>{label}</span>
    </Link>
  );
}
