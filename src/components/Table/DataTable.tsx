import "./DataTable.scss";

import React, { useState, useMemo } from "react";
import { useContext } from "react";
import { DataContext } from "../../App";
import {
  calculatePercentagesFromSum,
  calculatePercentile60,
  findNearestCells,
  getColumnValues,
} from "../../util/utilFunc";
import type { Cell } from "../../util/types";

function calculatePercentagesFromHighest(matrix: Cell[][]): string[][] {
  let result = [] as string[][];

  for (let i = 0; i < matrix.length; i++) {
    const rowCopy = [...matrix[i]];
    result[i] = [];
    const highestNumber = rowCopy.sort((a, b) => b.value - a.value)[0].value;

    for (const cell of matrix[i]) {
      const percentage = ((cell.value / highestNumber) * 100).toFixed(1) + "%";
      result[i].push(percentage);
    }
  }

  console.log(matrix);
  console.log(result);

  return result;
}

export default function DataTable() {
  const { data, actions, numberOfNearest } = useContext(DataContext);
  const [hoveredSumRowIndex, setHoveredSumRowIndex] = useState<number | null>(
    null
  );
  const [nearestCells, setNearestCells] = useState<number[]>([]);

  const columnsMatrix = useMemo(() => getColumnValues(data), [data]);
  const percentageArrFromSum = useMemo(
    () => calculatePercentagesFromSum(data),
    [data]
  );
  const percentagesFromHighest = useMemo(
    () => calculatePercentagesFromHighest(data),
    [data]
  );

  function handleCellHover(cellId: number | null) {
    if (cellId !== null) {
      setNearestCells(findNearestCells(cellId, data, numberOfNearest));
    } else {
      setNearestCells([]);
    }
  }

  function handleSumCellHover(rowIndex: number | null) {
    setHoveredSumRowIndex(rowIndex);
  }

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
            {row.map((cell, cellIndex) => (
              <div
                key={cell.id}
                className={`grid-cell ${
                  nearestCells.includes(cell.id) ? "highlighted" : ""
                }`}
                onClick={() => actions.incrementCell(rowIndex, cellIndex)}
                onMouseEnter={() => handleCellHover(cell.id)}
                onMouseLeave={() => handleCellHover(null)}
              >
                {hoveredSumRowIndex === rowIndex ? (
                  <>
                    {percentageArrFromSum[rowIndex][cellIndex]}
                    <div className="cell-background">
                      {percentagesFromHighest[rowIndex][cellIndex]}
                    </div>
                  </>
                ) : (
                  cell.value
                )}
              </div>
            ))}
            <div
              key={`sum${rowIndex}`}
              className="grid-cell sum-cell"
              onMouseEnter={() => handleSumCellHover(rowIndex)}
              onMouseLeave={() => handleSumCellHover(null)}
            >
              {row.reduce((acc, currentValue) => {
                return acc + currentValue.value;
              }, 0)}
            </div>
          </div>
        ))}
        <div className="grid-row">
          <div className="grid-cell percentile-cell"></div>
          {columnsMatrix.map((column, columnIndex) => (
            <div
              key={`percentile${columnIndex}`}
              className="grid-cell percentile-cell"
            >
              {calculatePercentile60(column)}
            </div>
          ))}
          <div className="grid-cell percentile-cell"></div>
        </div>
      </div>
    </>
  );
}
