import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Calculator, BookOpen, Activity, Bug, Sigma, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const NAV_LINKS = [
  { href: '/',            label: 'Calculadora',   icon: <Calculator size={15} /> },
  { href: '/ecuaciones',  label: 'Ecuaciones',    icon: <Sigma size={15} /> },
  { href: '/material',    label: 'Material',      icon: <BookOpen size={15} /> },
  { href: '/graficadora', label: 'Graficadora',   icon: <Activity size={15} /> },
  { href: '/reportar',    label: 'Reportar',      icon: <Bug size={15} /> },
];

function isActive(href: string, pathname: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function GlobalNav() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* ── Floating pill top bar ── */}
      <header style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        /* Safari fix */
        WebkitTransform: 'translateX(-50%)',
      }}>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '6px 8px',
          borderRadius: 999,
          background: theme === 'dark' ? 'rgba(22, 19, 17, 0.88)' : 'rgba(249, 248, 236, 0.90)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(120, 100, 10, 0.15)',
          boxShadow: theme === 'dark'
            ? '0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset'
            : '0 8px 32px rgba(120, 100, 10, 0.08), 0 1px 0 rgba(255,255,255,0.6) inset',
          whiteSpace: 'nowrap',
        }}>

          {/* ── Logo pill ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 12px 4px 6px',
            borderRadius: 999,
            marginRight: 6,
            background: theme === 'dark'
              ? 'linear-gradient(135deg, rgba(194,136,77,0.14) 0%, transparent 100%)'
              : 'linear-gradient(135deg, rgba(180, 83, 9, 0.08) 0%, transparent 100%)',
            border: theme === 'dark'
              ? '1px solid rgba(194,136,77,0.18)'
              : '1px solid rgba(180, 83, 9, 0.15)',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, #c2884d 0%, #d4a96a 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 14px rgba(194,136,77,0.45)',
              flexShrink: 0,
              animation: 'logoPulse 4s ease-in-out infinite',
            }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, color: '#fff' }}>M</span>
            </div>
            <span style={{
              fontFamily: 'var(--sans)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--text-hi)',
              letterSpacing: '-0.01em',
            }}>
              MatrixOps
            </span>
          </div>

          {/* ── Nav links ── */}
          {NAV_LINKS.map(link => {
            const active = isActive(link.href, pathname);
            return (
              <Link
                key={link.href}
                to={link.href}
                className="pill-link"
                data-active={active}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  fontFamily: 'var(--sans)',
                  color: active
                    ? (theme === 'dark' ? '#fff' : 'var(--text-hi)')
                    : (theme === 'dark' ? 'rgba(255,255,255,0.55)' : 'var(--text)'),
                  background: active
                    ? (theme === 'dark'
                      ? 'linear-gradient(135deg, rgba(194,136,77,0.30) 0%, rgba(194,136,77,0.15) 100%)'
                      : 'linear-gradient(135deg, rgba(180, 83, 9, 0.15) 0%, rgba(180, 83, 9, 0.08) 100%)')
                    : 'transparent',
                  border: active
                    ? (theme === 'dark'
                      ? '1px solid rgba(194,136,77,0.30)'
                      : '1px solid rgba(180, 83, 9, 0.25)')
                    : '1px solid transparent',
                  boxShadow: active
                    ? (theme === 'dark'
                      ? '0 2px 10px rgba(194,136,77,0.18)'
                      : '0 2px 10px rgba(180, 83, 9, 0.10)')
                    : 'none',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  letterSpacing: active ? '-0.01em' : '0',
                }}
              >
                <span style={{
                  color: active
                    ? 'var(--accent-b-light)'
                    : (theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'var(--text-dim)'),
                  display: 'flex', alignItems: 'center',
                  transition: 'color 0.2s ease',
                }}>
                  {link.icon}
                </span>
                {link.label}
              </Link>
            );
          })}

          {/* ── Divider ── */}
          <div style={{
            width: 1, height: 20,
            background: theme === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(120, 100, 10, 0.15)',
            margin: '0 4px',
            flexShrink: 0,
          }} />

          {/* ── Theme toggle ── */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            className="pill-link"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: '50%',
              background: 'transparent',
              border: '1px solid transparent',
              color: theme === 'dark' ? 'rgba(255,255,255,0.55)' : 'var(--text)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile: bottom pill bar ── */}
      <nav className="global-nav-mobile" style={{
        position: 'fixed',
        bottom: 14, left: 16, right: 16,
        zIndex: 50,
        display: 'none',
        background: theme === 'dark' ? 'rgba(22, 19, 17, 0.88)' : 'rgba(249, 248, 236, 0.90)',
        border: theme === 'dark' ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(120, 100, 10, 0.15)',
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '10px 8px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: theme === 'dark'
          ? '0 8px 32px rgba(0,0,0,0.4)'
          : '0 8px 32px rgba(120, 100, 10, 0.08)',
      }}>
        {NAV_LINKS.map(link => {
          const active = isActive(link.href, pathname);
          return (
            <Link
              key={link.href}
              to={link.href}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 44, height: 44,
                borderRadius: '50%',
                color: active
                  ? 'var(--accent-b-light)'
                  : (theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'var(--text-dim)'),
                background: active
                  ? (theme === 'dark' ? 'rgba(194,136,77,0.14)' : 'rgba(180, 83, 9, 0.08)')
                  : 'transparent',
                border: active
                  ? (theme === 'dark' ? '1px solid rgba(194,136,77,0.25)' : '1px solid rgba(180, 83, 9, 0.20)')
                  : '1px solid transparent',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
              }}
            >
              {link.icon}
            </Link>
          );
        })}
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 44, height: 44, borderRadius: '50%',
            background: 'transparent', border: '1px solid transparent',
            color: theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'var(--text-dim)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 14px rgba(194,136,77,0.45); }
          50% { box-shadow: 0 0 24px rgba(194,136,77,0.70); }
        }
        .pill-link:hover {
          background: ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(120, 100, 10, 0.06)'} !important;
          border-color: ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(120, 100, 10, 0.08)'} !important;
          color: ${theme === 'dark' ? 'rgba(255,255,255,0.85)' : 'var(--text-hi)'} !important;
        }
        .pill-link[data-active="true"]:hover {
          background: ${theme === 'dark'
            ? 'linear-gradient(135deg, rgba(194,136,77,0.38) 0%, rgba(194,136,77,0.20) 100%)'
            : 'linear-gradient(135deg, rgba(180, 83, 9, 0.22) 0%, rgba(180, 83, 9, 0.12) 100%)'} !important;
          border-color: ${theme === 'dark' ? 'rgba(194,136,77,0.38)' : 'rgba(180, 83, 9, 0.35)'} !important;
          color: ${theme === 'dark' ? '#fff' : 'var(--text-hi)'} !important;
        }
        @media (max-width: 640px) {
          header { display: none !important; }
          .global-nav-mobile { display: flex !important; }
        }
      ` }} />
    </>
  );
}
