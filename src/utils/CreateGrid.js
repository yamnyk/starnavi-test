export const createGrid = (size,
                           template = {
                             status: 'default'
                           }) => {
  return Array.from(
    Array(size),
    (row, rowInd) => Array.from(
      Array(size),
      (cell, cellInd) => {
        cell = {...template};
        template.x = cellInd;
        template.y = rowInd;
        return cell
      }
    )
  )
};