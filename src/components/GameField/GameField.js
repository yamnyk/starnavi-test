import React from 'react';

import styles from './GameField.module.css'
import {CELL_PICK_PLAYER} from "../../utils/CellsStatuses";
import {setScore} from "../../utils/reducer";

const GameField = ({grid, activeCell, mode, score, dispatch}) => {
  const activeClickHandler = (cell) => {
    cell.status = CELL_PICK_PLAYER;
    score.player++;
    dispatch(setScore({...score, player: score.player}))
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