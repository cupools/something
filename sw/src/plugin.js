import fs from 'fs'
import path from 'path'
import template from 'lodash.template'
import omit from 'lodash.omit'
import templateHelper from './templateHelper'

const DEFAULT_OPTIONS = {
  sw: {
    actName: '',
    cacheName: '',
    scope: '/',
    downgrade: false,
    assets: null
  },
  output: '',
  fileIgnorePatterns: [],
  fileGlobsPatterns: [],
  templates: {
    'manifest.json': path.join(__dirname, './tmpl/manifest.json'),
    'assets.json': path.join(__dirname, './tmpl/assets.json')
  }
}

export default class Precache {
  constructor(opts) {
    this.__opts = opts
    this.sw = {}
    this.options = {}
  }

  configure(compiler, compilation) {
    const { sw = {}, ...options } = this.__opts
    this.options = { ...omit(DEFAULT_OPTIONS, 'sw'), ...options }

    const assets = sw.assets || this.getAssets(compiler, compilation)
    this.sw = { ...DEFAULT_OPTIONS.sw, ...sw, assets }
  }

  apply(compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      this.configure(compiler, compilation)

      const done = () => callback()
      const error = err => callback(err)

      const { output } = this.options
      const { outputFileSystem } = compiler

      this.render()
        .then(files => new Promise(resolve => {
          outputFileSystem.mkdirp(path.resolve(output), resolve.bind(null, files))
        }))
        .then(files => {
          const writeFile = file => {
            const { filename, content } = file
            const dist = path.join(output, filename)
            return new Promise(resolve => {
              outputFileSystem.writeFile(dist, content, resolve)
            })
          }
          return Promise.all(files.map(writeFile))
        })
        .then(done)
        .catch(error)
    })
  }

  getAssets(compiler, compilation) {
    const { outputPath } = compiler
    const { fileIgnorePatterns, fileGlobsPatterns } = this.options

    return Object.keys(compilation.assets)
      .map(f => path.join(outputPath, f))
      .filter(url => !fileIgnorePatterns.some(p => p.test(url)))
      .filter(url => fileGlobsPatterns.every(p => p.test(url)))
  }

  render() {
    const { templates } = this.options
    const renderContext = { ...this.sw, ...templateHelper }

    const ret = Object.keys(templates)
      .reduce((mem, filename) => {
        const filepath = templates[filename]
        const raw = fs.readFileSync(filepath, 'utf-8')
        const content = template(raw)(renderContext)

        return mem.concat({ filename, content })
      }, [])

    return Promise.resolve(ret)
  }
}
