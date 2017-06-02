const XLSX = require('xlsx')

function xlsx2json(raw) {
  const workbook = XLSX.read(raw)
  return workbook.SheetNames.map(parse)
}

function parse(sheet) {
  const json = XLSX.utils.sheet_to_json(sheet)
  return json.reduce()
}

module.exports = xlsx2json
