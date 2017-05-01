import fs from 'fs'

export default {
  include: p => fs.readFileSync(p, 'utf8')
}
