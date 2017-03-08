export default class Conf {
  constructor(rules) {
    this.rules = { ...rules }
  }

  match(ast, params) {
    const traverseNode = traverse(this.rules, params)
    return traverseNode(ast)
  }

  extend(extendRules) {
    this.rules = Object.assign(this.rules, extendRules)
    return this
  }
}

function traverse(rules, params) {
  return function traverseNode(node) {
    const { rule, expected, value } = node
    const detect = rules[rule]

    if (rule !== 'root' && !detect) {
      throw new Error(`[conf]: miss rule '${rule}'`)
    }

    if (rule !== 'root' && detect.call(params) !== expected) {
      return null
    }

    if (node.children) {
      return node.children.reduce((ret, n) => ret || traverseNode(n), null) || value
    }

    return value
  }
}
