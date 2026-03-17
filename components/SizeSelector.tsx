'use client';

interface Props {
  rows: number;
  cols: number;
  onRowsChange: (n: number) => void;
  onColsChange: (n: number) => void;
  squareOnly?: boolean;
}

const SIZES = [2, 3, 4, 5];

function SizeButtons({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <span style={{
          fontSize: 9, color: 'var(--text-dim)',
          textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600,
          fontFamily: 'var(--mono)',
        }}>
          {label}
        </span>
      )}
      <div style={{ display: 'flex', gap: 4 }}>
        {SIZES.map(n => {
          const active = value === n;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              style={{
                width: 28, height: 28, borderRadius: 5,
                background: active ? 'var(--accent-b)' : 'var(--bg-3)',
                border: `1px solid ${active ? 'var(--accent-b)' : 'var(--border-hi)'}`,
                color: active ? '#fff' : 'var(--text-dim)',
                fontFamily: 'var(--mono)', fontSize: 11,
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SizeSelector({ rows, cols, onRowsChange, onColsChange, squareOnly }: Props) {
  const handleRows = (n: number) => {
    onRowsChange(n);
    if (squareOnly) onColsChange(n);
  };
  const handleCols = (n: number) => {
    onColsChange(n);
    if (squareOnly) onRowsChange(n);
  };

  if (squareOnly) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--mono)' }}>n =</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {SIZES.map(n => {
            const active = rows === n;
            return (
              <button
                key={n}
                onClick={() => handleRows(n)}
                style={{
                  width: 28, height: 28, borderRadius: 5,
                  background: active ? 'var(--accent-b)' : 'var(--bg-3)',
                  border: `1px solid ${active ? 'var(--accent-b)' : 'var(--border-hi)'}`,
                  color: active ? '#fff' : 'var(--text-dim)',
                  fontFamily: 'var(--mono)', fontSize: 11,
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
      <SizeButtons value={rows} onChange={handleRows} label="Filas" />
      <span style={{ color: 'var(--text-dim)', fontSize: 13, paddingBottom: 4 }}>×</span>
      <SizeButtons value={cols} onChange={handleCols} label="Cols" />
    </div>
  );
}
