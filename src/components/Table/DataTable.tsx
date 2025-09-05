import { useState } from 'react'

export default function DataTable() {

  const [dataMatrix, setDataMatrix] = useState([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

  return (
    <>
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
    </>
  )
}
