import { init, scene, loop, renderer } from '../src/index.js'

import * as THREE from '../_snowpack/pkg/three.js'
import * as d3 from '../_snowpack/pkg/d3.js'
import utils from '../src/utils.js'
import light from '../src/lightBasic.js'
import gsap from '../_snowpack/pkg/gsap/gsap-core.js'

init()

const num = 20

const scheme = d3.scaleLinear()
  .domain([0, num])
  .range(['yellow', 'red'])

const scaleProg = d3.scaleLinear()
  .domain([0, 10])
  .range([-1, 3])

const chart = (index) => {
  var data = d3.range(15).map(d => {
    return { v: Math.random() }
  })

  var mapx = d3.scaleLinear()
    .domain([0, data.length])
    .range([-2, 2])

  const vscale = scaleProg(index)

  var mapy = d3.scaleLinear()
    .domain([0, 1])
    .range([vscale, vscale + 0.15])

  var line = d3.area()
    .x((d, i) => mapx(i))
    .y1(d => mapy(d.v))
    .y0(d => -3)
    .curve(d3.curveBasis)

  var svgshape = line(data)
  var shape = utils.svgPathToShape(svgshape)
  var geometry = new THREE.ShapeGeometry(shape)
  var material = new THREE.MeshBasicMaterial({ color: scheme(index) })
  material.depthTest = false
  var mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

for (var i = num; i >= 0; i--) {
  chart(i)
}

document.body.addEventListener('keyup', e => {
  // renderer.setSize(100, 100)

  const K = e.key
  const arr = scene.children
  arr.forEach((m, i) => {
    const inv = arr.length - i
    gsap.to(m.position, { delay: i * 0.05, duration: 1, z: inv * 0.2 * -1 })
  })
})
