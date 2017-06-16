class Queue {
  constructor(arr, render) {
    this.__cache = [].concat(arr)
    this.__index = 0
  }
  first() {
    return this.__cache[this.__index]
  }
  next() {
    this.__index += 1
    return this.__cache[this.__index]
  }
}

function lex(input) {
  const isOperator = c => /[-()+*]/.test(c)
  const isDigit = c => /\d/.test(c)
  const isWhiteSpace = c => /\s/.test(c)
  const isIdentifier = c => typeof c === 'string' && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c)


  const getToken = (c, i) => {
    if (isWhiteSpace(c)) return null
    if (isOperator(c)) return { type: 'operator', value: c }
    if (isDigit(c)) {
      const invalid = isDigit(input[i - 1])
      if (invalid) return null

      let next = i + 1
      let value = c
      while (isDigit(input[next])) {
        value += input[next]
        next += 1
      }

      // only support integer
      return { type: 'digit', value: parseInt(value, 10) }
    }

    if (isIdentifier(c)) {
      const invalid = isIdentifier(input[i - 1])
      if (invalid) return null

      let next = i + 1
      let value = c
      while (isIdentifier(input[next])) {
        value += input[next]
        next += 1
      }

      return { type: 'identifier', value }
    }

    throw new Error('unrecognized token .')
  }

  return input.split('').map((c, i) => getToken(c, i)).filter(c => c != null)
}

function symbol(id, nud, lbp, led) {
  if (symbol.__cache[id]) return Object.create(symbol.__cache[id])
  symbol.__cache[id] = { lbp, nud, led }
  return Object.create(symbol.__cache[id])
}

function interpretToken(token) {
  const sym = symbol(token.type)
  return Object.assign({}, sym, token)
}

function expression(rbp) {
}
