type CellId = number;
type CellValue = number;

type Cell = {
  id: CellId,
  value: CellValue,
}

type Context = {
  data: Cell[][],
  numberOfNearest: number,
  actions: {
    incrementCell: Function,
    setMatrix: Function,
    addRow: Function,
    removeRow: Function,
  }
}

export type { Cell, Context };