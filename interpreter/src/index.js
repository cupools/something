function lex(input) {
  const isOperator = c => /[\-\(\)\+\*]/.test(c)
  const isDigit = c => /\d/.test(c)
  const isWhiteSpace = c => /\s/.test(c)
  const isIdentifier = c => typeof c === 'string' && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c)
  const getToken = (c, i) => {
    if (isWhiteSpace(c)) return null
    if (isOperator(c)) return { type: 'operator', value: c }
    if (isDigit(c)) {
      const invalid = isDigit(input[i - 1])
      if (invalid) return
      
      let next = i + 1
      let value = c
      while (isDigit(input[next])) {
        value += input[next]
        next += 1
      }

      // only support integer
      return { type: 'digit', value: parseInt(value) }
    }

    if (isIdentifier(c)) {
      const invalid = isIdentifier(input[i - 1])
      if (invalid) return
      
      let next = i + 1
      let value = c
      while (isIdentifier(input[next])) {
        value += input[next]
        next += 1
      }

      // only support integer
      return { type: 'identifier', value }
    }

    throw new Error('unrecognized token .')
  }

  return input.split('').map((c, i) => getToken(c, i)).filter(c => c != null)
}

console.log(lex('1-(22+3)'))