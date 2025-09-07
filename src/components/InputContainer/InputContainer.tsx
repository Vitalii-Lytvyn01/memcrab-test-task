import "./InputContainer.scss";
import { useContext, useState } from 'react';
import { DataContext } from '../../App';

export default function InputContainer() {

  const {actions} = useContext(DataContext);
  const [rows,setRows] = useState(10);
  const [cols,setCols] = useState(10);
  const [numberOfNearest,setNumberOfNearest] = useState(0);

  console.log(rows,cols);

  return (
    <div className="control-container">
      <div className="input-container">
              <input
        className='input number-input'
        type="number"
        name="rows"
        id="rows"
        placeholder='Rows'
        value={rows}
        onChange={(e) => setRows(parseInt(e.target.value))}
        max={100}
        min={0}
      />
      <input
        className='input'
        type="number"
        name="cols"
        id="cols"
        placeholder='Columns'
        value={cols}
        onChange={(e) => setCols(parseInt(e.target.value))}
        max={100}
        min={0}
      />
      </div>
      <div className="button-container">
        <div
        className="button"
        onClick={() => actions.setMatrix(rows,cols)}
      >
        Set Matrix
      </div>
      <div
        className="button"
        onClick={() => actions.addRow()}
      >
        Add Row
      </div>
      </div>
    </div>
  )
}
