'use client';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { compile } from 'mathjs';
import { Activity } from 'lucide-react';

const PlotWrapper = dynamic(() => import('@/components/PlotWrapper'), {
  ssr: false,
  loading: () => <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>Cargando motor gráfico...</div>
});

type GraphMode = '2D' | '3D';

export default function GraficadoraPage() {
  const [mode, setMode] = useState<GraphMode>('2D');
  const [equation, setEquation] = useState('x^2');
  const [error, setError] = useState<string | null>(null);

  const plotData = useMemo(() => {
    setError(null);
    if (!equation.trim()) return null;

    try {
      const expr = compile(equation);

      if (mode === '2D') {
        const xValues: number[] = [];
        const yValues: number[] = [];
        
        for (let x = -10; x <= 10; x += 0.1) {
          xValues.push(x);
          yValues.push(expr.evaluate({ x, y: 0 }));
        }

        return [{
          x: xValues,
          y: yValues,
          type: 'scatter',
          mode: 'lines',
          line: { color: '#c2884d', width: 3 },
          name: `f(x) = ${equation}`
        }];
      } else {
        const xValues: number[] = [];
        const yValues: number[] = [];
        const zValues: number[][] = [];

        for (let i = -10; i <= 10; i += 0.5) {
          xValues.push(i);
          yValues.push(i);
        }

        for (let y = -10; y <= 10; y += 0.5) {
          const row: number[] = [];
          for (let x = -10; x <= 10; x += 0.5) {
            row.push(expr.evaluate({ x, y }));
          }
          zValues.push(row);
        }

        return [{
          z: zValues,
          x: xValues,
          y: yValues,
          type: 'surface',
          colorscale: [
            ['0.0', '#fefce8'],
            ['0.5', '#d4a96a'],
            ['1.0', '#9a3412']
          ],
          showscale: false
        }];
      }
    } catch (e: any) {
      setError('Ecuación inválida o incompleta. Asegúrate de usar variables correctas (x, y).');
      return null;
    }
  }, [equation, mode]);

  const layout = useMemo(() => {
    const baseLayout: any = {
      autosize: true,
      margin: { l: 40, r: 40, t: 40, b: 40 },
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#ffffff',
      hovermode: 'closest'
    };

    if (mode === '2D') {
      baseLayout.xaxis = {
        showgrid: true,
        gridcolor: '#e5e7eb',
        zerolinecolor: '#9ca3af',
        zerolinewidth: 2,
        color: '#374151'
      };
      baseLayout.yaxis = {
        showgrid: true,
        gridcolor: '#e5e7eb',
        zerolinecolor: '#9ca3af',
        zerolinewidth: 2,
        color: '#374151'
      };
    } else {
      baseLayout.scene = {
        bgcolor: '#ffffff',
        xaxis: { title: { text: 'X' }, showgrid: true, gridcolor: '#e5e7eb', color: '#374151' },
        yaxis: { title: { text: 'Y' }, showgrid: true, gridcolor: '#e5e7eb', color: '#374151' },
        zaxis: { title: { text: 'Z' }, showgrid: true, gridcolor: '#e5e7eb', color: '#374151' }
      };
    }

    return baseLayout;
  }, [mode]);

  const config = useMemo(() => ({ responsive: true, displayModeBar: true }), []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 80px' }}>
        
        {/* ── Header ── */}
        <header style={{ padding: '40px 0 32px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--accent-b-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-b-light)'
            }}>
              <Activity size={18} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
              Herramientas
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--sans)', fontWeight: 700,
            fontSize: 'clamp(24px,4vw,34px)',
            letterSpacing: '-0.02em', lineHeight: 1.1,
            color: 'var(--text-hi)'
          }}>
            Graficadora de Funciones
          </h1>
          <p style={{ marginTop: 12, color: 'var(--text)', fontSize: 15, maxWidth: 600, lineHeight: 1.5 }}>
            Visualiza funciones matemáticas complejas. Cambia entre el modo 2D y 3D para ver curvas o superficies.
          </p>
        </header>

        {/* ── Control Panel ── */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 14,
          padding: '24px',
          marginBottom: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}>
          
          {/* Mode Switcher */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => { setMode('2D'); setEquation('x^2'); }}
              style={{
                padding: '8px 16px', borderRadius: 8,
                background: mode === '2D' ? 'var(--accent-b-bg)' : 'transparent',
                border: `1px solid ${mode === '2D' ? 'var(--accent-b)' : 'var(--border)'}`,
                color: mode === '2D' ? 'var(--accent-b-light)' : 'var(--text-dim)',
                fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13, cursor: 'pointer'
              }}
            >
              Curvas (2D)
            </button>
            <button
              onClick={() => { setMode('3D'); setEquation('x^2 - y^2'); }}
              style={{
                padding: '8px 16px', borderRadius: 8,
                background: mode === '3D' ? 'var(--accent-b-bg)' : 'transparent',
                border: `1px solid ${mode === '3D' ? 'var(--accent-b)' : 'var(--border)'}`,
                color: mode === '3D' ? 'var(--accent-b-light)' : 'var(--text-dim)',
                fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13, cursor: 'pointer'
              }}
            >
              Superficies (3D)
            </button>
          </div>

          {/* Equation Input */}
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-hi)', fontWeight: 500 }}>
              {mode === '2D' ? 'f(x) =' : 'f(x, y) ='}
            </label>
            <input
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder={mode === '2D' ? 'ej. sin(x) * x' : 'ej. x^2 + y^2'}
              style={{
                width: '100%', maxWidth: 400,
                padding: '12px 16px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                color: 'var(--text-hi)',
                fontFamily: 'var(--mono)', fontSize: 16,
                outline: 'none',
                transition: 'border-color 0.15s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-b)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
            {error && <div style={{ color: 'var(--red)', fontSize: 13, marginTop: 8 }}>{error}</div>}
          </div>
        </div>

        {/* ── Plotly Canvas ── */}
        <div style={{
          width: '100%',
          height: 600,
          background: '#ffffff',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          border: '1px solid var(--border)'
        }}>
          {plotData ? (
             <PlotWrapper key={mode} data={plotData} layout={layout} config={config} />
          ) : (
             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                Ingresa una ecuación válida
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
