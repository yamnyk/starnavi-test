import React from 'react';
import {
  setActiveCell,
  setActiveMode,
  setGrid,
  setMessage,
  setPlayer,
  setWinner,
  toggleGameStatus, updateGridAndActiveCell
} from "../../utils/reducer";
import {CELL_DEFAULT, CELL_HIGHLIGHTED} from "../../utils/CellsStatuses";
import {createGrid} from "../../utils/CreateGrid";
import {GAME_PLAY} from "../../utils/GameStatuses";

const randomItemFromCollection = (collection, checkingRule) => {
  const randomIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  const checkedItems = collection.flat(2).filter(cell => cell.status === CELL_DEFAULT);
  
  let pickedItem = null;
  
  if (checkedItems.length > 0) {
    let randomIndex = randomIntInRange(0, checkedItems.length - 1);
    pickedItem = checkedItems[randomIndex];
  }
  
  return pickedItem;
};

const SettingsBar = ({gameStatus, grid, activeMode, modes, score, player, dispatch}) => {
  const modeChangeHandler = ({target}) => {
    dispatch(setActiveMode({...modes[target.value]}));
    dispatch(setGrid(
      createGrid(modes[target.value].field, {status: CELL_DEFAULT})
    ))
  };
  
  const displayWinner = () => {
    dispatch(setWinner(score.user > score.computer ? player : 'Computer'));
  };
  
  const isOver = () => {
    const halfScore = Math.floor(Math.pow(activeMode.field, 2) / 2);
    return score.player > halfScore
      || score.computer > halfScore
  };
  
  const settingsSubmitHandler = (e) => {
    e.preventDefault();
    if (!activeMode || !player) {
      dispatch(setMessage('Something went wrong! Chose the mode and enter your name.'));
      return;
    }
    
    dispatch(toggleGameStatus());
    
    const changeCellInterval = setInterval((target) => {
      const newGrid = [...grid],
        pickedItem = randomItemFromCollection(newGrid);
      
      if (pickedItem) {
        newGrid[pickedItem.y] = [...newGrid[pickedItem.y]];
        
        newGrid[pickedItem.y][pickedItem.x].status = CELL_HIGHLIGHTED;
        dispatch(updateGridAndActiveCell({
          grid: newGrid,
          activeCell: newGrid[pickedItem.y][pickedItem.x]
        }));
      }
      
      if (isOver()) {
        displayWinner();
        dispatch(toggleGameStatus());
        clearInterval(changeCellInterval);
      }
    }, activeMode.delay, e.target);
  };
  
  const playerNameHandler = ({target}) => {
    dispatch(setPlayer(target.value));
  };
  
  const isOnGame = gameStatus === GAME_PLAY;
  
  return (
    <form onSubmit={settingsSubmitHandler}>
      <select disabled={isOnGame}
              name="gameMode"
              id="gameMode"
              defaultValue={activeMode || 'def'} onChange={modeChangeHandler}>
        <option hidden disabled value={"def"}>Pick game mode</option>
        {
          modes && Object.keys(modes).map((m, ind) => <option key={ind} value={m}>{modes[m].getName()}</option>)
        }
      </select>
      <input disabled={isOnGame}
             type="text"
             placeholder={"Enter your name"} onChange={playerNameHandler}/>
      <input disabled={isOnGame}
             type="submit"
             value={"PLAY"}/>
  
    </form>
  );
};

export default SettingsBar;