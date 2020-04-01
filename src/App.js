import React, {useEffect, useReducer} from 'react';
import {
  initialState,
  reducer,
  setModes,
} from "./utils/reducer";
import GameField from "./components/GameField/GameField";
import SettingsBar from "./components/SettingsBar/SettingsBar";

import styles from './App.module.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState),
    {grid, activeCell, message} = state,
    api = "https://starnavi-frontend-test-task.herokuapp.com";
  
  useEffect(() => {
    const fetchModes = async () => {
      const res = await fetch(`${api}/game-settings`),
        data = await res.json();
      
      const modesAll = {...data};
      for (let key in modesAll) {
        if (modesAll.hasOwnProperty(key)) {
          modesAll[key].getName = () => key.substring(0, key.indexOf("Mode")).toUpperCase();
        }
      }
      
      dispatch(setModes(
        modesAll
      ));
    };
    
    fetchModes();
  }, [api]);
  
  return (
    <div className={styles.Container}>
      <SettingsBar {...{...state, dispatch}}/>
      {
        message && <p>{message}</p>
      }
      <GameField {...{activeCell, dispatch, grid}}/>
    
    </div>
  );
};

export default App;
