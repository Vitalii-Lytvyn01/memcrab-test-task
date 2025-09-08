import "./DataTable.scss";

import { useState, useMemo, useRef } from "react";
import { useContext } from "react";
import { DataContext } from "../../App";
import {
  calculatePercentagesFromHighest,
  calculatePercentagesFromSum,
  calculatePercentile60,
  findNearestCells,
  getColumnValues,
} from "../../util/utilFunc";

export default function DataTable() {
  const { data, actions, numberOfNearest } = useContext(DataContext);
  const [hoveredSumRowIndex, setHoveredSumRowIndex] = useState<number | null>(
    null
  );
  const [nearestCells, setNearestCells] = useState<number[]>([]);

  const matrixDivRef = useRef<HTMLDivElement | null>(null);
  const deleteDivRef = useRef<HTMLDivElement | null>(null);
  const sumDivRef = useRef<HTMLDivElement | null>(null);
  const percentageDivRef = useRef<HTMLDivElement | null>(null);

  const memoizedCalculations = useMemo(() => {
    const columnsMatrix = getColumnValues(data);
    const percentageArrFromSum = calculatePercentagesFromSum(data);
    const percentagesFromHighest = calculatePercentagesFromHighest(data);

    return {
      columnsMatrix,
      percentageArrFromSum,
      percentagesFromHighest,
    };
  }, [data]);

  const { columnsMatrix, percentageArrFromSum, percentagesFromHighest } =
    memoizedCalculations;

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

  function handleScrollVertical(event: any) {
    if (deleteDivRef.current && matrixDivRef.current && sumDivRef.current) {
      deleteDivRef.current.scrollTop = event.target.scrollTop;
      matrixDivRef.current.scrollTop = event.target.scrollTop;
      sumDivRef.current.scrollTop = event.target.scrollTop;
    }
  }

  function handleScrollHorizontal(event: any) {
    if (matrixDivRef.current && percentageDivRef.current) {
      matrixDivRef.current.scrollLeft = event.target.scrollLeft;
      percentageDivRef.current.scrollLeft = event.target.scrollLeft;
    }
  }

  return (
    <div className="table-container">
      <div className="main-row">
        <div
          ref={deleteDivRef}
          className="delete-container"
          onScroll={(event) => {
            handleScrollVertical(event);
          }}
        >
          {data.map((_row, rowIndex) => (
            <div
              key={`remove${rowIndex}`}
              className="grid-cell remove-cell"
              onClick={() => actions.removeRow(rowIndex)}
            ></div>
          ))}
        </div>
        <div
          ref={matrixDivRef}
          className="matrix-container"
          onScroll={(event) => {
            handleScrollVertical(event);
            handleScrollHorizontal(event);
          }}
        >
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
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
            </div>
          ))}
        </div>
        <div
          ref={sumDivRef}
          className="sum-container"
          onScroll={(event) => {
            handleScrollVertical(event);
          }}
        >
          {data.map((row, rowIndex) => (
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
          ))}
        </div>
      </div>
      <div className="secondary-row">
        <div
          ref={percentageDivRef}
          className="percentage-container grid-row"
          onScroll={(event) => {
            handleScrollHorizontal(event);
          }}
        >
          {columnsMatrix.map((column, columnIndex) => (
            <div
              key={`percentile${columnIndex}`}
              className="grid-cell percentile-cell"
            >
              {calculatePercentile60(column)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
