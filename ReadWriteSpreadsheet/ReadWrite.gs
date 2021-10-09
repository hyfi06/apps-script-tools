/* 
Copyright (c) 2020 Héctor Olvera Vital
Licensed under the MIT License
*/

/**
 * @copyright 2014-present, Jon Schlinkert.
 * @param {object} data to test
 * @return {boolean} true if it is a number
 */
function isNumber(num) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
}

/**
 * Convert a number to letter of column. 0 -> A, 1 -> B
 * @param {number} num
 * @return {string} column letter
 */
function toANotation (num) {
  const BASE = 26;
  const CONVERT_TABLE = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E',
    5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J',
    a: 'K', b: 'L', c: 'M', d: 'N', e: 'O',
    f: 'P', g: 'Q', h: 'R', i: 'S', j: 'T',
    k: 'U', l: 'V', m: 'W', n: 'X', o: 'Y',
    p: 'Z',
  };

  if (num < BASE) {
    return CONVERT_TABLE[num.toString(BASE)];
  }
  const division = Math.floor(num / BASE);
  const residue = num % BASE;
  let columnLetter = toANotation(division - 1);
  columnLetter += CONVERT_TABLE[residue.toString(BASE)];
  return columnLetter;
}

/**
 * Read a sheet form a Spreadsheet
 * @requires toANotation, isNumber
 * @param {string} url The URL for the spreadsheet
 * @param {string} sheetName Name of sheet
 * @param {number} [rowInit=2] number of initial row
 * @param {Object} [config={}] configuration
 * @param {Object} [config.model=undefined] Object with Column letter as key and property as value.
 * @param {function} [config.class=class Default{}] Class or constructor
 * @param {function} [config.filter=(value,index,array)=>value] Filter function
 * @param {boolean} [config.oneRow=false] If it is true return only the rowInit.
 * @return {Object[]}
 */
function read(url, sheetName, rowInit = 2, config = {}) {
  if (!url || !sheetName || !isNumber(rowInit)) return [];
  const sheet = SpreadsheetApp.openByUrl(url).getSheetByName(sheetName);
  if (sheet.getLastRow() < rowInit) return [];
  const range = sheet.getRange(
    rowInit, 1,
    config.oneRow ? 1 : sheet.getLastRow() - rowInit + 1, sheet.getLastColumn()
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
      }, { rowIdx: i + rowInit });
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
 * @param {number} [rowInit=-1] number of initial row
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

