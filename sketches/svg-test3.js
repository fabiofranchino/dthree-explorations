import { init, scene, renderer } from '../src/index.js'

import * as THREE from 'three'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import * as gsap from 'gsap'
import utils from '../src/utils.js'
import light from '../src/lightBasic.js'

init()

renderer.setClearColor(0x000000)

// scene.add(new THREE.AmbientLight(0x777777))
// var spotLight = new THREE.SpotLight(0xffffff)
// spotLight.angle = Math.PI / 2
// spotLight.penumbra = 1
// spotLight.position.set(-2, 3, 3)
// spotLight.castShadow = true
// spotLight.shadow.camera.near = 3
// spotLight.shadow.camera.far = 13
// spotLight.shadow.mapSize.width = 1024
// spotLight.shadow.mapSize.height = 1024
// scene.add(spotLight)
// light(scene)

const w = 8
const cols = d3.scaleLinear()
  .domain([0, 1])
  .range(['#1D74CF', 'white'])

const proj = d3.geoEquirectangular()
  .scale((w + 1) / 2 / Math.PI)
  .translate([0, 0])

const drawMap = data => {
  const path = d3.geoPath()
    .projection(proj)

  const countries = topojson.feature(data, data.objects.countries)
  countries.features.forEach((d, i) => {
    const svgpath = path(d)

    const shape = utils.svgPathToShape(svgpath)
    const geometry = new THREE.ShapeGeometry(shape)
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: cols(Math.random()), transparent: true })
    material.depthTest = false
    const mesh = new THREE.Mesh(geometry, material)
    // mesh.position.z = Math.random() * 10
    mesh.rotation.x = Math.PI
    scene.add(mesh)
  })

  d3.csv('../sketches/data/airports.csv').then(drawDots)
}

const drawDots = data => {
  data.forEach(d => {
    d.lat = +d.lat
    d.lon = +d.lon
  })
  console.log(data)

  // data.forEach(pt => {
  //   var geometry = new THREE.CircleGeometry(0.0001, 16)
  //   var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 'red', transparent: true })
  //   material.depthTest = false
  //   var mesh = new THREE.Mesh(geometry, material)
  //   mesh.position.x = proj(pt)[0]
  //   mesh.position.y = proj(pt)[1] * -1
  //   scene.add(mesh)
  // })

  const geometry = new THREE.Geometry()
  const colors = []

  data.forEach(d => {
    const p = proj([d.lon, d.lat])
    const x = p[0]
    const y = p[1] * -1

    const vertex = new THREE.Vector3(x, y, 0)
    geometry.vertices.push(vertex)

    const color = new THREE.Color('blue')
    colors.push(color)
  })

  geometry.colors = colors

  const material = new THREE.PointsMaterial({
    size: 5,
    sizeAttenuation: false,
    // size: 0.008,
    vertexColors: THREE.VertexColors,
    // map: circle_sprite,
    transparent: true,
    opacity: 1
  })

  const mesh = new THREE.Points(geometry, material)
  scene.add(mesh)
}

// d3.json('../sketches/data/countries.geo.json').then(drawMap)
d3.json('../sketches/data/world-atlas-50m.json').then(drawMap)
