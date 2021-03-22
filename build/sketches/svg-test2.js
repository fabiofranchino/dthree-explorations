import { init, scene, loop } from '../src/index.js'

import * as THREE from '../_snowpack/pkg/three.js'
import * as d3 from '../_snowpack/pkg/d3.js'
import utils from '../src/utils.js'
import light from '../src/lightBasic.js'

init()

scene.add(new THREE.AmbientLight(0x777777))
// var spotLight = new THREE.SpotLight(0xffffff)
// spotLight.angle = Math.PI / 2
// spotLight.penumbra = 1
// spotLight.position.set(-2, 3, 3)
// spotLight.castShadow = true
// spotLight.shadow.camera.near = 3
// spotLight.shadow.camera.far = 13
// spotLight.shadow.mapSize.width = 1024
// spotLight.shadow.mapSize.height = 1024
// scene.add(spotLight)
light(scene)

var geom = new THREE.PlaneGeometry(20, 20, 16)
var mat = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
var plane = new THREE.Mesh(geom, mat)
plane.rotation.x = Math.PI / 2
plane.position.y = -1
scene.add(plane)

const scheme = d3.scaleOrdinal(d3.schemeTableau10)

var data = d3.range(100).map(d => {
  return { v: 0 }
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
  // .curve(d3.curveBasis)

var svgshape = line(data)
var shape = utils.svgPathToShape(svgshape)
var geometry = new THREE.ShapeGeometry(shape)
var material = new THREE.MeshPhongMaterial({ color: scheme(0) })
material.depthTest = false
var mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const update = () => {
  var svgshape = line(data)
  var shape = utils.svgPathToShape(svgshape)
  var geom = new THREE.ShapeGeometry(shape)
  mesh.geometry = geom
}

let seed = 0
loop(() => {
  data.forEach((d, i) => {
    const a = seed + (Math.PI / data.length) * i
    d.v = Math.abs(Math.cos(a))
  })
  seed += 0.01
  update()
})
