import yaml from 'js-yaml'
import _ from 'lodash'

const TYPE_RULE = 'RULE'
const TYPE_DEFAULT = 'DEFAULT_VALUE'
const TYPE_EXPECTED = 'VALUE'

export default function loader(str) {
  const raw = { _root: yaml.safeLoad(str) }
  return parseNode(raw)
}

function parseNode(node, parent) {
  return _.reduce(node, (mem, val, key) => {
    const type = nodeType(key)
    const hasChild = typeof val !== 'string'

    if (type === TYPE_RULE) {
      const newNode = { rule: key.slice(1) }
      if (hasChild) {
        Object.assign(newNode, parseNode(val, newNode))
      }
      return newNode
    } else if (type === TYPE_DEFAULT) {
      return Object.assign(parent, { value: val })
    }
  }, {})
}

function nodeType(rule) {
  if (rule.indexOf('_') === 0) {
    return TYPE_RULE
  } else if (rule === '$') {
    return TYPE_DEFAULT
  }
  return TYPE_EXPECTED
}
