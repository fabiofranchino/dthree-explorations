import { init, scene, loop, addListener, controls } from '../src/index.js'
import * as THREE from '../_snowpack/pkg/three.js'
import gsap from '../_snowpack/pkg/gsap.js'
import data from './data.js'
import * as d3 from '../_snowpack/pkg/d3.js'

init({ el: document.querySelector('.canvas') })

const list = data.list
const w = Math.ceil(Math.sqrt(list.length))

const colors = []
list.forEach(d => {
  const c = d3.color(d.c)
  colors.push(c.r / 255, c.g / 255, c.b / 255)
})

const geometry = new THREE.CircleBufferGeometry(3 / w, 16)
geometry.setAttribute('color', new THREE.InstancedBufferAttribute(new Float32Array(colors), 3))

// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.75 })
const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors })

const mesh = new THREE.InstancedMesh(geometry, material, list.length)
mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
scene.add(mesh)

// const dummy = new THREE.Object3D()
// list.forEach((d, i) => {
//   dummy.position.set(d.x, d.y, 0)
//   dummy.updateMatrix()
//   mesh.setMatrixAt(i, dummy.matrix)
// })

const dummies = []
list.forEach((d, i) => {
  const dummy = new THREE.Object3D()
  dummies.push(dummy)
  dummy.userData = d
  dummy.position.set(d.x, d.y, 0)
  // dummy.updateMatrix()
  // mesh.setMatrixAt( i, dummy.matrix )
})

loop(() => {
  dummies.forEach((dummy, i) => {
    dummy.updateMatrix()
    mesh.setMatrixAt(i, dummy.matrix)
  })
  mesh.instanceMatrix.needsUpdate = true

  const geom = mesh.geometry
  geom.attributes.color.needsUpdate = true
})

// position
document.querySelector('#posBtn').addEventListener('click', e => {
  list.forEach((d, i) => {
    const dummy = dummies[i]
    data.randomizePosition(dummy.userData)
    gsap.to(dummy.position, { delay: Math.random() * 0.5, duration: 1, x: dummy.userData.x, y: dummy.userData.y, ease: 'expo.inOut' })
  })
})

// size
document.querySelector('#sizBtn').addEventListener('click', e => {

})

// color
document.querySelector('#colBtn').addEventListener('click', e => {
  const geom = mesh.geometry
  const color = geom.attributes.color
  const colors = color.array
  let i = 0
  colors.forEach((c, j) => {
    if (j % 3 === 0) {
      const dummy = dummies[i]
      data.randomizeColor(dummy.userData)
      const col = d3.color(dummy.userData.c)
      colors[j] = col.r / 255
      colors[j + 1] = col.g / 255
      colors[j + 2] = col.b / 255
      i++
    }
  })
})

addListener('click', [mesh], arr => {
  arr.forEach(o => {
    console.log(o)
  })
})
