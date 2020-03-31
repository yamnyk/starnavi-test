import React from 'react';

import styles from './GameField.module.css'
import {CELL_PICK_PLAYER} from "../../utils/CellsStatuses";

const GameField = ({grid, activeCell, mode}) => {
  const activeClickHandler = (cell) => {
    cell.status = CELL_PICK_PLAYER;
    console.log(cell);
  };
  
  return (
    <div className={styles.Game_Container}>
      {
        grid
          ? grid.map((r, y) => (
            <div key={y} className={styles.GridRow}>
              {
                r.map((c, x) => {
                  if (c === activeCell) {
                    return <div key={x} className={[styles.GridCell, styles[c.status]].join(' ')} onClick={() => activeClickHandler(c)}/>
                  } else {
                    return <div key={x} className={[styles.GridCell, styles[c.status]].join(' ')}/>
                  }
                })
              }
            </div>
          ))
          : null
      }
    </div>
  );
};

export default GameField;