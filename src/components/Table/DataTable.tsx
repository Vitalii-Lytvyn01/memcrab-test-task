import { useState } from 'react'
import "./DataTable.scss";

import createMatrix from '../../util/createMatrix';

export default function DataTable() {
  const n = 10;
  const m = 10;

  const [dataMatrix, setDataMatrix] = useState(createMatrix(n,m));


  

  return (
    <>
      <div className="grid-container">
        {dataMatrix.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {
            row.map((cell,cellIndex) => (
              <div key={cellIndex} className="grid-cell">
                {cell}
              </div>
            ))
          }
        </div>
      ))}
      </div>
    </>
  )
}
