import { init, scene, loop } from '../src/index.js'

import * as THREE from 'three'
import * as d3 from 'd3'

init()

const dots = new THREE.Group()
const arcup = new THREE.Group()
const arcdw = new THREE.Group()

const num = 40
const map = d3.scaleLinear()
  .domain([0, num])
  .range([-4, 4])

const data = d3.range(num).map((d, i) => {
  return { x: map(i), y: 0, s: Math.random() * 0.1 + 0.01 }
})

for (var i = 0; i < 100; i++) {
  const i1 = parseInt(Math.random() * data.length)
  const i2 = parseInt(Math.random() * data.length)

  const minX = Math.min(data[i1].x, data[i2].x)
  const maxX = Math.max(data[i1].x, data[i2].x)
  const mid = maxX - minX

  const size = Math.random() * 0.1
  const ir = Math.abs(mid) - Math.abs(minX) - size / 2
  const or = ir + size
  var geometry = new THREE.RingGeometry(ir, or, 64, 0, 0, Math.PI)
  var material = new THREE.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0.5 })
  material.depthTest = false
  var mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = mid
  mesh.renderOrder = 0

  arcup.add(mesh)
}

for (var i = 0; i < 100; i++) {
  const i1 = parseInt(Math.random() * data.length)
  const i2 = parseInt(Math.random() * data.length)

  const minX = Math.min(data[i1].x, data[i2].x)
  const maxX = Math.max(data[i1].x, data[i2].x)
  const mid = maxX - minX

  const size = Math.random() * 0.1
  const ir = mid - Math.abs(minX) - size / 2
  const or = ir + 0.01
  var geometry = new THREE.RingGeometry(ir, or, 64, 0, Math.PI, Math.PI)
  var material = new THREE.MeshBasicMaterial({ color: '#555', transparent: true, opacity: 0.5 })
  material.depthTest = false
  var mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = mid
  mesh.renderOrder = 0

  arcdw.add(mesh)
}

scene.add(arcup)
scene.add(arcdw)

data.forEach(d => {
  var geometry = new THREE.CircleGeometry(d.s, 32)
  var material = new THREE.MeshBasicMaterial({ color: '#F4D907', transparent: true })
  material.depthTest = false
  var mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = d.x
  mesh.renderOrder = 999
  dots.add(mesh)
})

scene.add(dots)
