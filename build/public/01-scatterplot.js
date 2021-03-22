import { init, scene, addListener } from '../src/index.js'
import * as THREE from '../_snowpack/pkg/three.js'
import gsap from '../_snowpack/pkg/gsap.js'
import data from './data.js'

init({ el: document.querySelector('.canvas') })

const list = data.list

list.forEach(d => {
  const geometry = new THREE.CircleGeometry(d.r, 16)
  const material = new THREE.MeshBasicMaterial({ color: d.c, transparent: true, opacity: 0.75 })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(d.x, d.y, 0)
  mesh.userData = d
  scene.add(mesh)
})

// position
document.querySelector('#posBtn').addEventListener('click', e => {
  scene.children.forEach(mesh => {
    data.randomizePosition(mesh.userData)
    gsap.to(mesh.position, { delay: Math.random() * 0.5, duration: 1, x: mesh.userData.x, y: mesh.userData.y, ease: 'expo.inOut' })
  })
})

// size
document.querySelector('#sizBtn').addEventListener('click', e => {
  scene.children.forEach(mesh => {
    // data.randomizeSize(mesh.userData)
    const r = Math.random() * 2 - 1
    gsap.to(mesh.scale, { delay: Math.random() * 0.5, duration: 1, x: r, y: r, ease: 'expo.inOut' })
  })
})

addListener('click', scene.children, arr => {
  arr.forEach(o => {
    console.log(o.object.userData)
  })
})
