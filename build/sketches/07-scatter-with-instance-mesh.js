import { init, scene } from '../src/index.js'
import * as THREE from '../_snowpack/pkg/three.js'
import data from './data/data0.js'
import * as d3 from '../_snowpack/pkg/d3.js'

(async () => {
  init()
  // const list = await data()
  const list = d3.range(100000).map(d => {
    return {
      x: Math.random() * 8 - 4,
      y: Math.random() * 8 - 4,
      r: Math.random() * 0.0001 + 0.0001
    }
  })

  const geometry = new THREE.CircleBufferGeometry(0.01, 32)
  const material = new THREE.MeshBasicMaterial({ color: 0x1D74CF, transparent: true, opacity: 0.5 })
  const mesh = new THREE.InstancedMesh(geometry, material, list.length)
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  scene.add(mesh)

  const dummy = new THREE.Object3D()

  list.forEach((d, i) => {
    dummy.position.set(d.x, d.y, 0)
    dummy.updateMatrix()
    mesh.setMatrixAt(i, dummy.matrix)
  })
})()

// performance is good and approcciable to manipulate and use custom mesh,
// mesh needs to do the same for all
