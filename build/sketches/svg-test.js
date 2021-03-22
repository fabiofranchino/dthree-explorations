import { init, scene } from '../src/index.js'

import * as THREE from '../_snowpack/pkg/three.js'
import * as d3 from '../_snowpack/pkg/d3.js'
import * as gsap from '../_snowpack/pkg/gsap.js'
import utils from '../src/utils.js'

init()

const scheme = d3.scaleOrdinal(d3.schemeTableau10)
const num = 10

const f = (index) => {
  var data = d3.range(10).map(d => {
    return { v: Math.random() }
  })

  var mapx = d3.scaleLinear()
    .domain([0, data.length])
    .range([-5, 5])

  var mapy = d3.scaleLinear()
    .domain([0, 1])
    .range([-1, 1])

  var line = d3.area()
    .x((d, i) => mapx(i))
    .y1(d => mapy(d.v))
    .y0(d => -1)
    .curve(d3.curveBasis)

  var svgshape = line(data)
  var shape = utils.svgPathToShape(svgshape)
  var geometry = new THREE.ShapeGeometry(shape)
  var material = new THREE.MeshBasicMaterial({ color: scheme(index), transparent: true })
  material.depthTest = false
  var mesh = new THREE.Mesh(geometry, material)

  mesh.position.z = index * 0.02 - (num * 0.02)
  mesh.updateMatrix()

  return mesh
}

const allGeom = new THREE.Geometry()
const allMats = []

for (var i = 0; i < num; i++) {
  const m = f(i)
  allGeom.merge(m.geometry, m.matrix, i)
  allMats.push(m.material)
}

var allMaterials = new THREE.MeshPhongMaterial(allMats)
var allMesh = new THREE.Mesh(allGeom, allMaterials)
allMesh.geometry.computeFaceNormals()
allMesh.geometry.computeVertexNormals()
scene.add(allMesh)
