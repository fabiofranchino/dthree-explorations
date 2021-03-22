import * as THREE from 'three'
import store from './store.js'
import utils from './utils.js'

const _listeners = []
const addListener = (event, targets, callback) => {
  _listeners.push({
    event,
    targets,
    callback
  })
}

const raycaster = new THREE.Raycaster()

const lastPosition = { x: 0, y: 0 }
let invalidateClick = false
document.body.addEventListener('mousedown', e => {
  invalidateClick = false
  lastPosition.x = e.clientX
  lastPosition.y = e.clientY
})

let lastHoverOb = {}
document.body.addEventListener('mousemove', e => {
  _listeners.forEach(l => {
    if (l.event === 'hover') {
      const o = findByInteraction(e, l.targets)
      if (o) {
        if (lastHoverOb.faceIndex !== o.faceIndex) l.callback(o)
        lastHoverOb = o
      }
    }
  })
})

document.body.addEventListener('mouseup', e => {
  if (Math.abs(lastPosition.x - e.clientX) > 2 ||
    Math.abs(lastPosition.y - e.clientY) > 2) {
    invalidateClick = true
  }

  _listeners.forEach(l => {
    if (l.event === 'click' && !invalidateClick) {
      const o = findByInteraction(e, l.targets)
      if (o) l.callback(o)
    }
  })
})

const findByInteraction = (e, objs, clb) => {
  const x = e.clientX
  const y = e.clientY

  const vec = utils.convert2DToThreeNorm(x, y)

  raycaster.setFromCamera(vec, store.camera)

  const intersects = raycaster.intersectObjects(objs)
  if (intersects.length > 0) {
    return intersects
  }
}

export { raycaster, addListener }
