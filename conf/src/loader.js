import yaml from 'js-yaml'
import _ from 'lodash'

export default function loader(str) {
  const raw = yaml.safeLoad(str)
  return { rule: 'root', value: null, children: parseNode(raw) }
}

function parseNode(node) {
  // iterate rule node
  return _.reduce(node, (ret, props, rule) => {
    // ignore `$` as it just set default value
    if (rule === '$') {
      return ret
    }

    return ret.concat(
      // iterate props node, create children list
      _.reduce(props, (mem, value, expected) => {
        // remove rule‘s stamp `_`
        const n = { rule: rule.replace(/^_*/, ''), expected, value, children: null }
        // contain sub rules
        if (typeof value === 'object') {
          Object.assign(n, {
            value: value.$ || null,
            children: parseNode(value)
          })
        }
        return mem.concat(n)
      }, [])
    )
  }, [])
}
