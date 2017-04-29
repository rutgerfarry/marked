const fs = require('fs')
const path = require('path')

function load () {
  const absdir = __dirname
  const dirs = ['new', 'original'].map(testdir => path.join(absdir, testdir))

  const textfiles = dirs.map(dir => {
    return fs.readdirSync(dir)
             .filter(file => path.extname(file) === '.text')
  }).reduce((a, b) => a.concat(b))

  const htmlfiles = dirs.map(dir => {
    return fs.readdirSync(dir)
             .filter(file => path.extname(file) === '.html')
  }).reduce((a, b) => a.concat(b))

  return textfiles.map((_, i) => {
    return { text: textfiles[i], html: htmlfiles[i] }
  })
}

console.log(load())
