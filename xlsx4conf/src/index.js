const XLSX = require('xlsx')
const cheerio = require('cheerio')

function xlsx2json(raw) {
  const workbook = XLSX.read(raw)
  return workbook.SheetNames.map(sheetName => parse(workbook.Sheets[sheetName]))
}

function parse(sheet) {
  const html = XLSX.utils.sheet_to_html(sheet)
}

function flagmap(html) {
  const $ = cheerio.load(html)
}

module.exports = xlsx2json
