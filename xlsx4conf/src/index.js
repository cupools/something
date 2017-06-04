const XLSX = require('xlsx')

function xlsx2json(raw) {
  const workbook = XLSX.read(raw)
  return workbook.SheetNames.reduce(
    (mem, sheetName) => ({ ...mem, [sheetName]: parse(workbook.Sheets[sheetName]) }),
    {}
  )
}

function parse(sheet) {
  const mergesInfo = sheet['!merges']
  const csv = XLSX.utils.sheet_to_csv(sheet)
  const table = csv.split('\n').slice(0, -1).map(rowstr => rowstr.split(','))

  const correct = correctMerges(mergesInfo)
  const get = (col, row) => {
    if (table[row][col] !== '') return table[row][col]
    const { c, r } = correct(col, row)

    return table[r][c] != null ? table[r][c] : null
  }

  const header = table.slice(0, 1).shift()

  return table
    .map((row, rowIndex) => {
      if (rowIndex === 0) return null
      return row.reduce((mem, val, colIndex) => {
        const value = get(colIndex, rowIndex)
        return { ...mem, [header[colIndex]]: value }
      }, {})
    })
    .slice(1)
}

function correctMerges(mergesInfo) {
  const store = mergesInfo.reduce((mem, item) => {
    const { s, e } = item
    const { c: sc, r: sr } = s
    const { c: ec, r: er } = e

    let c = sc
    let r = sr

    // iterate merged cells and create map
    while (c <= ec) {
      r = sr
      while (r <= er) {
        Object.assign(mem, { [c + ',' + r]: { c: sc, r: sr } })
        r += 1
      }
      c += 1
    }

    return mem
  }, {})

  return (col, raw) => store[col + ',' + raw]
}

module.exports = xlsx2json
