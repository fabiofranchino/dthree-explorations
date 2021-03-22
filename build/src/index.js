import * as THREE from '../_snowpack/pkg/three.js'
import CameraControls from '../_snowpack/pkg/camera-controls.js'
import Stats from '../_snowpack/pkg/statsjs.js'
import { raycaster, addListener } from './interaction.js'
import store from './store.js'

let scene
let camera
let renderer
let loop
let controls

const init = options => {
  const el = options && options.el ? options.el : document.body
  const bbox = el.getBoundingClientRect()
  const width = bbox.width
  const height = bbox.height

  const clock = new THREE.Clock()
  CameraControls.install({ THREE: THREE })

  const container = el

  store.setSize(width, height)

  const fov = 70
  const aspect = store.width / store.height
  const near = 0.01
  const far = 20

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  //  camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000)
  camera.position.z = 5

  store.setCamera(camera)

  scene = new THREE.Scene()

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(store.width, store.height)
  renderer.setClearColor(0xffffff)
  renderer.getContext().disable(renderer.getContext().DEPTH_TEST)
  // renderer.setPixelRatio(window.devicePixelRatio)

  controls = new CameraControls(camera, renderer.domElement)
  controls.dollyToCursor = true
  controls.mouseButtons.left = CameraControls.ACTION.TRUCK
  controls.mouseButtons.right = CameraControls.ACTION.ROTATE
  controls.minDistance = 0.02
  controls.maxDistance = 20

  document.body.addEventListener('keyup', e => {
    const K = e.key

    if (K === '+') {
      controls.dolly(1, true)
    }
    if (K === '-') {
      controls.dolly(-1, true)
    }
    if (K === '.') {
      controls.moveTo(0, 0, 0, true)
      controls.dollyTo(5, true)
    }
  })

  container.appendChild(renderer.domElement)

  const stats = new Stats()
  stats.showPanel(0)
  container.appendChild(stats.dom)

  var callback
  loop = clb => {
    callback = clb
  }

  const draw = () => {
    stats.begin()
    requestAnimationFrame(draw)

    if (callback) callback()

    const delta = clock.getDelta()
    controls.update(delta)
    renderer.render(scene, camera)

    stats.end()
  }
  draw()
}

export {
  init,
  scene, camera, renderer, loop,
  controls,
  addListener, raycaster
}
