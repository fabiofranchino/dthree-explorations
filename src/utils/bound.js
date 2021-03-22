import * as THREE from 'three'

const vertex = new THREE.Vector3()
const halfScreen = new THREE.Vector2()
const resBox = new THREE.Box2()

const computeScreenSpaceBoundingBox = (mesh, camera) => {
  const vertices = mesh.geometry.vertices
  const min = new THREE.Vector3(1, 1, 1)
  const max = new THREE.Vector3(-1, -1, -1)

  for (let i = 0; i < vertices.length; i++) {
    const vertexWorldCoord = vertex.copy(vertices[i]).applyMatrix4(mesh.matrixWorld)
    const vertexScreenSpace = vertexWorldCoord.project(camera)
    min.min(vertexScreenSpace)
    max.max(vertexScreenSpace)
  }
  resBox.set(min, max)
  return resBox
}

const normalizedToPixels = (coord, renderWidthPixels, renderHeightPixels) => {
  halfScreen.x = renderWidthPixels / 2
  halfScreen.y = renderHeightPixels / 2
  return coord.clone().multiply(halfScreen)
}

const vSize = new THREE.Vector2()
const vPos = new THREE.Vector2()

export default (mesh, store) => {
  const b2d = computeScreenSpaceBoundingBox(mesh, store.camera)
  const pxCoordScale = normalizedToPixels(b2d.getSize(vSize), store.width, store.height)
  const pxCoordCenter = normalizedToPixels(b2d.getCenter(vPos), store.width, store.height)

  const top = (store.height / 2 + (pxCoordCenter.y * -1) - pxCoordScale.y / 2)
  const left = (store.width / 2 + pxCoordCenter.x - pxCoordScale.x / 2)

  return { x: left, y: top, w: pxCoordScale.x, h: pxCoordScale.y }
}
