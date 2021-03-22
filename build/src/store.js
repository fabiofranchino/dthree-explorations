const store = {
  width: 0,
  height: 0,
  camera: null,
  setSize (w, h) {
    store.width = w
    store.height = h
  },
  setCamera (c) {
    store.camera = c
  }
}

export default store
