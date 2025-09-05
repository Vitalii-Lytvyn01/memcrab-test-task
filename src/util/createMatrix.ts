export default function createMatrix(rows: number, cols: number):number[][] {
  const matrix: number[][] = [];

  for(let i = 0; i < rows; i++) {
    matrix[i] = [];
    for(let j = 0; j < cols; j++) {
      matrix[i][j] = Math.floor(Math.random()*(999-100+1)+100);
    }
  }

  return matrix;
}