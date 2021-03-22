const quadrandom = (data, range) => {
  const ext = range[1] - range[0]
  data.forEach(d => {
    d.x = Math.random() * ext - range[1]
    d.y = Math.random() * ext - range[1]
    d.z = 0
  })
}

export default quadrandom
