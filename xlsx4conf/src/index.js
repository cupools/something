const XLSX = require('xlsx')

function xlsx2json(raw) {
  const workbook = XLSX.read(raw)
  return workbook.SheetNames.map(sheetName => parse(workbook.Sheets[sheetName]))
}

function parse(sheet) {
  const json = XLSX.utils.sheet_to_json(sheet)
  return json.reduce()
}

module.exports = xlsx2json
