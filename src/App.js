import React, {useEffect, useState} from 'react';

import styles from './App.module.css';
import Game from "./components/Game/Game";
import WinnersList from "./components/Winners/WinnersList";
import SimpleErrorHandler from "./utils/SimpleErrorHandler";

function getFormatedDate(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'Jun',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return `${date.getHours()}:${date.getMinutes()}; ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

const App = () => {
  const apiUrl = 'https://starnavi-frontend-test-task.herokuapp.com',
    [winners, setWinners] = useState();
  
  const sendNewWinner = (winner) => {
    const sendNew = async () => {
      const winnerObj = {
          winner: winner,
          date: getFormatedDate(new Date())
        },
        resp = await fetch(`${apiUrl}/winners`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(winnerObj)
        }),
        respData = await resp.json();
      
      setWinners(respData.reverse());
    };
    sendNew().catch(SimpleErrorHandler);
  };
  
  useEffect(() => {
    const getWinners = async () => {
      const resp = await fetch(`${apiUrl}/winners`),
        data = await resp.json();
      
      setWinners(data.reverse());
    };
    
    getWinners().catch(SimpleErrorHandler);
  }, [apiUrl]);
  
  return (
    <div className={styles.Container}>
      <Game api={apiUrl} updateWinners={sendNewWinner}/>
      <WinnersList winners={winners}/>
    </div>
  );
};

export default App;
