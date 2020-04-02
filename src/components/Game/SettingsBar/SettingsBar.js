import React from 'react';
import {
  setActiveMode,
  setMessage,
  setPlayer,
  toggleGameStatus, updateGridAndActiveCell
} from "../../../utils/reducer";
import {CELL_DEFAULT, CELL_HIGHLIGHTED, CELL_PICK_COMPUTER, CELL_PICK_PLAYER} from "../../../utils/CellsStatuses";
import {GAME_PLAY} from "../../../utils/GameStatuses";

import styles from './SettingsBar.module.css'

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

const SettingsBar = ({gameStatus, grid, activeMode, modes, player, dispatch}) => {
  const modeChangeHandler = ({target}) => {
    dispatch(setActiveMode({...modes[target.value]}));
  };
  
  const getWinner = () => {
    let computerScore = 0,
      playerScore = 0,
      endCount = Math.floor(Math.pow(activeMode.field, 2) / 2);
    
    grid.flat(2).forEach(cell => {
      playerScore += cell.status === CELL_PICK_PLAYER ? 1 : 0;
      computerScore += cell.status === CELL_PICK_COMPUTER ? 1 : 0;
    });
    
    //TODO: simplify this code
    if (playerScore > endCount || computerScore > endCount) {
      return playerScore > computerScore ? player : 'Computer'
    } else {
      return null;
    }
  };
  
  const settingsSubmitHandler = (e) => {
    e.preventDefault();
    if (!activeMode || !player) {
      dispatch(setMessage('Something went wrong! Chose the mode and enter your name.'));
      return;
    }
    
    dispatch(toggleGameStatus());
    
    let changeCellInterval = setTimeout(function run(activeCell) {
      const winner = getWinner();
      if (winner) {
        //TODO: send request to save winner
        clearTimeout(changeCellInterval);
        dispatch(toggleGameStatus(`Winner is - ${winner}`));
        return;
      }
      
      const newGrid = [...grid],
        pickedItem = randomItemFromCollection(newGrid);
      
      if (activeCell && activeCell.status !== CELL_PICK_PLAYER) {
        newGrid[activeCell.y][activeCell.x].status = CELL_PICK_COMPUTER;
      }
      
      activeCell = newGrid[pickedItem.y][pickedItem.x];
      
      if (pickedItem) {
        newGrid[pickedItem.y] = [...newGrid[pickedItem.y]];
        newGrid[pickedItem.y][pickedItem.x].status = CELL_HIGHLIGHTED;
        dispatch(updateGridAndActiveCell({
          grid: newGrid,
          activeCell: newGrid[pickedItem.y][pickedItem.x]
        }));
      }
      changeCellInterval = setTimeout(() => run(activeCell), activeMode.delay);
    }, activeMode.delay);
  };
  
  const playerNameHandler = ({target}) => {
    dispatch(setPlayer(target.value));
  };
  
  const isOnGame = gameStatus === GAME_PLAY;
  
  return (
    <form className={styles.Container}
          onSubmit={settingsSubmitHandler}
          onChange={() => dispatch(setMessage(null))}>
      <div className={styles.MenuPicker}>
        <select required className={styles.FormField}
                disabled={isOnGame}
                name="gameMode"
                id="gameMode"
                defaultValue={activeMode || 'def'} onChange={modeChangeHandler}>
          <option hidden disabled value={"def"}>Pick game mode</option>
          {
            modes && Object.keys(modes).map((m, ind) => <option key={ind} value={m}>{modes[m].getName()}</option>)
          }
        </select>
      </div>
      <input className={[styles.FormField].join(' ')}
             disabled={isOnGame}
             type="text"
             required
             minLength={5}
             placeholder={"Enter your name"} onChange={playerNameHandler}/>
      <input className={[styles.FormField, styles.PlayBtn].join(' ')}
             disabled={isOnGame}
             type="submit"
             value={"PLAY"}/>
    
    </form>
  );
};

export default SettingsBar;