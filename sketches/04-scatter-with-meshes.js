import { init, scene } from '../src/index.js'
import * as THREE from 'three'
import data from './data/data0.js'

(async () => {
  init()
  const list = await data()

  list.forEach(d => {
    const geometry = new THREE.CircleGeometry(d.r, 16)
    const material = new THREE.MeshBasicMaterial({ color: 0x1D74CF, transparent: true, opacity: 0.2 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(d.x, d.y, 0)
    scene.add(mesh)
  })
})()

// comfortable to work with but performance suffer
