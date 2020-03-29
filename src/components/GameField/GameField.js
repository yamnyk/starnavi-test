import React from 'react';

import styles from './GameField.module.css'

const GameField = ({grid, mode}) => {
  
  return (
    <div className={styles.Game_Container}>
      {
        grid
          ? grid.map((r, y) => (
            <div key={y} className={styles.GridRow}>
              {
                r.map((c,x) => {
                  console.log(c);
                  return <div key={x} className={[styles.GridCell, styles[c.status]].join(' ')} />
                })
              }
            </div>
          ))
          : <p className={styles.Message}>You didn't chose the game mode</p>
      }
    </div>
  );
};

export default GameField;