'use strict';

var XLSX = require('xlsx');
var cheerio = require('cheerio');

function xlsx2json(raw) {
  var workbook = XLSX.read(raw);
  return workbook.SheetNames.map(function (sheetName) {
    return parse(workbook.Sheets[sheetName]);
  });
}

function parse(sheet) {
  var html = XLSX.utils.sheet_to_html(sheet);
}

function flagmap(html) {
  var $ = cheerio.load(html);
}

module.exports = xlsx2json;