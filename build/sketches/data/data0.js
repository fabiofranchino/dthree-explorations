import * as d3 from '../../_snowpack/pkg/d3.js'

export default async () => {
  let csv = await d3.csv('../sketches/data/olympics_2012.csv')

  csv.forEach(d => {
    d.x = 0
    d.y = 0
    d.r = 0.01
    if (!d.Weight) d.Weight = 0
    if (!d.Height) d.Height = 0

    d.Weight = +d.Weight
    d.Height = +d.Height
  })

  csv = csv.filter((d, i) => {
    return d.Weight > 0 && d.Height > 0
  })

  const extX = d3.extent(csv, d => d.Weight)
  const scaleX = d3.scaleLinear()
    .domain(extX)
    .range([-1, 1])

  const extY = d3.extent(csv, d => d.Height)
  const scaleY = d3.scaleLinear()
    .domain(extY)
    .range([-1, 1])

  csv.forEach(d => {
    d.x = scaleX(d.Weight)
    d.y = scaleY(d.Height)
  })
  return csv
}
