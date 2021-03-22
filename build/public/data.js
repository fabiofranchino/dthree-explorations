import * as d3 from '../_snowpack/pkg/d3.js'

const size = d3.scaleLinear()
  .domain([0, 1])
  .range([0.01, 0.09])
const colors = d3.scaleOrdinal(d3.schemeCategory10)

const randomizePosition = d => {
  d.x = Math.random() * 8 - 4
  d.y = Math.random() * 6 - 3
}

const randomizeSize = d => (d.r = size(Math.random()))
const randomizeColor = d => (d.c = '#' + Math.random().toString(16).substr(2, 6))

const list = d3.range(1000).map(d => {
  const dp = {
    x: 0,
    y: 0,
    r: 0,
    c: colors(Math.random())
  }

  randomizePosition(dp)
  randomizeSize(dp)
  randomizeColor(dp)

  return dp
})

export default {
  list,
  randomizePosition,
  randomizeSize,
  randomizeColor
}
