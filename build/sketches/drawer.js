import { init, scene, loop, camera } from '../src/index.js'
import utils from '../src/utils.js'
import store from '../src/store.js'

import * as THREE from '../_snowpack/pkg/three.js'
import * as gsap from '../_snowpack/pkg/gsap.js'
import * as d3 from '../_snowpack/pkg/d3.js'

init()

const g = new THREE.Group()
scene.add(g)

document.body.addEventListener('mousemove', e => {
  if (e.altKey) {
    const norm = utils.convert2DToThreeNorm(e.clientX, e.clientY)
    const origin = utils.convertNormToThree(norm)

    var geometry = new THREE.CircleGeometry(0.05, 16)
    var material = new THREE.MeshBasicMaterial({ color: '#f00', transparent: true })
    var mesh = new THREE.Mesh(geometry, material)
    g.add(mesh)
    mesh.position.x = origin.x
    mesh.position.y = origin.y
    mesh.position.z = origin.z
  }
})

// mesh.geometry.verticesNeedUpdate = true
