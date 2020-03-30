import React, {useEffect, useReducer} from 'react';
import {initialState, reducer, setActiveMode, setGrid, setModes, setPlayer, setWinner} from "./utils/reducer";
import GameField from "./components/GameField/GameField";
import {createGrid} from "./utils/CreateGrid";
import {CELL_DEFAULT, CELL_HIGHLIGHTED} from "./utils/CellsStatuses";
import {randomItemFromCollection} from "./utils/RandomIntInRange";

import styles from './App.module.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState),
    {grid, modes, activeMode, player, winner} = state,
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
    if (!activeMode || !player) return;
    
    [...e.target.children].forEach(i => i.disabled = true);
    
    const changeCellInterval = setInterval(() => {
      const newGrid = [...grid],
        pickedItem = randomItemFromCollection(newGrid, (r) => (r.filter(c => c.status === CELL_DEFAULT)));
      if (pickedItem) {
        newGrid[pickedItem.y] = [...newGrid[pickedItem.y]];
        
        pickedItem.status = CELL_HIGHLIGHTED;
        dispatch(
          setGrid(
            newGrid
          )
        )
      } else {
        displayWinner();
        clearInterval(changeCellInterval);
      }
    }, activeMode.delay);
  };
  
  return (
    <div className={styles.Container}>
      <form onSubmit={settingsSubmitHandler}>
        <select name="gameMode" id="gameMode" defaultValue={activeMode || 'def'} onChange={modeChangeHandler}>
          <option hidden disabled value={"def"}>Pick game mode</option>
          {modes
            ? Object.keys(modes).map((m, ind) => <option key={ind} value={m}>{modes[m].getName()}</option>)
            : null
          }
        </select>
        <input type="text" placeholder={"Enter your name"} onChange={playerNameHandler}/>
        <input type="submit" value={"PLAY"}/>
      
      </form>
      {
        winner
          ? <p>Winner is - {winner}</p>
          : null
      }
      <GameField grid={grid} mode={activeMode}/>
    
    </div>
  );
};

export default App;
