import { init, scene, addListener, controls } from '../src/index.js'
import * as THREE from '../_snowpack/pkg/three.js'
import gsap from '../_snowpack/pkg/gsap.js'
import data from './data.js'

init({ el: document.querySelector('.canvas') })

const list = data.list

const geometry = new THREE.Geometry()

list.forEach(d => {
  const g = new THREE.CircleGeometry(d.r, 16)
  g.translate(d.x, d.y, 0)
  geometry.merge(g)
})

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.75 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// fit
document.querySelector('#fitBtn').addEventListener('click', e => {
  mesh.geometry.computeBoundingBox()
  controls.fitTo(mesh, true)
})

addListener('click', [mesh], arr => {
  arr.forEach(o => {
    console.log(o.object)
  })
})
