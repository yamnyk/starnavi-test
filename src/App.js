import React from 'react';

import styles from './App.module.css';
import Game from "./components/Game/Game";
import Winners from "./components/Winners/Winners";

const App = () => {
  const apiUrl = 'https://starnavi-frontend-test-task.herokuapp.com';
  return (
    <div className={styles.Container}>
      <Game api={apiUrl}/>
      <Winners api={apiUrl}/>
    </div>
  );
};

export default App;
