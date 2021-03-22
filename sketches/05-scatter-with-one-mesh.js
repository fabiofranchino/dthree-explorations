import { init, scene } from '../src/index.js'
import * as THREE from 'three'
import data from './data/data0.js'

(async () => {
  init()
  const list = await data()

  const geometry = new THREE.Geometry()

  list.forEach(d => {
    const g = new THREE.CircleGeometry(d.r, 16)
    g.translate(d.x, d.y, 0)
    geometry.merge(g)
  })

  const material = new THREE.MeshBasicMaterial({ color: 0x1D74CF, transparent: true, opacity: 0.2 })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
})()

// performance is good but now very hard to manipulate at runtime
