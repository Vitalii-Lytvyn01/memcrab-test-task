import type { Cell } from "./types";

export function createMatrix(rows: number, cols: number): Cell[][] {
  const matrix: Cell[][] = [];

  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = {
        value: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        id: parseInt(`${i}` + `${j}`),
      };
    }
  }

  return matrix;
}

export function calculatePercentile60(cells: Cell[]): number {
  const sorted = cells.map((value) => value.value).sort((a, b) => a - b);
  const index = (60 / 100) * (sorted.length - 1);

  if (Number.isInteger(index)) {
    return sorted[index];
  } else {
    const lower = sorted[Math.floor(index)];
    const upper = sorted[Math.ceil(index)];
    return parseFloat(
      (lower + (index - Math.floor(index)) * (upper - lower)).toFixed(1)
    );
  }
}

export function getColumnValues(matrix: Cell[][]): Cell[][] {
  const numCols = matrix[0].length;

  return Array.from({ length: numCols }, (_, colIndex) =>
    matrix.map((row) => row[colIndex])
  );
}

export function calculateXLimit(rows: number, cols: number): number {
  const totalCells = rows * cols;
  return Math.ceil(totalCells * 0.05);
}

export function calculatePercentagesFromSum(matrix: Cell[][]): string[][] {
  const result = [] as string[][];

  for (let i = 0; i < matrix.length; i++) {
    let sum = matrix[i].reduce((acc, currentValue) => {
      return acc + currentValue.value;
    }, 0);
    result[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      let percentageFromSum =
        ((matrix[i][j].value / sum) * 100).toFixed(1) + "%";
      result[i].push(percentageFromSum);
    }
  }

  return result;
}

export function findNearestCells(
  cellId: number,
  matrix: Cell[][],
  numberOfNearest: number
): number[] {
  let allCells: Cell[] = [];
  let targetCell: Cell | null = null;

  for (const row of matrix) {
    for (const cell of row) {
      allCells.push(cell);
      if (cell.id === cellId) {
        targetCell = cell;
      }
    }
  }

  if (!targetCell) {
    return [];
  }

  const cellsWithDifference = allCells.map((cell) => ({
    cell,
    difference: Math.abs(cell.value - targetCell.value),
  }));

  return cellsWithDifference
    .sort((a, b) => a.difference - b.difference)
    .slice(0, numberOfNearest)
    .map((cell) => cell.cell.id);
}
