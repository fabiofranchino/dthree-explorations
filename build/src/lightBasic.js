import * as THREE from '../_snowpack/pkg/three.js'

export default scene => {
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-1, 2, 4)
  scene.add(light)
}
