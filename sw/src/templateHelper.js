import fs from 'fs'
import path from 'path'

export default {
  include: p => {
    const target = p.indexOf('$') === 0
      ? path.join(__dirname, '..', p.slice(1))
      : path.resolve(p)
    return fs.readFileSync(target, 'utf8')
  },
  stringify: obj => JSON.stringify(obj).replace(/\\/g, '\\\\')
}
