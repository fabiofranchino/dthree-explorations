import * as THREE from 'three'

const sphererandom = (data, range) => {
  const ext = range[1] - range[0]

  const r = ext / 2

  data.forEach(d => {
    const theta = THREE.Math.randFloatSpread(360)
    const phi = THREE.Math.randFloatSpread(360)

    d.x = Math.sin(theta) * Math.cos(phi) * r
    d.y = Math.sin(theta) * Math.sin(phi) * r
    d.z = Math.cos(theta) * r
  })
}

export default sphererandom
