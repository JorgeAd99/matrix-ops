export type Matrix = number[][];

export function createMatrix(rows: number, cols: number): Matrix {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

export function transpose(m: Matrix): Matrix {
  const rows = m.length, cols = m[0].length;
  return Array.from({ length: cols }, (_, i) =>
    Array.from({ length: rows }, (_, j) => m[j][i])
  );
}

export function determinant(m: Matrix): number {
  const n = m.length;
  if (n !== m[0].length) throw new Error('La matriz debe ser cuadrada');
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  let det = 0;
  for (let j = 0; j < n; j++) {
    det += (j % 2 === 0 ? 1 : -1) * m[0][j] * determinant(minor(m, 0, j));
  }
  return det;
}

function minor(m: Matrix, row: number, col: number): Matrix {
  return m
    .filter((_, i) => i !== row)
    .map(r => r.filter((_, j) => j !== col));
}

export function inverse(m: Matrix): Matrix {
  const n = m.length;
  if (n !== m[0].length) throw new Error('La matriz debe ser cuadrada');
  const det = determinant(m);
  if (Math.abs(det) < 1e-10) throw new Error('La matriz es singular (det = 0)');

  if (n === 1) return [[1 / m[0][0]]];

  // Adjugate / det
  const adj: Matrix = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      adj[j][i] = ((i + j) % 2 === 0 ? 1 : -1) * determinant(minor(m, i, j));
    }
  }
  return adj.map(row => row.map(v => round(v / det)));
}

export function multiply(a: Matrix, b: Matrix): Matrix {
  if (a[0].length !== b.length)
    throw new Error(`Dimensiones incompatibles: ${a[0].length} cols ≠ ${b.length} filas`);
  return Array.from({ length: a.length }, (_, i) =>
    Array.from({ length: b[0].length }, (_, j) =>
      round(a[i].reduce((sum, _, k) => sum + a[i][k] * b[k][j], 0))
    )
  );
}

export function add(a: Matrix, b: Matrix): Matrix {
  if (a.length !== b.length || a[0].length !== b[0].length)
    throw new Error('Las matrices deben tener las mismas dimensiones');
  return a.map((row, i) => row.map((v, j) => round(v + b[i][j])));
}

export function subtract(a: Matrix, b: Matrix): Matrix {
  if (a.length !== b.length || a[0].length !== b[0].length)
    throw new Error('Las matrices deben tener las mismas dimensiones');
  return a.map((row, i) => row.map((v, j) => round(v - b[i][j])));
}

export function scalarMultiply(m: Matrix, scalar: number): Matrix {
  return m.map(row => row.map(v => round(v * scalar)));
}

export function power(m: Matrix, exp: number): Matrix {
  if (m.length !== m[0].length) throw new Error('La matriz debe ser cuadrada');
  if (exp === 0) return identity(m.length);
  if (exp < 0) return power(inverse(m), -exp);
  let result = identity(m.length);
  for (let i = 0; i < exp; i++) result = multiply(result, m);
  return result;
}

export function identity(n: number): Matrix {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
}

export function rank(m: Matrix): number {
  const rows = m.length, cols = m[0].length;
  const mat = m.map(r => [...r]);
  let r = 0;
  for (let col = 0; col < cols && r < rows; col++) {
    let pivot = -1;
    for (let row = r; row < rows; row++) {
      if (Math.abs(mat[row][col]) > 1e-10) { pivot = row; break; }
    }
    if (pivot === -1) continue;
    [mat[r], mat[pivot]] = [mat[pivot], mat[r]];
    const scale = mat[r][col];
    mat[r] = mat[r].map(v => v / scale);
    for (let row = 0; row < rows; row++) {
      if (row === r) continue;
      const factor = mat[row][col];
      mat[row] = mat[row].map((v, c) => v - factor * mat[r][c]);
    }
    r++;
  }
  return r;
}

export function trace(m: Matrix): number {
  if (m.length !== m[0].length) throw new Error('La matriz debe ser cuadrada');
  return round(m.reduce((sum, row, i) => sum + row[i], 0));
}

export function rowEchelon(m: Matrix): Matrix {
  const rows = m.length, cols = m[0].length;
  const mat = m.map(r => [...r]);
  let lead = 0;
  for (let r = 0; r < rows; r++) {
    if (lead >= cols) break;
    let i = r;
    while (Math.abs(mat[i][lead]) < 1e-10) {
      i++;
      if (i === rows) { i = r; lead++; if (lead === cols) return mat; }
    }
    [mat[i], mat[r]] = [mat[r], mat[i]];
    const div = mat[r][lead];
    mat[r] = mat[r].map(v => round(v / div));
    for (let j = 0; j < rows; j++) {
      if (j !== r) {
        const factor = mat[j][lead];
        mat[j] = mat[j].map((v, k) => round(v - factor * mat[r][k]));
      }
    }
    lead++;
  }
  return mat;
}

function round(v: number, decimals = 6): number {
  return Math.round(v * 10 ** decimals) / 10 ** decimals;
}

export function formatNumber(v: number): string {
  if (Number.isInteger(v)) return String(v);
  const s = v.toFixed(4);
  return parseFloat(s).toString();
}
