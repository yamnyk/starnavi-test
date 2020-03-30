export const createGrid = (size,
                           template = {
                             status: 'default'
                           }) => {
  const res = [];
  for (let rowInd = 0; rowInd < size; rowInd++) {
    const row = [];
    res.push(row);
    for (let cellInd = 0; cellInd < size; cellInd++) {
      const cell = {...template};
      cell.y = rowInd;
      cell.x = cellInd;
      row.push(
        cell
      )
    }
  }
  return res;
};