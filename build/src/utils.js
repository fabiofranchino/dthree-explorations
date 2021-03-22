import * as THREE from '../_snowpack/pkg/three.js'
import store from './store.js'
import bound from './utils/bound.js'
import svgPathToShape from './utils/svgPathToShape.js'

export default {
  convert2DToThreeNorm (x, y) {
    return new THREE.Vector3(
      x / store.width * 2 - 1,
      -(y / store.height) * 2 + 1, 0
    )
  },
  convertNormToThree (v) {
    const vector = new THREE.Vector3(v.x, v.y, v.z)
    vector.unproject(store.camera)
    const dir = vector.sub(store.camera.position).normalize()
    const distance = -store.camera.position.z / dir.z
    const pos = store.camera.position.clone().add(dir.multiplyScalar(distance))
    return pos
  },
  convertThreeTo2D (obj) {
    let pos = new THREE.Vector3()

    pos = pos.setFromMatrixPosition(obj.matrixWorld)
    pos.project(store.camera)

    const widthHalf = store.width / 2
    const heightHalf = store.height / 2

    pos.x = (pos.x * widthHalf) + widthHalf
    pos.y = -(pos.y * heightHalf) + heightHalf
    pos.z = 0
    return pos
  },

  bound (mesh) {
    return bound(mesh, store)
  },

  quadGrid (num) {
    const w = Math.round(Math.sqrt(num))
    let countRow = -1
    const arr = []
    const len = w * w
    for (let i = 0; i < len; i++) {
      if (i % w === 0) countRow++
      arr.push({
        col: i % w,
        row: countRow
      })
    }
    return arr
  },
  randomPtInCircle (cx, cy, radius) {
    const angle = Math.random() * Math.PI * 2
    const r = Math.sqrt(Math.random()) * radius
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    return { x, y }
  },
  circlePixels (pts) {
    const r = Math.sqrt(pts * 2 / Math.PI)
    const w = 2 * Math.round(r * 2 / 2)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = w
    const ctx = canvas.getContext('2d')
    document.body.appendChild(canvas)

    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(w / 2, w / 2, w / 2, 0, Math.PI * 2)
    ctx.fillStyle = 'black'
    ctx.fill()

    const pixels = ctx.getImageData(0, 0, w, w)
    const res = []
    const px = pixels.data
    let row = -1

    for (let i = 0; i < px.length / 4; ++i) {
      const idx = i * 4

      const col = idx / 4 % w
      if (col === 0) row++

      if (px[idx] === 0 && px[idx + 1] === 0 && px[idx + 2] === 0) {
        res.push({ x: col, y: row })
      }
    }

    return res
  },

  svgPathToShape (pathStr) {
    return svgPathToShape(pathStr)
  }
}
