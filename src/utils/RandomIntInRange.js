import {CELL_DEFAULT} from "./CellsStatuses";

export const randomIntInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomItemFromCollection = (collection, checkingRule) => {
  collection = collection.map(row => (
    row.filter(cell => cell.status === CELL_DEFAULT)
  ));
  const checkedItems = collection.filter(r => r.length > 0);
  let pickedItem = null;
  
  if (checkedItems.length > 0) {
    let y = randomIntInRange(0, checkedItems.length - 1),
      x = randomIntInRange(0, checkedItems[y].length - 1);
    pickedItem = checkedItems[y][x];
  }
  
  return pickedItem;
};