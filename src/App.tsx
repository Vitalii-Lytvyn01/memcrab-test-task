import './App.scss'
import { createContext, useState } from 'react'

import { createMatrix } from './util/utilFunc';
import type { Context } from './util/types';

import InputContainer from './components/InputContainer/InputContainer';
import DataTable from './components/Table/DataTable';

export const DataContext = createContext<Context>({} as Context);

function App() {
  const [dataMatrix, setDataMatrix] = useState(createMatrix(10,10));

  function incrementCell(row: number, column: number) {
    let matrixClone = structuredClone(dataMatrix);
    matrixClone[row][column].value += 1;
    setDataMatrix(matrixClone);
  }

  function setMatrix(rows: number, cols: number) {
    setDataMatrix(createMatrix(rows,cols));

    console.log('setMarix');
  }

  function addRow() {
    let newRow = []
    for (let i = 0; i < dataMatrix[0].length; i++) {
      newRow[i] = {
        value: Math.floor(Math.random()*(999-100+1)+100),
        id: parseInt(`${i}` + `${dataMatrix.length}`)
      };
    }

    let matrixClone = structuredClone(dataMatrix);
    matrixClone.push(newRow);
    setDataMatrix(matrixClone);
  }

  function removeRow(row:number ) {
    let matrixClone = structuredClone(dataMatrix);
    matrixClone.splice(row, 1);
    setDataMatrix(matrixClone);
  }

  return (
    <DataContext value={{
      data: dataMatrix, 
      actions: {
        incrementCell,
        setMatrix,
        addRow,
        removeRow,
      }}}>
        <div className="app">
          <InputContainer/>
          <DataTable />
        </div>
    </DataContext>
  )
}

export default App
