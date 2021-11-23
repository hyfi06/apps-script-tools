/* 
Copyright (c) 2020-2021 Héctor Olvera Vital
Licensed under the MIT License
*/

/**
 * @copyright 2014-present, Jon Schlinkert.
 * @param {object} number data to test
 * @return {boolean} true if it is a number
 */
function isNumber(number) {
  if (typeof number === 'number') {
    return number - number === 0;
  }
  if (typeof number === 'string' && number.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+number) : isFinite(+number);
  }
  return false;
}

/**
 * Convert a number to letter of column. 0 -> A, 1 -> B
 * @param {number} number
 * @return {string} column letter
 */
function toANotation (number) {
  const BASE = 26;
  const CONVERT_TABLE = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E',
    5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J',
    a: 'K', b: 'L', c: 'M', d: 'N', e: 'O',
    f: 'P', g: 'Q', h: 'R', i: 'S', j: 'T',
    k: 'U', l: 'V', m: 'W', n: 'X', o: 'Y',
    p: 'Z',
  };

  if (number < BASE) {
    return CONVERT_TABLE[number.toString(BASE)];
  }
  const division = Math.floor(number / BASE);
  const residue = number % BASE;
  let columnLetter = toANotation(division - 1);
  columnLetter += CONVERT_TABLE[residue.toString(BASE)];
  return columnLetter;
}

/**
 * Read a sheet form a Spreadsheet
 * @requires toANotation, isNumber
 * @param {string} url The URL for the spreadsheet
 * @param {string} sheetName Name of sheet
 * @param {number} [startRow=2] number of initial row
 * @param {Object} [config={}] configuration
 * @param {Object} [config.model=undefined] Object with Column letter as key and property as value.
 * @param {function} [config.class=class Default{}] Class or constructor
 * @param {function} [config.filter=(value,index,array)=>value] Filter function
 * @param {boolean} [config.oneRow=false] If it is true return only the start row.
 * @return {Object[]}
 */
function read(url, sheetName, startRow = 2, config = {}) {
  if (!url || !sheetName || !isNumber(startRow)) return [];
  const sheet = SpreadsheetApp.openByUrl(url).getSheetByName(sheetName);
  if (sheet.getLastRow() < startRow) return [];
  const range = sheet.getRange(
    startRow, 1,
    config.oneRow ? 1 : sheet.getLastRow() - startRow + 1, sheet.getLastColumn()
  );

  let values = range.getValues()
    .map(function (row, i) {
      return row.reduce(function (acum, curr, idx) {
        const letter = toANotation(idx);
        if (config.model) {
          if (config.model[letter]) {
            acum[config.model[letter]] = curr;
          } else if (config.model[letter.toLowerCase()]) {
            acum[config.model[letter.toLowerCase()]] = curr;
          }
        } else {
          acum[letter] = curr;
        }
        return acum;
      }, { rowIdx: i + startRow });
    });

  if (config.class) {
    values = values.map(function (row, i) {
      return new config.class(row);
    });
  }

  if (config.filter) {
    try {
      values = values.filter(config.filter);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  return values;
}

/**
 * Write on a Spreadsheet
 * @param {string} url The URL for the spreadsheet
 * @param {string} sheetName Name of sheet
 * @param {Object} [data={}] Object with colum and value,
 * @param {number} [row=-1] number of initial row
 * @return 
 */
function write(url, sheetName, data = {}, row = -1) {
  if (!url || !sheetName || !isNumber(row)) return;
  const sheet = SpreadsheetApp.openByUrl(url).getSheetByName(sheetName);
  if (row == -1) row = sheet.getLastRow() + 1;
  Object.keys(data).forEach(function (colum) {
    if (!/[A-Z]+/.test(colum.toUpperCase())) return;
    sheet.getRange(`${colum.toUpperCase()}${row}`).setValue(data[colum]);
  });
}

