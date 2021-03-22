import { init, scene, addListener, controls } from '../src/index.js'
import * as THREE from 'three'
import data from './data/data2.js'

(async () => {
  init()
  const list = await data()

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

  const under = new THREE.Group()
  scene.add(under)

  const over = new THREE.Group()
  const ptGeom = new THREE.Geometry()
  scene.add(over)

  list.forEach(d => {
    const geometry = new THREE.CircleGeometry(d.r, 64)
    const material = new THREE.MeshBasicMaterial({ color: 0x1D74CF, transparent: true, opacity: 0.0 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(d.x, d.y, 0)
    under.add(mesh)

    d.packed.children.forEach(p => {
      const g = new THREE.CircleGeometry(p.r, 16)
      g.translate(d.x + p.x, d.y + p.y, 0)
      ptGeom.merge(g)
    })
  })

  addListener('click', under.children, o => {
    const ob = o[0].object
    controls.fitTo(ob, true)
  })

  const material = new THREE.MeshBasicMaterial({ color: 0x1D74CF })
  const mesh = new THREE.Mesh(ptGeom, material)
  over.add(mesh)
})()
