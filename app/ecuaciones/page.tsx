'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { solveLinearSystem, SolveResult } from '@/lib/linearSolver';
import { toFraction, formatNumber } from '@/lib/matrixOps';

const MIN_EQS = 2; const MAX_EQS = 6;
const MIN_UNK = 2; const MAX_UNK = 5;
const XSUB = ['₁','₂','₃','₄','₅','₆'];
const TSUB = ['₁','₂','₃','₄','₅'];

function createAug(eqs: number, unknowns: number): number[][] {
  return Array.from({ length: eqs }, () => Array(unknowns + 1).fill(0));
}

function fmt(v: number, frac: boolean): string {
  return frac ? toFraction(v) : formatNumber(v);
}

/* ── Editable augmented-matrix cell ── */
function AugCell({
  value, isB, onChange,
}: { value: number; isB: boolean; onChange: (v: string) => void }) {
  const [local, setLocal] = useState(String(value));

  const handleBlur = () => {
    const p = parseFloat(local);
    if (isNaN(p) || local.trim() === '' || local.trim() === '-') {
      setLocal('0'); onChange('0');
    } else {
      setLocal(String(p));
    }
  };

  return (
    <input
      type="text" inputMode="decimal" value={local}
      onChange={e => { setLocal(e.target.value); const p = parseFloat(e.target.value); if (!isNaN(p)) onChange(e.target.value); }}
      onBlur={handleBlur}
      onFocus={e => e.target.select()}
      style={{
        width: 62, height: 38, borderRadius: 5,
        fontFamily: 'var(--mono)', fontSize: 12, textAlign: 'center',
        background: isB ? 'rgba(194,136,77,0.07)' : 'var(--bg-input)',
        border: `1px solid ${isB ? 'rgba(194,136,77,0.25)' : 'var(--border)'}`,
        color: isB ? 'var(--accent-b-light)' : 'var(--text-hi)',
        outline: 'none',
        transition: 'border-color 0.12s, box-shadow 0.12s',
      }}
    />
  );
}

/* ── Read-only mini-cell for step matrices ── */
function MiniCell({ value, isB, frac }: { value: number; isB: boolean; frac: boolean }) {
  return (
    <div style={{
      width: 54, height: 30, borderRadius: 4,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--mono)', fontSize: 11,
      background: isB ? 'rgba(194,136,77,0.06)' : 'var(--bg-input)',
      border: `1px solid ${isB ? 'rgba(194,136,77,0.18)' : 'var(--border)'}`,
      color: isB ? 'var(--accent-b-light)' : 'var(--text)',
    }}>
      {fmt(value, frac)}
    </div>
  );
}

/* ── Augmented matrix [A|b] input ── */
function AugmentedMatrix({ unknowns, matrix, onChange }: {
  unknowns: number; matrix: number[][];
  onChange: (i: number, j: number, v: string) => void;
}) {
  const bs = (side: 'left' | 'right') => ({
    width: 7,
    borderTop: '2px solid rgba(194,136,77,0.35)',
    borderBottom: '2px solid rgba(194,136,77,0.35)',
    ...(side === 'left'
      ? { borderLeft: '2px solid rgba(194,136,77,0.35)', borderRadius: '4px 0 0 4px' }
      : { borderRight: '2px solid rgba(194,136,77,0.35)', borderRadius: '0 4px 4px 0' }),
  });
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 6, justifyContent: 'center' }}>
      <div style={bs('left')} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {matrix.map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {row.slice(0, unknowns).map((val, j) => (
              <AugCell key={j} value={val} isB={false} onChange={v => onChange(i, j, v)} />
            ))}
            <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(194,136,77,0.35)', margin: '0 4px' }} />
            <AugCell value={row[unknowns]} isB onChange={v => onChange(i, unknowns, v)} />
          </div>
        ))}
      </div>
      <div style={bs('right')} />
    </div>
  );
}

/* ── Mini augmented matrix for steps ── */
function StepMatrix({ unknowns, matrix, frac }: { unknowns: number; matrix: number[][]; frac: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 4, overflowX: 'auto' }}>
      <div style={{ width: 5, borderTop: '2px solid rgba(148,163,184,0.2)', borderLeft: '2px solid rgba(148,163,184,0.2)', borderBottom: '2px solid rgba(148,163,184,0.2)', borderRadius: '3px 0 0 3px', flexShrink: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {matrix.map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {row.slice(0, unknowns).map((v, j) => <MiniCell key={j} value={v} isB={false} frac={frac} />)}
            <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(194,136,77,0.25)', margin: '0 3px' }} />
            <MiniCell value={row[unknowns]} isB frac={frac} />
          </div>
        ))}
      </div>
      <div style={{ width: 5, borderTop: '2px solid rgba(148,163,184,0.2)', borderRight: '2px solid rgba(148,163,184,0.2)', borderBottom: '2px solid rgba(148,163,184,0.2)', borderRadius: '0 3px 3px 0', flexShrink: 0 }} />
    </div>
  );
}

/* ── Fraction toggle button ── */
function FractionToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        display: 'flex', alignItems: 'center', gap: 7,
        background: value ? 'rgba(52,211,153,0.12)' : 'rgba(99,102,241,0.08)',
        border: `1px solid ${value ? 'rgba(52,211,153,0.30)' : 'rgba(99,102,241,0.20)'}`,
        borderRadius: 20, padding: '5px 12px 5px 8px',
        cursor: 'pointer', transition: 'all 0.2s ease',
      }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 15, borderRadius: 8,
        background: value ? 'rgba(52,211,153,0.25)' : 'rgba(148,163,184,0.15)',
        position: 'relative', transition: 'background 0.2s',
      }}>
        <span style={{
          position: 'absolute', width: 11, height: 11, borderRadius: '50%',
          background: value ? 'var(--green)' : 'rgba(148,163,184,0.6)',
          left: value ? 'calc(100% - 13px)' : '2px',
          transition: 'left 0.2s, background 0.2s',
          boxShadow: value ? '0 0 6px rgba(52,211,153,0.6)' : 'none',
        }} />
      </span>
      <span style={{
        fontSize: 11, fontWeight: 600, fontFamily: 'var(--mono)',
        color: value ? 'var(--green)' : 'var(--text-dim)',
        transition: 'color 0.2s', letterSpacing: '0.04em',
      }}>
        {value ? '¹⁄ₙ fracciones' : '.0 decimales'}
      </span>
    </button>
  );
}

/* ── Main page ── */
export default function EcuacionesPage() {
  const [eqs,        setEqs]        = useState(3);
  const [unknowns,   setUnknowns]   = useState(3);
  const [aug,        setAug]        = useState<number[][]>(createAug(3, 3));
  const [result,     setResult]     = useState<SolveResult | null>(null);
  const [error,      setError]      = useState<string | null>(null);
  const [showSteps,  setShowSteps]  = useState(false);
  const [useFraction,setUseFraction]= useState(false);
  const [rKey,       setRKey]       = useState(0);
  const [showReport, setShowReport] = useState(false);

  const updateCell = useCallback((i: number, j: number, val: string) => {
    setAug(prev => { const m = prev.map(r => [...r]); m[i][j] = parseFloat(val) || 0; return m; });
  }, []);

  const changeEqs = (e: number) => { setEqs(e); setAug(createAug(e, unknowns)); setResult(null); setError(null); };
  const changeUnk = (u: number) => { setUnknowns(u); setAug(createAug(eqs, u)); setResult(null); setError(null); };

  const solve = () => {
    setError(null);
    try {
      const res = solveLinearSystem(eqs, unknowns, aug);
      setResult(res); setRKey(k => k + 1); setShowSteps(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al resolver');
    }
  };

  const card: React.CSSProperties = {
    background: 'var(--bg-card)', border: '1px solid var(--border-card)',
    borderRadius: 12, padding: '18px 20px', backdropFilter: 'blur(8px)',
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>

      {/* ── Report modal ── */}
      {showReport && (
        <div
          onClick={() => setShowReport(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="result-appear"
            style={{
              background: 'var(--bg-2)',
              border: '1px solid var(--border-hi)',
              borderRadius: 16,
              padding: '28px 28px 24px',
              maxWidth: 420, width: '100%',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Modal header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(251,191,36,0.10)',
                  border: '1px solid rgba(251,191,36,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}>!</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-hi)' }}>¿Encontraste algo incorrecto?</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>Ayudános a mejorar la calculadora</div>
                </div>
              </div>
              <button
                onClick={() => setShowReport(false)}
                style={{
                  background: 'transparent', border: 'none',
                  color: 'var(--text-dim)', fontSize: 18,
                  cursor: 'pointer', lineHeight: 1, padding: 4,
                  borderRadius: 6, flexShrink: 0,
                }}
              >×</button>
            </div>

            {/* Body */}
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, marginBottom: 20 }}>
              Si el resultado te parece incorrecto, ya sea por un cálculo erróneo o un comportamiento inesperado,
              reporálo para que podamos revisarlo y corregirlo.
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              <Link
                href="/reportar"
                onClick={() => setShowReport(false)}
                style={{
                  flex: 1, padding: '10px 16px', borderRadius: 9,
                  background: '#c2884d',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: 13, fontWeight: 600,
                  textAlign: 'center', textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(194,136,77,0.25)',
                  display: 'block',
                }}
              >
                Ir a Reportar error
              </Link>
              <button
                onClick={() => setShowReport(false)}
                style={{
                  padding: '10px 16px', borderRadius: 9,
                  background: 'transparent',
                  border: '1px solid var(--border-hi)',
                  color: 'var(--text)', fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 16px 80px' }}>

        {/* Header */}
        <header style={{ padding: 'clamp(20px,4vw,40px) 0 clamp(16px,3vw,32px)', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: 'linear-gradient(135deg, #c2884d 0%, #d4a96a 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 14px rgba(194,136,77,0.3)',
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, color: '#fff' }}>Σ</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>
                  Álgebra Lineal
                </span>
              </div>
              <h1 style={{
                fontFamily: 'var(--sans)', fontWeight: 700,
                fontSize: 'clamp(22px,4vw,32px)', letterSpacing: '-0.03em', lineHeight: 1,
                background: 'linear-gradient(90deg, var(--text-hi) 0%, var(--text-mid) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Ecuaciones Lineales
              </h1>
              <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 6 }}>
                Resuelve sistemas{' '}
                <span style={{ fontFamily: 'var(--mono)', color: 'var(--accent-b-light)' }}>Ax = b</span>
                {' '}usando{' '}
                <Link
                  href="/material/gauss-jordan"
                  style={{
                    color: '#93c5fd',
                    textDecoration: 'underline',
                    textDecorationStyle: 'dotted',
                    textUnderlineOffset: '3px',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  eliminación de Gauss-Jordan
                  <sup style={{ fontSize: 9, marginLeft: 2, opacity: 0.8 }}>↗</sup>
                </Link>
              </p>
            </div>
          </div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Size selector */}
          <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--text-dim)', minWidth: 80 }}>Ecuaciones:</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: MAX_EQS - MIN_EQS + 1 }, (_, i) => i + MIN_EQS).map(v => (
                  <button key={v} onClick={() => changeEqs(v)} style={{
                    width: 34, height: 28, borderRadius: 6,
                    background: v === eqs ? 'rgba(194,136,77,0.12)' : 'transparent',
                    border: `1px solid ${v === eqs ? 'rgba(194,136,77,0.30)' : 'var(--border)'}`,
                    color: v === eqs ? 'var(--accent-b-light)' : 'var(--text)',
                    fontFamily: 'var(--mono)', fontSize: 12, fontWeight: v === eqs ? 600 : 400,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}>{v}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--text-dim)', minWidth: 80 }}>Incógnitas:</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: MAX_UNK - MIN_UNK + 1 }, (_, i) => i + MIN_UNK).map(v => (
                  <button key={v} onClick={() => changeUnk(v)} style={{
                    width: 34, height: 28, borderRadius: 6,
                    background: v === unknowns ? 'rgba(52,211,153,0.10)' : 'transparent',
                    border: `1px solid ${v === unknowns ? 'rgba(52,211,153,0.28)' : 'var(--border)'}`,
                    color: v === unknowns ? 'var(--green)' : 'var(--text)',
                    fontFamily: 'var(--mono)', fontSize: 12, fontWeight: v === unknowns ? 600 : 400,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}>{v}</button>
                ))}
              </div>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-dim)', marginLeft: 'auto', fontFamily: 'var(--mono)' }}>
              {eqs}×{unknowns} — {eqs > unknowns ? 'sobredeterminado' : eqs < unknowns ? 'subdeterminado' : 'cuadrado'}
            </span>
          </div>

          {/* Augmented matrix card */}
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{
                padding: '4px 10px', borderRadius: 6,
                background: 'var(--accent-b-bg)', border: '1px solid rgba(194,136,77,0.2)',
                fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent-b-light)',
              }}>
                [ A | b ]
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>
                Ingresá los coeficientes de A y los términos independientes b
              </span>
            </div>

            {/* Variable labels */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {Array.from({ length: unknowns }, (_, j) => (
                  <div key={j} style={{ width: 62, textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-dim)' }}>
                    x{XSUB[j]}
                  </div>
                ))}
                <div style={{ width: 9 }} />
                <div style={{ width: 62, textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(194,136,77,0.7)' }}>b</div>
              </div>
            </div>

            <AugmentedMatrix unknowns={unknowns} matrix={aug} onChange={updateCell} />

            {/* Equation preview */}
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(0,0,0,0.15)', borderRadius: 8 }}>
              <p style={{ fontSize: 10, color: 'var(--text-dim)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vista previa</p>
              {aug.map((row, i) => {
                const terms = row.slice(0, unknowns)
                  .map((c, j) => c === 0 ? null : `${c === 1 ? '' : c === -1 ? '-' : c}x${XSUB[j]}`)
                  .filter(Boolean);
                return (
                  <div key={i} style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text)', marginBottom: 2 }}>
                    {terms.length ? terms.join(' + ').replace(/\+ -/g, '− ') : '0'} = <span style={{ color: 'var(--accent-b-light)' }}>{row[unknowns]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Solve button */}
          <button onClick={solve} style={{
            width: '100%', padding: '13px 20px',
            background: '#c2884d', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, color: '#fff',
            fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13,
            cursor: 'pointer',
            boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset, 0 4px 16px rgba(194,136,77,0.22)',
          }}>
            Resolver sistema  Ax = b
          </button>

          {/* Error */}
          {error && (
            <div className="result-appear" style={{
              padding: '12px 16px', borderRadius: 10,
              background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.18)',
              color: 'var(--red)', fontFamily: 'var(--mono)', fontSize: 12,
            }}>
              ⚠ {error}
            </div>
          )}

          {/* Result */}
          {result && !error && (
            <div key={rKey} className="result-appear" style={{
              borderRadius: 12, overflow: 'hidden',
              border: result.type === 'unique'
                ? '1px solid rgba(52,211,153,0.14)'
                : result.type === 'none'
                ? '1px solid rgba(248,113,113,0.18)'
                : '1px solid rgba(251,191,36,0.18)',
            }}>
              {/* Result header */}
              <div style={{
                padding: '14px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
                background: result.type === 'unique'
                  ? 'rgba(52,211,153,0.04)'
                  : result.type === 'none'
                  ? 'rgba(248,113,113,0.04)'
                  : 'rgba(251,191,36,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>
                    {result.type === 'unique' ? '✅' : result.type === 'none' ? '✗' : '∞'}
                  </span>
                  <div>
                    <div style={{
                      fontSize: 13, fontWeight: 600,
                      color: result.type === 'unique' ? 'var(--green)' : result.type === 'none' ? 'var(--red)' : '#fbbf24',
                    }}>
                      {result.type === 'unique' ? 'Solución única' : result.type === 'none' ? 'Sin solución' : 'Infinitas soluciones'}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>
                      {result.type === 'unique' && 'El sistema tiene exactamente una solución'}
                      {result.type === 'none' && 'El sistema es inconsistente (0 = k ≠ 0)'}
                      {result.type === 'infinite' && `Variables libres: x${result.freeVarIndices!.map(i => XSUB[i]).join(', x')}`}
                    </div>
                  </div>
                </div>
                <FractionToggle value={useFraction} onChange={setUseFraction} />

                {/* Report button */}
                <button
                  onClick={() => setShowReport(true)}
                  title="Reportar un error en el resultado"
                  style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(251,191,36,0.08)',
                    border: '1px solid rgba(251,191,36,0.22)',
                    color: '#fbbf24',
                    fontSize: 15, fontWeight: 700, lineHeight: 1,
                    cursor: 'pointer', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={e => { const b = e.currentTarget; b.style.background='rgba(251,191,36,0.18)'; b.style.boxShadow='0 0 10px rgba(251,191,36,0.25)'; }}
                  onMouseLeave={e => { const b = e.currentTarget; b.style.background='rgba(251,191,36,0.08)'; b.style.boxShadow='none'; }}
                >
                  !
                </button>
              </div>

              {/* Result body */}
              <div style={{ padding: '18px 20px', background: 'rgba(0,0,0,0.1)' }}>

                {/* Unique solution */}
                {result.type === 'unique' && result.solution && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {result.solution.map((v, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 16px', borderRadius: 8,
                        background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.10)',
                      }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text-dim)', minWidth: 28 }}>
                          x{XSUB[i]}
                        </span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-dim)' }}>=</span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700, color: 'var(--green)' }}>
                          {fmt(v, useFraction)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Infinite solutions */}
                {result.type === 'infinite' && result.freeVarIndices && result.pivotColOfRow && (() => {
                  const free = result.freeVarIndices;
                  const pivCols = result.pivotColOfRow;
                  // Build parametric expressions for each variable
                  const pivRowOf: Record<number, number> = {};
                  pivCols.forEach((col, row) => { pivRowOf[col] = row; });
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <p style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>
                        Solución parametrizada — {free.map((i, k) => `x${XSUB[i]} = t${TSUB[k]}`).join(', ')} ∈ ℝ libre{free.length > 1 ? 's' : ''}:
                      </p>
                      {Array.from({ length: result.unknowns }, (_, xi) => {
                        const isFree = free.includes(xi);
                        const tIdx   = free.indexOf(xi);
                        const row    = pivRowOf[xi];
                        const mat    = result.reduced;
                        let expr = '';
                        if (isFree) {
                          expr = `t${TSUB[tIdx]}`;
                        } else if (row !== undefined) {
                          const constPart = fmt(mat[row][result.unknowns], useFraction);
                          const freeParts = free.map((fj, k) => {
                            const coef = mat[row][fj];
                            if (Math.abs(coef) < 1e-9) return '';
                            const sign = coef > 0 ? ' − ' : ' + ';
                            return `${sign}${fmt(Math.abs(coef), useFraction)}·t${TSUB[k]}`;
                          }).join('');
                          expr = constPart + freeParts;
                        } else { expr = '0'; }
                        return (
                          <div key={xi} style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '9px 14px', borderRadius: 7,
                            background: isFree ? 'rgba(251,191,36,0.04)' : 'rgba(52,211,153,0.04)',
                            border: `1px solid ${isFree ? 'rgba(251,191,36,0.14)' : 'rgba(52,211,153,0.10)'}`,
                          }}>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-dim)', minWidth: 28 }}>x{XSUB[xi]}</span>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-dim)' }}>=</span>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 600, color: isFree ? '#fbbf24' : 'var(--green)' }}>{expr}</span>
                            {isFree && <span style={{ fontSize: 10, color: '#fbbf24', marginLeft: 4, fontFamily: 'var(--mono)' }}>(libre)</span>}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {/* No solution */}
                {result.type === 'none' && (
                  <div style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(248,113,113,0.04)' }}>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--red)', marginBottom: 8 }}>
                      Forma RREF muestra contradicción (0 = k):
                    </p>
                    <StepMatrix unknowns={result.unknowns} matrix={result.reduced} frac={useFraction} />
                  </div>
                )}

                {/* Steps toggle */}
                <button
                  onClick={() => setShowSteps(s => !s)}
                  style={{
                    marginTop: 16, display: 'flex', alignItems: 'center', gap: 6,
                    background: 'transparent', border: '1px solid var(--border)',
                    borderRadius: 8, padding: '8px 14px', cursor: 'pointer',
                    color: 'var(--text-dim)', fontSize: 12, fontFamily: 'var(--sans)',
                    transition: 'border-color 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-b)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-b-light)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-dim)'; }}
                >
                  {showSteps ? '▲' : '▼'} &nbsp;
                  {showSteps ? 'Ocultar pasos' : `Ver pasos de eliminación (${result.steps.length} operaciones)`}
                </button>
              </div>

              {/* Steps panel */}
              {showSteps && (
                <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ height: 1, background: 'var(--border)', marginBottom: 4 }} />
                  {result.steps.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: 6,
                          background: 'var(--accent-b-bg)', border: '1px solid rgba(194,136,77,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent-b-light)', fontWeight: 600,
                        }}>
                          {idx + 1}
                        </div>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-hi)' }}>
                          {step.description}
                        </span>
                      </div>
                      <div style={{ paddingLeft: 30 }}>
                        <StepMatrix unknowns={result.unknowns} matrix={step.matrix} frac={useFraction} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
