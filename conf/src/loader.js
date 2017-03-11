import yaml from 'js-yaml'
import _ from 'lodash'

const TYPE_RULE = 'RULE'
const TYPE_DEFAULT = 'DEFAULT_VALUE'
const TYPE_EXPECTED = 'VALUE'

export default function loader(str) {
  const raw = yaml.safeLoad(str)
  return parseNode(raw)
}

function parseNode(node) {
  return _.reduce(node, (ret, props, rule) => ret.concat(
      _.reduce(props, (mem, value, expected) => {
        if (typeof value === 'object') {
          return mem.concat({
            rule,
            expected,
            value: props.$ || null,
            children: parseNode(value)
          })
        }
        return mem.concat({
          rule,
          expected,
          value,
          children: null
        })
      }, [])
    ), [])
}

function nodeType(rule) {
  if (rule.indexOf('_') === 0) {
    return TYPE_RULE
  } else if (rule === '$') {
    return TYPE_DEFAULT
  }
  return TYPE_EXPECTED
}
