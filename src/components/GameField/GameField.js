import React from 'react';

import styles from './GameField.module.css'
import {CELL_PICK_PLAYER} from "../../utils/CellsStatuses";
import {updateScoreAndGrid} from "../../utils/reducer";

const GameField = ({grid, activeCell, score, dispatch}) => {
  const activeClickHandler = (cell) => {
    const newGrid = [...grid],
      newScore = {...score};
    newGrid[cell.y] = [...newGrid[cell.y]];
    newGrid[cell.y][cell.x].status = CELL_PICK_PLAYER;
    newScore.player++;
    
    dispatch(updateScoreAndGrid({
      score: newScore,
      grid: newGrid
    }))
  };
  
  const clickOnCell = (cell) => {
    if (activeCell
      && activeCell.x === cell.x
      && activeCell.y === cell.y) {
      return () => activeClickHandler(cell)
    } else {
      return null
    }
  };
  
  return (
    <div className={styles.Game_Container}>
      {
        grid && grid.map((row, y) => (
          <div key={y} className={styles.GridRow}>
            {
              row.map((cell, x) => {
                return <div
                  key={x}
                  onClick={clickOnCell(cell)}
                  className={[styles.GridCell, styles[cell.status]].join(' ')}/>
              })
            }
          </div>
        ))
      }
    </div>
  );
};

export default GameField;