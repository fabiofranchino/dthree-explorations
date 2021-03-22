const circlerandom = (data, range) => {
  const ext = range[1] - range[0]

  data.forEach(d => {
    const a = Math.random() * Math.PI * 2
    const r = Math.sqrt(Math.random()) * (ext - range[1])
    d.x = Math.cos(a) * r
    d.y = Math.sin(a) * r
    d.z = 0
  })
}

export default circlerandom
