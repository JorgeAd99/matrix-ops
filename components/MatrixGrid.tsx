'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Matrix, formatNumber, toFraction } from '@/lib/matrixOps';

interface Props {
  matrix: Matrix;
  onChange?: (i: number, j: number, val: string) => void;
  readOnly?: boolean;
  label?: string;
  highlight?: boolean;
  useFraction?: boolean;
}

// ── Inner cell ───────────────────────────────────────────────────────────────
function MatrixCell({
  value,
  row,
  col,
  onChange,
  onNavigate,
}: {
  value: number;
  row: number;
  col: number;
  onChange: (val: string) => void;
  onNavigate: (row: number, col: number, dir: string) => void;
}) {
  const [local, setLocal] = useState<string>(String(value));

  // Sync when the matrix is reset / resized externally
  useEffect(() => {
    setLocal(String(value));
  }, [value]);

  const handleChange = (raw: string) => {
    setLocal(raw);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) onChange(raw);
  };

  const handleBlur = () => {
    const parsed = parseFloat(local);
    if (isNaN(parsed) || local.trim() === '' || local.trim() === '-') {
      setLocal('0');
      onChange('0');
    } else {
      setLocal(String(parsed));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const NAV_KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Enter'];
    if (NAV_KEYS.includes(e.key)) {
      e.preventDefault();
      onNavigate(row, col, e.key);
    }
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={local}
      data-cell={`${row},${col}`}
      className="m-cell"
      onChange={e => handleChange(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onFocus={e => e.target.select()}
    />
  );
}

// ── Main grid ────────────────────────────────────────────────────────────────
export default function MatrixGrid({ matrix, onChange, readOnly, label, highlight, useFraction }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;

  const focusCell = useCallback((i: number, j: number) => {
    const el = gridRef.current?.querySelector<HTMLInputElement>(`[data-cell="${i},${j}"]`);
    if (el) { el.focus(); el.select(); }
  }, []);

  const navigate = useCallback((i: number, j: number, key: string) => {
    let ni = i, nj = j;
    switch (key) {
      case 'Enter':
      case 'ArrowRight': nj++; if (nj >= cols) { nj = 0; ni++; } break;
      case 'ArrowLeft':  nj--; if (nj < 0)    { nj = cols - 1; ni--; } break;
      case 'ArrowDown':  ni++; break;
      case 'ArrowUp':    ni--; break;
    }
    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
      focusCell(ni, nj);
    }
  }, [rows, cols, focusCell]);

  const bracketColor = highlight ? 'var(--green)' : 'rgba(99,102,241,0.4)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {label && (
        <span style={{ fontFamily: 'var(--mono)', color: 'var(--accent-b)', fontSize: 12, letterSpacing: '0.08em' }}>
          {label}
        </span>
      )}
      {/* Scrollable on small screens */}
      <div className="matrix-scroll">
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 6 }}>
          {/* Left bracket */}
          <div style={{
            width: 7,
            borderTop: `2px solid ${bracketColor}`,
            borderLeft: `2px solid ${bracketColor}`,
            borderBottom: `2px solid ${bracketColor}`,
            borderRadius: '4px 0 0 4px',
          }} />

          <div
            ref={gridRef}
            style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 5 }}
          >
            {matrix.map((row, i) =>
              row.map((val, j) =>
                readOnly ? (
                  <div
                    key={`${i}-${j}`}
                    className={`m-cell-ro${highlight ? ' highlight' : ''}`}
                  >
                    {useFraction ? toFraction(val) : formatNumber(val)}
                  </div>
                ) : (
                  <MatrixCell
                    key={`${i}-${j}`}
                    value={val}
                    row={i}
                    col={j}
                    onChange={v => onChange?.(i, j, v)}
                    onNavigate={navigate}
                  />
                )
              )
            )}
          </div>

          {/* Right bracket */}
          <div style={{
            width: 7,
            borderTop: `2px solid ${bracketColor}`,
            borderRight: `2px solid ${bracketColor}`,
            borderBottom: `2px solid ${bracketColor}`,
            borderRadius: '0 4px 4px 0',
          }} />
        </div>
      </div>
    </div>
  );
}
