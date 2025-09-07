import type { Cell } from "./types";

export function createMatrix(rows: number, cols: number):Cell[][] {
  const matrix: Cell[][] = [];

  for(let i = 0; i < rows; i++) {
    matrix[i] = [];
    for(let j = 0; j < cols; j++) {
      matrix[i][j] = {
        value: Math.floor(Math.random()*(999-100+1)+100),
        id: parseInt(`${i}` + `${j}`)
      };
    }
  }

  return matrix;
}

export function calculatePercentile60(values:number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const index = (60/100) * (sorted.length - 1);
  
  if (Number.isInteger(index)) {
    return sorted[index];
  } else {
    const lower = sorted[Math.floor(index)];
    const upper = sorted[Math.ceil(index)];
    return lower + (index - Math.floor(index)) * (upper - lower);
  }
}