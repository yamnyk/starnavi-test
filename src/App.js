import React, {useEffect, useReducer, useState} from 'react';
import styles from './App.module.css';
import {initialState, reducer, setActiveMode, setModes} from "./utils/reducer";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState),
    {grid, modes, activeMode, player, winner} = state,
    api = "https://starnavi-frontend-test-task.herokuapp.com";
  
  useEffect(() => {
    fetch(`${api}/game-settings`).then(r => r.json())
      .then(data => {
        const modesAll = {...data};
        for (let key in modesAll) {
          modesAll[key].getName = () => key.substring(0, key.indexOf("Mode")).toUpperCase();
        }
        
        dispatch(setModes(
          modesAll
        ))
      });
  }, [modes, api]);
  
  const modeChangeHandler = ({target}) => {
    dispatch(setActiveMode({...modes[target.value]}));
  };
  
  return (
    <div className={styles.Container}>
      <form>
        <select name="gameMode" id="gameMode" defaultValue={activeMode || 'def'} onChange={modeChangeHandler}>
          <option hidden disabled value={"def"}>Pick game mode</option>
          {modes
            ? Object.keys(modes).map((m, ind) => <option key={ind} value={m}>{modes[m].getName()}</option>)
            : null
          }
        </select>
        <input type="text" placeholder={"Enter your name"}/>
        <input type="submit" value={"PLAY"}/>
      </form>
      
      
    </div>
  );
};

export default App;
