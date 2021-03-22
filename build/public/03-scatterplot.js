import { init, loop, scene, addListener, controls, raycaster } from '../src/index.js'
import * as THREE from '../_snowpack/pkg/three.js'
import gsap from '../_snowpack/pkg/gsap.js'
import data from './data.js'
import * as d3 from '../_snowpack/pkg/d3.js'

init({ el: document.querySelector('.canvas') })

const list = data.list
const w = Math.ceil(Math.sqrt(list.length))

const geometry = new THREE.Geometry()
const colors = []

list.forEach(d => {
  const vertex = new THREE.Vector3(d.x, d.y, 0)
  geometry.vertices.push(vertex)

  const color = new THREE.Color(d.c)
  colors.push(color)
})

geometry.colors = colors

const material = new THREE.PointsMaterial({
  // size: 10,
  // sizeAttenuation: false,
  size: 3 / w,
  vertexColors: THREE.VertexColors,
  // map: circle_sprite,
  transparent: true,
  opacity: 0.75
})

const mesh = new THREE.Points(geometry, material)
scene.add(mesh)

loop(() => {
  const geom = mesh.geometry
  geom.verticesNeedUpdate = true
  geom.colorsNeedUpdate = true
})

// position
document.querySelector('#posBtn').addEventListener('click', e => {
  const geom = mesh.geometry
  geom.vertices.forEach((pt, i) => {
    const dot = list[i]
    data.randomizePosition(dot)
    gsap.to(pt, { delay: Math.random() * 0.5, duration: 1, x: dot.x, y: dot.y, ease: 'expo.inOut' })
  })
})

// color
document.querySelector('#colBtn').addEventListener('click', e => {
  const geom = mesh.geometry
  geom.colors.forEach((pt, i) => {
    const dot = list[i]
    data.randomizeColor(dot)
    const col = d3.color(dot.c)

    const r = col.r / 255.0
    const g = col.g / 255.0
    const b = col.b / 255.0

    gsap.to(pt, {
      delay: Math.random() * 0.5,
      duration: 1,
      r,
      g,
      b
    })
  })
})

// fit
document.querySelector('#fitBtn').addEventListener('click', e => {
  mesh.geometry.computeBoundingBox()
  controls.fitTo(mesh, true)
})

raycaster.params.Points.threshold = 2 / w
addListener('click', [mesh], arr => {
  arr.forEach(o => {
    console.log(o.object.userData)
  })
})
