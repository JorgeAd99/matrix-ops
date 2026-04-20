'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, BookOpen, Activity, Bug } from 'lucide-react';

export default function GlobalNav() {
  const pathname = usePathname();

  return (
    <nav style={{
      width: 72,
      flexShrink: 0,
      background: 'var(--bg-2)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
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

      <NavItem
        href="/"
        icon={<Calculator size={22} />}
        label="Calculadora"
        active={pathname === '/'}
      />
      <NavItem
        href="/material"
        icon={<BookOpen size={22} />}
        label="Material Didáctico"
        active={pathname.startsWith('/material')}
      />
      <NavItem
        href="/graficadora"
        icon={<Activity size={22} />}
        label="Graficadora"
        active={pathname.startsWith('/graficadora')}
      />
      
      <NavItem
        href="/reportar"
        icon={<Bug size={22} />}
        label="Reportar Error"
        active={pathname.startsWith('/reportar')}
      />
    </nav>
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
