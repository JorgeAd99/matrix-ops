'use client';
import { useState, useCallback } from 'react';
import MatrixGrid from '@/components/MatrixGrid';
import SizeSelector from '@/components/SizeSelector';
import {
  Matrix, createMatrix,
  transpose, determinant, inverse, multiply,
  add, subtract, scalarMultiply, power, rank, trace, rowEchelon, formatNumber
} from '@/lib/matrixOps';

type Op = 'transpose' | 'determinant' | 'inverse' | 'multiply' | 'add' | 'subtract' | 'scalar' | 'power' | 'rank' | 'trace' | 'rref';

const OPERATIONS: { id: Op; label: string; symbol: string; desc: string; twoMatrix?: boolean; squareOnly?: boolean }[] = [
  { id: 'determinant', label: 'Determinante',    symbol: 'det(A)', desc: 'Escalar de la transformación',    squareOnly: true },
  { id: 'inverse',     label: 'Inversa',         symbol: 'A⁻¹',   desc: 'Matriz inversa multiplicativa',   squareOnly: true },
  { id: 'transpose',   label: 'Transpuesta',     symbol: 'Aᵀ',    desc: 'Intercambia filas y columnas' },
  { id: 'trace',       label: 'Traza',           symbol: 'tr(A)', desc: 'Suma de la diagonal principal',   squareOnly: true },
  { id: 'rank',        label: 'Rango',           symbol: 'rk(A)', desc: 'Dimensión del espacio columna' },
  { id: 'rref',        label: 'Escalonada',      symbol: 'RREF',  desc: 'Reducción Gauss-Jordan' },
  { id: 'scalar',      label: 'Escalar',         symbol: 'k·A',   desc: 'Multiplica por una constante' },
  { id: 'power',       label: 'Potencia',        symbol: 'Aⁿ',    desc: 'Potencia entera de la matriz',    squareOnly: true },
  { id: 'multiply',    label: 'Multiplicar',     symbol: 'A×B',   desc: 'Producto matricial',              twoMatrix: true },
  { id: 'add',         label: 'Sumar',           symbol: 'A+B',   desc: 'Suma elemento a elemento',        twoMatrix: true },
  { id: 'subtract',    label: 'Restar',          symbol: 'A−B',   desc: 'Resta elemento a elemento',       twoMatrix: true },
];

const OP_GROUPS = [
  { title: 'Una matriz',   ids: ['determinant','inverse','transpose','trace','rank','rref','scalar','power'] },
  { title: 'Dos matrices', ids: ['multiply','add','subtract'] },
];

export default function Home() {
  const [selectedOp, setSelectedOp] = useState<Op>('determinant');
  const [rowsA, setRowsA] = useState(3);
  const [colsA, setColsA] = useState(3);
  const [rowsB, setRowsB] = useState(3);
  const [colsB, setColsB] = useState(3);
  const [matA, setMatA]   = useState<Matrix>(createMatrix(3, 3));
  const [matB, setMatB]   = useState<Matrix>(createMatrix(3, 3));
  const [scalar, setScalar]     = useState(2);
  const [powerExp, setPowerExp] = useState(2);
  const [result, setResult] = useState<Matrix | number | null>(null);
  const [error,  setError]  = useState<string | null>(null);
  const [rKey,   setRKey]   = useState(0);

  const currentOp = OPERATIONS.find(o => o.id === selectedOp)!;

  const updateMatA = useCallback((i: number, j: number, val: string) => {
    setMatA(prev => { const m = prev.map(r => [...r]); m[i][j] = parseFloat(val) || 0; return m; });
  }, []);
  const updateMatB = useCallback((i: number, j: number, val: string) => {
    setMatB(prev => { const m = prev.map(r => [...r]); m[i][j] = parseFloat(val) || 0; return m; });
  }, []);

  const resizeA = (r: number, c: number) => { setRowsA(r); setColsA(c); setMatA(createMatrix(r, c)); setResult(null); setError(null); };
  const resizeB = (r: number, c: number) => { setRowsB(r); setColsB(c); setMatB(createMatrix(r, c)); setResult(null); setError(null); };

  const compute = () => {
    setError(null);
    try {
      let res: Matrix | number | null = null;
      switch (selectedOp) {
        case 'transpose':   res = transpose(matA);           break;
        case 'determinant': res = determinant(matA);         break;
        case 'inverse':     res = inverse(matA);             break;
        case 'multiply':    res = multiply(matA, matB);      break;
        case 'add':         res = add(matA, matB);           break;
        case 'subtract':    res = subtract(matA, matB);      break;
        case 'scalar':      res = scalarMultiply(matA, scalar); break;
        case 'power':       res = power(matA, powerExp);     break;
        case 'rank':        res = rank(matA);                break;
        case 'trace':       res = trace(matA);               break;
        case 'rref':        res = rowEchelon(matA);          break;
      }
      setResult(res); setRKey(k => k + 1);
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Error'); }
  };

  const selectOp = (op: Op) => {
    setSelectedOp(op); setResult(null); setError(null);
    // If switching to a square-only op, make A square immediately
    const def = OPERATIONS.find(o => o.id === op)!;
    if (def.squareOnly) {
      const s = Math.min(rowsA, colsA);
      setRowsA(s); setColsA(s); setMatA(createMatrix(s, s));
    }
  };

  const isNum = typeof result === 'number';
  const isMat = Array.isArray(result);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── Header ── */}
        <header style={{ padding: '40px 0 32px', marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                {/* logo mark */}
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: 'linear-gradient(135deg, #c2884d 0%, #d4a96a 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 14px rgba(194,136,77,0.3)',
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, color: '#fff' }}>M</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>
                  Álgebra Lineal
                </span>
              </div>
              <h1 style={{
                fontFamily: 'var(--sans)', fontWeight: 700,
                fontSize: 'clamp(24px,4vw,34px)',
                letterSpacing: '-0.03em', lineHeight: 1,
                background: 'linear-gradient(90deg, var(--text-hi) 0%, var(--text-mid) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Matrix Ops
              </h1>
            </div>
            {/* current op badge */}
            <div style={{
              padding: '7px 14px', borderRadius: 8,
              background: 'var(--accent-b-bg)',
              border: '1px solid rgba(194,136,77,0.2)',
              fontFamily: 'var(--mono)', fontSize: 12,
              color: 'var(--accent-b-light)',
              backdropFilter: 'blur(8px)',
            }}>
              {currentOp.symbol}
              {currentOp.twoMatrix && <span style={{ color: 'var(--text-dim)', margin: '0 6px' }}>·</span>}
              {currentOp.twoMatrix && `${rowsA}×${colsA}  ×  ${rowsB}×${colsB}`}
              {!currentOp.twoMatrix && <span style={{ color: 'var(--text-dim)', marginLeft: 8 }}>{rowsA}×{colsA}</span>}
            </div>
          </div>
        </header>

        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

          {/* ── Sidebar ── */}
          <aside style={{
            width: 185, flexShrink: 0,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 14,
            padding: '14px 10px',
            backdropFilter: 'blur(12px)',
            position: 'sticky', top: 24,
          }}>
            {OP_GROUPS.map((group, gi) => (
              <div key={group.title} style={{ marginTop: gi === 0 ? 0 : 16 }}>
                <p style={{
                  fontSize: 9.5, color: 'var(--text-dim)',
                  textTransform: 'uppercase', letterSpacing: '0.14em',
                  fontWeight: 600, paddingLeft: 8, marginBottom: 5,
                }}>
                  {group.title}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {OPERATIONS.filter(o => group.ids.includes(o.id)).map(op => {
                    const active = selectedOp === op.id;
                    return (
                      <button
                        key={op.id}
                        onClick={() => selectOp(op.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 9,
                          width: '100%', padding: '8px 10px', borderRadius: 7,
                          background: active ? 'rgba(194,136,77,0.10)' : 'transparent',
                          border: active ? '1px solid rgba(194,136,77,0.20)' : '1px solid transparent',
                          cursor: 'pointer', textAlign: 'left',
                          borderLeft: active ? '2px solid var(--accent-b)' : '2px solid transparent',
                        }}
                      >
                        <span style={{
                          fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600,
                          color: active ? 'var(--accent-b-light)' : 'var(--text-dim)',
                          minWidth: 40,
                        }}>
                          {op.symbol}
                        </span>
                        <span style={{
                          fontSize: 12, fontWeight: active ? 500 : 400,
                          color: active ? 'var(--text-hi)' : 'var(--text)',
                        }}>
                          {op.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </aside>

          {/* ── Workspace ── */}
          <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Info strip */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 18px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 10,
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: 'var(--accent-b-bg)',
                border: '1px solid rgba(194,136,77,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600,
                color: 'var(--accent-b-light)',
                flexShrink: 0,
              }}>
                {currentOp.symbol}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-hi)', lineHeight: 1.3 }}>
                  {currentOp.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>
                  {currentOp.desc}
                </div>
              </div>
            </div>

            {/* Matrix A */}
            <MatrixCard
              label="A" rows={rowsA} cols={colsA}
              onRowsChange={r => currentOp.squareOnly ? resizeA(r, r) : resizeA(r, colsA)}
              onColsChange={c => currentOp.squareOnly ? resizeA(c, c) : resizeA(rowsA, c)}
              squareOnly={currentOp.squareOnly}
              accentColor="var(--accent-b)"
            >
              <MatrixGrid matrix={matA} onChange={updateMatA} />
            </MatrixCard>

            {/* Matrix B */}
            {currentOp.twoMatrix && (
              <MatrixCard
                label="B" rows={rowsB} cols={colsB}
                onRowsChange={r => resizeB(r, colsB)}
                onColsChange={c => resizeB(rowsB, c)}
                accentColor="rgba(148,163,184,0.6)"
              >
                <MatrixGrid matrix={matB} onChange={updateMatB} />
              </MatrixCard>
            )}

            {/* Extra params */}
            {(selectedOp === 'scalar' || selectedOp === 'power') && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 18px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 10,
              }}>
                <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                  {selectedOp === 'scalar' ? 'Escalar  k =' : 'Exponente  n ='}
                </span>
                <input
                  type="number"
                  value={selectedOp === 'scalar' ? scalar : powerExp}
                  onChange={e => selectedOp === 'scalar'
                    ? setScalar(parseFloat(e.target.value) || 0)
                    : setPowerExp(parseInt(e.target.value)  || 0)}
                  style={{
                    width: 72, height: 34, textAlign: 'center',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-hi)',
                    borderRadius: 6,
                    color: 'var(--text-hi)',
                    fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 600,
                    outline: 'none',
                  }}
                />
              </div>
            )}

            {/* Compute button */}
            <button
              onClick={compute}
              style={{
                width: '100%', padding: '13px 20px',
                background: '#c2884d',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                color: '#fff',
                fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13,
                letterSpacing: '0.01em', cursor: 'pointer',
                boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset, 0 4px 16px rgba(194,136,77,0.22)',
              }}
            >
              Calcular {currentOp.symbol}
            </button>

            {/* Error */}
            {error && (
              <div className="result-appear" style={{
                padding: '12px 16px',
                background: 'rgba(248,113,113,0.05)',
                border: '1px solid rgba(248,113,113,0.18)',
                borderRadius: 10,
                color: 'var(--red)',
                fontFamily: 'var(--mono)', fontSize: 12,
              }}>
                ⚠ {error}
              </div>
            )}

            {/* Result */}
            {result !== null && !error && (
              <div key={rKey} className="result-appear" style={{
                background: 'rgba(52,211,153,0.04)',
                border: '1px solid rgba(52,211,153,0.14)',
                borderRadius: 12,
                padding: '20px 24px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 18 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
                  <span style={{ fontSize: 10, color: 'var(--green)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
                    Resultado — {currentOp.symbol}
                  </span>
                </div>
                {isNum && (
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 52, fontWeight: 700,
                    color: 'var(--green)', textAlign: 'center',
                    padding: '10px 0',
                    textShadow: '0 0 40px rgba(52,211,153,0.4)',
                  }}>
                    {formatNumber(result as number)}
                  </div>
                )}
                {isMat && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MatrixGrid matrix={result as Matrix} readOnly highlight />
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

        {/* ── Footer ── */}
        <footer style={{
          marginTop: 64,
          paddingTop: 24,
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

    </div>
  );
}

/* ── Matrix card sub-component ───────────────────────────────────────────── */
function MatrixCard({
  label, rows, cols, onRowsChange, onColsChange, squareOnly, accentColor, children
}: {
  label: string;
  rows: number; cols: number;
  onRowsChange: (n: number) => void;
  onColsChange: (n: number) => void;
  squareOnly?: boolean;
  accentColor: string;
  children: React.ReactNode;
}) {
  const isAccentB = accentColor === 'var(--accent-b)';
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-card)',
      borderRadius: 12,
      padding: '18px 20px',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 6,
            background: isAccentB ? 'var(--accent-b-bg)' : 'rgba(168,162,158,0.06)',
            border: `1px solid ${isAccentB ? 'rgba(194,136,77,0.28)' : 'rgba(168,162,158,0.15)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700,
            color: accentColor,
          }}>
            {label}
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-hi)' }}>Matriz {label}</span>
          <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--mono)' }}>{rows}×{cols}</span>
        </div>
        <SizeSelector
          rows={rows} cols={cols}
          onRowsChange={onRowsChange}
          onColsChange={onColsChange}
          squareOnly={squareOnly}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}
