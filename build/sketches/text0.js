import { init, scene, loop, camera } from '../src/index.js'
import utils from '../src/utils.js'
import store from '../src/store.js'

import * as THREE from '../_snowpack/pkg/three.js'
import * as gsap from '../_snowpack/pkg/gsap.js'
import * as d3 from '../_snowpack/pkg/d3.js'

init()

const createTextSprite = (msg) => {
  const size = 128
  const face = 'Arial'
  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  ctx.font = 'Normal ' + size + 'px ' + face
  var metrics = ctx.measureText(msg)
  var textWidth = metrics.width

  console.log(textWidth)

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, textWidth, size * 1.4)
  ctx.fillStyle = 'black'
  ctx.fillText(msg, 0, size)

  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true

  const material = new THREE.SpriteMaterial({
    map: texture
  })

  const sprite = new THREE.Sprite(material)
  return sprite
}

var s1 = createTextSprite('Hello world')
scene.add(s1)
