import * as d3 from '../../_snowpack/pkg/d3.js'

export default async () => {
  const csv = await d3.csv('../sketches/data/athletes_sochi.csv')

  const sportsMap = d3.group(csv, d => d.sport)
  const sports = Array.from(sportsMap, ([key, value]) => ({ key, value }))
  console.log(sports)
  sports.sort((a, b) => {
    return d3.descending(a.value.length, b.value.length)
  })

  var pack = d3.pack()
    .size([4, 4])
    .padding(0.02)

  var data = d3.hierarchy({ root: 'base', children: sports })
    .sum(d => {
      return d.value ? d.value.length : 0
    })

  pack(data)

  data.children.forEach(d => {
    d.x -= 2
    d.y -= 2

    var ppack = d3.pack()
      .size([d.r * 2, d.r * 2])
      .padding(0.01)

    var pdata = d3.hierarchy({ root: 'base', children: d.data.value })
      .sum(d => 1)

    d.packed = ppack(pdata)

    d.packed.children.forEach(c => {
      c.x -= d.r
      c.y -= d.r
    })
  })

  console.log(data.children)

  return data.children
}
