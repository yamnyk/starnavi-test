import React from 'react';

import styles from './GameField.module.css'
import {CELL_PICK_PLAYER} from "../../../utils/CellsStatuses";
import {setGrid} from "../../../utils/reducer";

const GameField = ({grid, activeCell, activeMode, dispatch}) => {
  const activeClickHandler = (cell) => {
    const newGrid = [...grid];
    newGrid[cell.y] = [...newGrid[cell.y]];
    newGrid[cell.y][cell.x].status = CELL_PICK_PLAYER;
    
    dispatch(setGrid(newGrid))
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
    <div className={styles.GameContainer}>
      {
        grid && grid.map((row, y) => (
          row.map((cell, x) => {
            return <div
              key={x}
              onClick={clickOnCell(cell)}
              className={[styles.GridCell, styles[`GridCell${activeMode.field}`], styles[cell.status]].join(' ')}/>
          })
        ))
      }
    </div>
  );
};

export default GameField;