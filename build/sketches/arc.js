import { init, scene, renderer } from '../src/index.js'
import utils from '../src/utils.js'
import store from '../src/store.js'

import * as THREE from '../_snowpack/pkg/three.js'
import * as gsap from '../_snowpack/pkg/gsap.js'
import * as d3 from '../_snowpack/pkg/d3.js'

init()

renderer.setClearColor(0x000000)

const scheme = d3.scaleOrdinal(d3.schemePaired)
let currOrigin = new THREE.Vector3(0, 0, 0)

const f = () => {
  var dummy = { e: 0.01 }
  const ir = Math.random() * 3 + 0.2
  const or = ir + Math.random() * 0.2
  const a = Math.random() > 0.5 ? 0 : Math.PI
  var geometry = new THREE.RingGeometry(ir, or, 64, 0, a, 0.01)
  var material = new THREE.MeshBasicMaterial({ color: '#fff', transparent: true, opacity: Math.random() })
  var mesh = new THREE.Mesh(geometry, material)

  mesh.position.x = currOrigin.x// + Math.random() * 3 - 1.5
  mesh.position.y = currOrigin.y
  scene.add(mesh)

  gsap.to(dummy, {
    e: Math.PI,
    duration: 1 + Math.random(),
    ease: 'expo.InOut',
    onUpdate: () => {
      var g = new THREE.RingGeometry(ir, or, 64, 0, a, dummy.e)
      mesh.geometry = g
    }
  })
}

document.body.addEventListener('keyup', e => {
  for (var i = 0; i < 3; i++) {
    f()
  }
})

document.body.addEventListener('mouseup', e => {
  const norm = utils.convert2DToThreeNorm(e.clientX, e.clientY)
  currOrigin = utils.convertNormToThree(norm)

  var geometry = new THREE.CircleGeometry(0.05, 16)
  var material = new THREE.MeshBasicMaterial({ color: '#f00', transparent: true })
  var mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  mesh.position.x = currOrigin.x
  mesh.position.y = currOrigin.y
})

// mesh.geometry.verticesNeedUpdate = true
