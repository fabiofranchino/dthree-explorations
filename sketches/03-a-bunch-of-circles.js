import { init, scene } from '../src/index.js'
import * as THREE from 'three'
import * as d3 from 'd3'

(async () => {
  init()
  const list = d3.range(1000).map(d => {
    return {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      r: Math.random() * 0.1 + 0.01
    }
  })

  list.forEach(d => {
    const geometry = new THREE.CircleGeometry(d.r, 16)
    const material = new THREE.MeshBasicMaterial({ color: 0x1D74CF, transparent: true, opacity: 0.2 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(d.x, d.y, 0)
    scene.add(mesh)
  })
})()
