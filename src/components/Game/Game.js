import React, {useEffect, useReducer} from 'react';
import SettingsBar from "./SettingsBar/SettingsBar";
import GameField from "./GameField/GameField";
import {initialState, reducer, setModes} from "../../utils/reducer";

import styles from "./Game.module.css";

const Game = ({api}) => {
  const [state, dispatch] = useReducer(reducer, initialState),
    {grid, activeMode, activeCell, message} = state;
  
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
    <div className={styles.Game}>
      <SettingsBar {...{...state, dispatch}}/>
      {
        message && <p className={styles.Message}>{message}</p>
      }
      <GameField {...{activeCell, activeMode, dispatch, grid}}/>
    </div>
  );
};

export default Game;