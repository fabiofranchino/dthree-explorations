import * as d3 from '../../_snowpack/pkg/d3.js'

const makeGrid = num => {
  const w = 2 * Math.round(Math.sqrt(num) / 2)
  let countRow = -1
  const arr = d3.range(w * w).map((d, i) => {
    if (i % w === 0) countRow++
    return {
      col: i % w,
      row: countRow
    }
  })
  return arr
}

const quadGrid = (data, range) => {
  const num = data.length
  const grid = makeGrid(num)

  const max = d3.max(grid, d => d.col)
  const norm = d3.scaleLinear()
    .domain([0, max])
    .range(range)

  data.forEach((d, i) => {
    const cell = grid[i]
    d.x = norm(cell.col)
    d.y = norm(cell.row)
    d.z = 0
  })
}

export default quadGrid
