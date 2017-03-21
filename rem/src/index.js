const vars = {
  __inited: false,
  base: 640,
  convert: 100,
  compute: (base, convert) => window.innerWidth / base * convert
}

function refresh() {
  const val = vars.compute()
  document.documentElement.style.fontSize = `${val}px`
  return val
}

function bindEvent(win) {
  const delay = 200
  let timer = null

  win.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = setTimeout(refresh, delay)
  }, false)
}

/**
 * export method
 * @param {Number} base  value according to psd
 * @param {Number} convert  value that convert px unit
 * @param {Function} compute  function to calculate the final fontSize
 */
export default function rem(base, convert, compute) {
  const { assign } = Object
  if (base) assign(vars, { base })
  if (convert) assign(vars, { convert })
  const expected = compute === true
    ? (b, c) => window.innerHeight / b * c
    : (compute || vars.compute)

  assign(vars, { compute: expected.bind(null, vars.base, vars.convert) })

  if (!vars.__inited) {
    bindEvent(window)
    assign(vars, { __inited: true })
  }

  return refresh()
}
