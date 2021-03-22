import * as d3 from 'd3'

export default async () => {
  let csv = await d3.csv('../sketches/data/athletes_sochi.csv')

  csv.forEach(d => {
    d.x = 0
    d.y = 0
    d.r = 0.01
    if (!d.weight) d.weight = 0
    if (!d.height) d.height = 0

    d.weight = +d.weight
    d.height = +d.height
  })

  csv = csv.filter((d, i) => {
    return d.weight > 0 && d.height > 0
  })

  const extX = d3.extent(csv, d => d.weight)
  const scaleX = d3.scaleLinear()
    .domain(extX)
    .range([-1, 1])

  const extY = d3.extent(csv, d => d.height)
  const scaleY = d3.scaleLinear()
    .domain(extY)
    .range([-1, 1])

  csv.forEach(d => {
    d.x = scaleX(d.weight)
    d.y = scaleY(d.height)
  })
  return csv
}
