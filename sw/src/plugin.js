import fs from 'fs'
import path from 'path'
import minimatch from 'minimatch'
import template from 'lodash.template'
import omit from 'lodash.omit'
import templateHelper from './templateHelper'

const DEFAULT_OPTIONS = {
  sw: {
    actName: '',
    cacheName: '',
    scope: '/',
    downgrade: false,
    assets: null,
    urlPatterns: [{
      test: /^https?:\/\/cdnjs\.cloudfaure\.cn/,
      handler: 'cacheFirst'
    }]
  },
  output: '',
  fileIgnorePatterns: [],
  filePatterns: [],
  fileFreshPatterns: [],
  templates: {
    'manifest.json': path.join(__dirname, './tmpl/manifest.json'),
    'assets.json': path.join(__dirname, './tmpl/assets.json'),
    'sw.js': path.join(__dirname, '../dist/sw.js')
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
    const urlPatterns = [].concat(DEFAULT_OPTIONS.sw.urlPatterns)
      .map(item => ({ ...item, test: item.test.source }))

    this.sw = { ...DEFAULT_OPTIONS.sw, ...sw, assets, urlPatterns }
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
    // const { outputPath } = compiler
    const { publicPath } = compiler.options.output
    const { filePatterns, fileIgnorePatterns, fileFreshPatterns } = this.options
    const matchPattern = (url, p) => (p.length ? minimatch(url, p) : p.test(url))

    return Object.keys(compilation.assets)
      // .map(f => path.join(outputPath, f))
      .filter(url => !fileIgnorePatterns.some(p => p.test(url)))
      .filter(url => filePatterns.some(matchPattern.bind(null, url)))
      .map(p => {
        const baseURL = publicPath + p
        const fresh = fileFreshPatterns.some(matchPattern.bind(null, p))

        return baseURL + (fresh ? '?hash' : '') // TODO
      })
  }

  render() {
    const { templates } = this.options
    const renderContext = { options: omit(this.sw, 'assets'), ...this.sw, ...templateHelper }

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
