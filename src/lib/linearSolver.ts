export type Step = {
  description: string;
  matrix: number[][];
};

export type SolveResult = {
  type: 'unique' | 'infinite' | 'none';
  solution?: number[];
  /** Indices (0-based) of free/undetermined variables */
  freeVarIndices?: number[];
  /** Which column holds the pivot for each pivot row (length = number of pivots) */
  pivotColOfRow?: number[];
  steps: Step[];
  reduced: number[][];
  /** Number of equations (rows of A) */
  eqs: number;
  /** Number of unknowns (columns of A) */
  unknowns: number;
};

const SUB = ['₁','₂','₃','₄','₅','₆'];
const R   = (i: number) => `R${SUB[i] ?? (i + 1)}`;

function round(v: number): number {
  return Math.round(v * 1e9) / 1e9;
}

function fmtStep(v: number): string {
  const a = Math.abs(v);
  const snapped = parseFloat(a.toFixed(8));
  if (Number.isInteger(snapped)) return String(snapped);
  return parseFloat(snapped.toFixed(3)).toString();
}

/**
 * Solves the linear system Ax = b via Gauss-Jordan elimination.
 * @param eqs      Number of equations (rows of the augmented matrix)
 * @param unknowns Number of unknowns  (columns of A, i.e. aug has unknowns+1 cols)
 * @param aug      Augmented matrix [A | b], size eqs × (unknowns+1)
 */
export function solveLinearSystem(eqs: number, unknowns: number, aug: number[][]): SolveResult {
  const mat: number[][] = aug.map(r => [...r]);
  const steps: Step[]   = [];
  const pivotColOfRow: number[] = [];
  let curRow = 0;

  for (let col = 0; col < unknowns && curRow < eqs; col++) {
    // Partial pivoting
    let maxRow = curRow;
    for (let r = curRow + 1; r < eqs; r++) {
      if (Math.abs(mat[r][col]) > Math.abs(mat[maxRow][col])) maxRow = r;
    }
    if (Math.abs(mat[maxRow][col]) < 1e-10) continue;

    // Swap rows
    if (maxRow !== curRow) {
      [mat[curRow], mat[maxRow]] = [mat[maxRow], mat[curRow]];
      steps.push({ description: `${R(curRow)} ↔ ${R(maxRow)}`, matrix: mat.map(r => [...r]) });
    }

    // Scale pivot row to leading 1
    const pv = mat[curRow][col];
    if (Math.abs(pv - 1) > 1e-10) {
      mat[curRow] = mat[curRow].map(v => round(v / pv));
      steps.push({ description: `${R(curRow)} ← ${R(curRow)} ÷ ${fmtStep(pv)}`, matrix: mat.map(r => [...r]) });
    }

    // Eliminate every other row
    for (let r = 0; r < eqs; r++) {
      if (r === curRow) continue;
      const f = mat[r][col];
      if (Math.abs(f) < 1e-10) continue;
      mat[r] = mat[r].map((v, c) => round(v - f * mat[curRow][c]));
      const sign = f > 0 ? '−' : '+';
      steps.push({
        description: `${R(r)} ← ${R(r)} ${sign} ${fmtStep(f)}·${R(curRow)}`,
        matrix: mat.map(r => [...r]),
      });
    }

    pivotColOfRow[curRow] = col;
    curRow++;
  }

  // Check for inconsistency: any row [0 … 0 | k≠0]
  for (let r = 0; r < eqs; r++) {
    const allZ = mat[r].slice(0, unknowns).every(v => Math.abs(v) < 1e-10);
    if (allZ && Math.abs(mat[r][unknowns]) > 1e-10) {
      return { type: 'none', steps, reduced: mat, eqs, unknowns, pivotColOfRow };
    }
  }

  // Identify free variables (columns without a pivot)
  const pivoted = new Set(pivotColOfRow.slice(0, curRow));
  const freeVarIndices = Array.from({ length: unknowns }, (_, i) => i).filter(i => !pivoted.has(i));

  if (freeVarIndices.length > 0) {
    return { type: 'infinite', freeVarIndices, pivotColOfRow, steps, reduced: mat, eqs, unknowns };
  }

  // Unique solution
  const solution = new Array<number>(unknowns).fill(0);
  for (let r = 0; r < curRow; r++) {
    solution[pivotColOfRow[r]] = round(mat[r][unknowns]);
  }
  return { type: 'unique', solution, pivotColOfRow, steps, reduced: mat, eqs, unknowns };
}
