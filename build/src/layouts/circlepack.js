import * as d3 from '../../_snowpack/pkg/d3.js'

const circlepack = (data, tkey, range) => {
  const byKeyMap = d3.group(data, d => d[tkey])
  const group = Array.from(byKeyMap, ([key, value]) => ({ key, value }))
  const ext = range[1] - range[0]

  const pack = d3.pack()
    .size([ext, ext])
    .padding(0.02)

  const mdata = d3.hierarchy({ root: 'base', children: group })
    .sum(d => {
      return d.value ? d.value.length : 0
    })

  pack(mdata)

  mdata.children.forEach(d => {
    // d.x -= 2
    // d.y -= 2

    const ppack = d3.pack()
      .size([d.r * 2, d.r * 2])
      .padding(0.01)

    const pdata = d3.hierarchy({ root: 'base', children: d.data.value })
      .sum(d => 1)

    d.packed = ppack(pdata)

    d.packed.children.forEach(c => {
      c.data.x = d.x + c.x - d.r - ext / 2
      c.data.y = d.y + c.y - d.r - ext / 2
      c.data.z = 0
    })
  })
}

export default circlepack
