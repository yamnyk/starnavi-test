export const createGrid = (size,
                           template = {
                             status: 'default'
                           }) => {
  return Array.from(
    Array(size),
    (row, rowInd) => Array.from(
      Array(size),
      (cell, cellInd) => {
        template.x = cell;
        template.y = row;
        return template
      }
    )
  )
};