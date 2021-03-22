import { init, scene, loop, controls } from '../src/index.js'
import utils from '../src/utils.js'

import * as THREE from '../_snowpack/pkg/three.js'
import * as d3 from '../_snowpack/pkg/d3.js'
import light from '../src/lightBasic.js'

init()
light(scene)

const svg = d3.select('body')
  .append('svg')
  .style('position', 'absolute')
  .style('pointer-events', 'none')
  // .style('border', '1px solid red')
  .style('overflow', 'visible')

svg.append('g').classed('a1', true)
svg.append('g').classed('a2', true)

var data = d3.range(20).map(d => {
  return { v: Math.random() }
})

const g = new THREE.PlaneGeometry(2, 1)
const m = new THREE.MeshLambertMaterial({ color: 0x1D74CF })
const h = new THREE.Mesh(g, m)
scene.add(h)

loop(() => {

})

const updateAxis = () => {
  const bound = utils.bound(h)

  svg.style('top', bound.y)
    .style('left', bound.x)
    .style('width', bound.w)
    .style('height', bound.h)

  const ext = d3.extent(data, d => +d.v)
  var mapV = d3.scaleLinear()
    .domain(ext)
    .range([0, bound.h])

  var mapT = d3.scaleLinear()
    .domain([20, 500])
    .range([3, 10])

  const tsize = parseInt(mapT(bound.h))
  var axis1 = d3.axisLeft(mapV).ticks(tsize)

  svg.select('.a1').call(axis1)

  // update axis 2
  var mapI = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, bound.w])

  var axis2 = d3.axisBottom(mapI)

  svg.select('.a2').attr('transform', `translate(0, ${bound.h})`).call(axis2)
}

updateAxis()
controls.addEventListener('update', updateAxis)
