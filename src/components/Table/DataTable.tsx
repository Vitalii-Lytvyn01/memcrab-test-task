import "./DataTable.scss";

import { useState } from 'react'
import { useContext } from 'react';
import { DataContext } from '../../App';


export default function DataTable() {

  const {data, actions} = useContext(DataContext);

  return (
    <>
      <div className="grid-container">
        {data.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          <div
            key={`remove${rowIndex}`}
            className="grid-cell remove-cell"
            onClick={() => actions.removeRow(rowIndex)}
          ></div>
          {
            row.map((cell,cellIndex) => (
              <div
                key={cell.id} 
                className="grid-cell"
                onClick={() => actions.incrementCell(rowIndex, cellIndex)}
              >
                {cell.value}
              </div>
            ))
          }
          <div
            key={`sum${rowIndex}`}
            className="grid-cell sum-cell">{
              row.reduce((acc, currentValue) => {
                return acc + currentValue.value
              }, 0)
            }</div>
        </div>
      ))}
      </div>
    </>
  )
}
