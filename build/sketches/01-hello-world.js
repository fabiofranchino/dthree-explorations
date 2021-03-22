import { init, scene, loop } from '../src/index.js'

import * as THREE from '../_snowpack/pkg/three.js'
import light from '../src/lightBasic.js'

(async () => {
  init()
  light(scene)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ color: 0x1D74CF })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  loop(() => {
    mesh.rotation.y += 0.01
  })
})()
