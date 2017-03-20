const vars = {
  __inited: false,
  base: 640,
  convert: 10,
  compute: (base, convert) => window.innerWidth / base * convert
}

function refresh() {
  const val = vars.compute()
  document.body.style.fontSize = `${val}px`
}

function bindEvent(win) {
  const delay = 300
  let timer = null

  win.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = setTimeout(refresh, delay)
  }, false)
}

export default function rem(base, convert, compute) {
  const { assign } = Object
  if (base) assign(vars, { base })
  if (convert) assign(vars, { convert })
  if (compute) {
    const expected = compute === true
      ? (b, c) => window.innerHeight / b * c
      : compute
    assign(vars, { compute: expected })
  }

  if (!vars.__inited) {
    bindEvent(window)
  }

  refresh()
}
