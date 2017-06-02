'use strict';

var XLSX = require('xlsx');

var workbook = XLSX.readFile('./test/raw.xlsx');
var json = XLSX.utils.sheet_to_json(workbook.Sheets.download);