import { init, scene, renderer } from '../src/index.js'

import * as THREE from 'three'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import * as gsap from 'gsap'
import utils from '../src/utils.js'
import light from '../src/lightBasic.js'

init()

renderer.setClearColor(0x000000)

const w = 8
const cols = d3.scaleLinear()
  .domain([0, 1])
  .range(['#1D74CF', 'white'])

const proj = d3.geoAlbersUsa() // d3.geoEquirectangular()
  .scale((w + 1) / 2 / Math.PI)
  .translate([0, 0])

const drawMap = data => {
  const path = d3.geoPath()
    .projection(proj)

  const countries = topojson.feature(data, data.objects.counties)
  countries.features.forEach((d, i) => {
    const svgpath = path(d)

    console.log(svgpath)
    if (svgpath) {
      const shape = utils.svgPathToShape(svgpath)
      const geometry = new THREE.ShapeGeometry(shape)
      const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: cols(Math.random()), transparent: true })
      material.depthTest = false
      const mesh = new THREE.Mesh(geometry, material)
      // mesh.position.z = Math.random() * 10
      mesh.rotation.x = Math.PI
      scene.add(mesh)
    } else {
    }
  })
}

d3.json('../sketches/data/counties-10m.json').then(drawMap)
