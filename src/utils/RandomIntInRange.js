import {CELL_DEFAULT} from "./CellsStatuses";

export const randomIntInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomItemFromCollection = (collection, checkingRule) => {
  const checkedItems = collection.map(checkingRule);
  
  let y = randomIntInRange(0, collection.length - 1),
    x = randomIntInRange(0, collection[0].length - 1);
  
  return checkedItems[y][x];
};