export default function Footer() {
  return (
    <footer style={{
      marginTop: 64,
      padding: '24px 16px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    }}>
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
    </footer>
  );
}
