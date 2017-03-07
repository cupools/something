export default class Conf {
  constructor(rules) {
    this.rules = { ...rules }
  }

  match(ast) {

  }

  extend(extendRules) {
    this.rules = Object.assign(this.rules, extendRules)
    return this
  }
}
