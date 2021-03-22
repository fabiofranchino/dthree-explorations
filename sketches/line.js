import { init, scene, renderer } from '../src/index.js'

import * as THREE from 'three'
import * as d3 from 'd3'
import light from '../src/lightBasic.js'

init()

const scheme = d3.scaleOrdinal(d3.schemeTableau10)
const map = d3.scaleLinear()
  .domain([0, 100])
  .range([-10, 10])

for (var i = 0; i < 300; i++) {
  var points = [
    new THREE.Vector3(Math.random() * 50 * -1 - 4, 0, -15),
    new THREE.Vector3(-3, 0, -15),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0, 1)
  ]

  const y = map(i)
  var g = new THREE.Geometry().setFromPoints(points)
  g.translate(0, y, 0)

  const mline = new MeshLine()
  mline.setGeometry(g)
  var material = new MeshLineMaterial({ color: scheme(i), lineWidth: 0.1 })
  var mesh = new THREE.Mesh(mline.geometry, material)

  scene.add(mesh)
}

// var material = new THREE.LineBasicMaterial({ color: 0x1D74CF })
// const mesh = new THREE.Line(geometry, material)
