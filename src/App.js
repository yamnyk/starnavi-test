import React, {useEffect, useReducer} from 'react';
import {
  initialState,
  reducer, setActiveCell,
  setActiveMode,
  setGrid,
  setMessage,
  setModes,
  setPlayer,
  setWinner
} from "./utils/reducer";
import GameField from "./components/GameField/GameField";
import {createGrid} from "./utils/CreateGrid";
import {CELL_DEFAULT, CELL_HIGHLIGHTED} from "./utils/CellsStatuses";
import {randomItemFromCollection} from "./utils/RandomIntInRange";

import styles from './App.module.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState),
    {grid, activeCell, modes, activeMode, player, winner, message} = state,
    api = "https://starnavi-frontend-test-task.herokuapp.com";
  
  useEffect(() => {
    fetch(`${api}/game-settings`).then(r => r.json())
      .then(data => {
        const modesAll = {...data};
        for (let key in modesAll) {
          if (modesAll.hasOwnProperty(key)) {
            modesAll[key].getName = () => key.substring(0, key.indexOf("Mode")).toUpperCase();
          }
        }
        
        dispatch(setModes(
          modesAll
        ))
      });
  }, [modes, api]);
  
  const modeChangeHandler = ({target}) => {
    dispatch(setActiveMode({...modes[target.value]}));
    dispatch(setGrid(
      createGrid(modes[target.value].field, {status: CELL_DEFAULT})
    ))
  };
  
  const playerNameHandler = ({target}) => {
    dispatch(setPlayer(target.value));
  };
  
  const displayWinner = () => {
    dispatch(setWinner(player));
    
  };
  
  const settingsSubmitHandler = (e) => {
    e.preventDefault();
    if (!activeMode || !player) {
      dispatch(setMessage('Something went wrong! Chose the mode and enter your name.'));
      return;
    }
    
    [...e.target.children].forEach(i => i.disabled = true);
    
    const changeCellInterval = setInterval((target) => {
      const newGrid = [...grid],
        pickedItem = randomItemFromCollection(newGrid);
      
      if (pickedItem) {
        newGrid[pickedItem.y] = [...newGrid[pickedItem.y]];
        
        pickedItem.status = CELL_HIGHLIGHTED;
        dispatch(setActiveCell(pickedItem));
        dispatch(setGrid(newGrid));
      } else {
        displayWinner();
        [...target.children].forEach(i => i.disabled = false);
        clearInterval(changeCellInterval);
      }
    }, activeMode.delay, e.target);
  };
  
  return (
    <div className={styles.Container}>
      <form onSubmit={settingsSubmitHandler}>
        <select name="gameMode" id="gameMode" defaultValue={activeMode || 'def'} onChange={modeChangeHandler}>
          <option hidden disabled value={"def"}>Pick game mode</option>
          {
            modes
              ? Object.keys(modes).map((m, ind) => <option key={ind} value={m}>{modes[m].getName()}</option>)
              : null
          }
        </select>
        <input type="text" placeholder={"Enter your name"} onChange={playerNameHandler}/>
        <input type="submit" value={"PLAY"}/>
      
      </form>
      {
        message
          ? <p>{message}</p>
          : null
      }
      <GameField grid={grid} mode={activeMode} activeCell={activeCell} dispatch={dispatch}/>
    
    </div>
  );
};

export default App;
