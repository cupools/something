const fs = require('fs')
const path = require('path')
const SWPrecache = require('sw-precache-webpack-plugin')

export default class Precache extends SWPrecache {
  apply(compiler) {
    super.apply(compiler)

    compiler.plugin('after-emit', (compilation, callback) => {
      const done = () => callback()
      const error = err => callback(err)
      this.writeExtendFiles(compiler)
        .then(done, error)
    })
  }

  writeExtendFiles(compiler) {
    const { filepath } = this.workerOptions
    const tmpl = {
      'manifest.json': path.join(__dirname, './tmpl/manifest.json')
    }

    return Promise.all(
      Object.keys(tmpl).map(filename => {
        const target = tmpl[filename]
        const content = fs.readFileSync(target, 'utf8')
        const dist = path.join(filepath, '..', filename)
        return compiler.outputFileSystem.writeFile(dist, content)
      })
    )
  }
}
