import React from 'react';

import styles from './WinnersList.module.css';
import Preloader from "../Preloader/Preloader";

const Winner = ({winner: name, date}) => {
  return <div className={[styles.Winner]}>
    <p>{name}</p>
    <p>{date}</p>
  </div>
};

const WinnersList = ({winners}) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.List}>
        {
          winners
            ? winners.map(w => <Winner key={w.id} {...w}>{w.winner}</Winner>)
            : <Preloader/>
        }
      </div>
    </div>
  );
};

export default WinnersList;