import { init, scene } from '../src/index.js'
import * as THREE from 'three'
import data from './data/data0.js'

(async () => {
  init()
  const list = await data()

  const geometry = new THREE.Geometry()
  const colors = []

  list.forEach(d => {
    const vertex = new THREE.Vector3(d.x, d.y, 0)
    geometry.vertices.push(vertex)

    const color = new THREE.Color(0x1D74CF)
    colors.push(color)
  })

  geometry.colors = colors

  const material = new THREE.PointsMaterial({
    // size: 10,
    // sizeAttenuation: false,
    size: 0.03,
    vertexColors: THREE.VertexColors,
    // map: circle_sprite,
    transparent: true,
    opacity: 0.1
  })

  const mesh = new THREE.Points(geometry, material)
  scene.add(mesh)
})()

// performance is good and comfortable to manipulate but limits are the shape,
// it can be only a point or a texture.
