import { init, scene, loop, addListener, controls } from '../src/index.js'
import * as THREE from 'three'
import * as d3 from 'd3'
import gsap from 'gsap'
import quadrandomLayout from '../src/layouts/quadrandom.js'
import circlerandomLayout from '../src/layouts/circlerandom.js'
import quadgrid from '../src/layouts/quadgrid.js'
import sphererandom from '../src/layouts/sphererandom.js'
import circlepack from '../src/layouts/circlepack.js'

let list = null

;(async () => {
  init()
  list = await d3.csv('../sketches/data/athletes_sochi.csv')

  const geometry = new THREE.Geometry()
  const colors = []
  const scheme = d3.scaleOrdinal(d3.schemePaired)

  console.log(list[0])

  list.forEach(d => {
    d.x = 0
    d.y = 0
    d.z = 0
    d.color = d3.color('#000')

    const vertex = new THREE.Vector3(0, 0, 0)
    geometry.vertices.push(vertex)
    d.positionVertex = vertex

    const color = new THREE.Color()
    colors.push(color)
    d.colorVertex = color
  })
  geometry.colors = colors

  const material = new THREE.PointsMaterial({
    // size: 10,
    // sizeAttenuation: false,
    size: 0.1,
    vertexColors: THREE.VertexColors,
    // map: circle_sprite,
    transparent: true
  })

  const mesh = new THREE.Points(geometry, material)
  scene.add(mesh)

  // LOOP
  loop(() => {
    const geom = mesh.geometry
    geom.verticesNeedUpdate = true
    geom.colorsNeedUpdate = true

    // mesh.rotation.y -= 0.001
  })

  // ANIMATE
  const animate = () => {
    list.forEach((d, i) => {
      // animate position
      const v = d.positionVertex
      if (d.x !== v.x || d.y !== v.y || d.y !== v.y) {
        gsap.to(v, {
          x: d.x,
          y: d.y,
          z: d.z,
          duration: 1,
          ease: 'expo.inOut',
          delay: Math.random() * 0.5
        })
      }

      // animate color
      const dc = d.color
      const c = d.colorVertex
      if (dc.r !== c.r || dc.g !== c.g || dc.b !== c.b) {
        gsap.to(c, {
          r: dc.r / 255,
          g: dc.g / 255,
          b: dc.b / 255,
          duration: 1,
          ease: 'expo.inOut',
          delay: Math.random() * 0.5
        })
      }
    })
  }

  // KEYBOARD
  document.body.addEventListener('keyup', e => {
    const K = e.key
    if (K == '1') {
      quadrandomLayout(list, [-4, 4])
      animate()
    }
    if (K == '2') {
      circlerandomLayout(list, [-3, 3])
      animate()
    }
    if (K == '3') {
      list.sort((a, b) => d3.descending(a.gender, b.gender))
      list.sort((a, b) => d3.descending(a.country, b.country))
      list.forEach(d => {
        d.color = d3.color(scheme(d.gender))
      })
      quadgrid(list, [-2, 2])
      animate()
    }
    if (K == '4') {
      sphererandom(list, [-3, 3])
      animate()
    }
    if (K == '5') {
      list.sort((a, b) => d3.ascending(a.sport, b.sport))
      list.forEach(d => {
        d.color = d3.color(scheme(d.sport))
      })
      quadgrid(list, [-2, 2])
      animate()
    }
    if (K == '6') {
      list.sort((a, b) => d3.descending(a.gender, b.gender))
      circlepack(list, 'sport', [-4, 4])
      animate()
    }
  })

  sphererandom(list, [-3, 3])
  animate()

  //
})()

// filter
// sort
// layout
