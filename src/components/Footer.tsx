
import { Coffee } from 'lucide-react';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
  </svg>
);

export default function Footer() {
  return (
    <footer style={{
      marginTop: 64,
      padding: '24px 16px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <a 
          href="https://instagram.com/jadodev" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#E1306C'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}
          title="Instagram"
        >
          <InstagramIcon size={20} />
        </a>
        <a 
          href="https://x.com/jadodev" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}
          title="X (Twitter)"
        >
          <XIcon size={20} />
        </a>
        <a 
          href="https://cafecito.app/jadodev" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#1DB954'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}
          title="Cafecito"
        >
          <Coffee size={20} />
        </a>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          Desarrollado por
        </span>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: 12,
          fontWeight: 600,
          background: 'linear-gradient(90deg, var(--accent-b) 0%, var(--accent-b-light) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.02em',
        }}>
          Jadodev
        </span>
      </div>
    </footer>
  );
}
