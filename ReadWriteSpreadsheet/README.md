# Read and Write Sheets tools

## Functions

| Function                                   | Return type | Brief description                                          |
| ------------------------------------------ | ----------- | ---------------------------------------------------------- |
| [isNumber](#isnumbernumber)                | `boolean`   | Return true if a object is a number.                       |
| [toANotation](#toanotationnumber)          | `string`    | Return column letter. For example, 0 return A, 1 return B. |
| [read](#readurl-sheetname-startrow-config) | `Object[]`  | Return a array of objects with values of a sheet.          |
| [write](#writeurl-sheetname-data-rowindex) | `void`      | Write data on a sheet.                                     |

---

### isNumber(number)

See [Jon Schlinkert repository](https://github.com/jonschlinkert/is-number).

---

### toANotation(number)

Given a column number (starting at zero), return a column letter. This function translete array index to a column letter of a sheet.

```js
toANotation(0); // return 'A'
toANotation(5); // return 'F'
toANotation(75); // return 'BX'
```

#### Parameters

| Name   | Type      | Description                    |
| ------ | --------- | ------------------------------ |
| number | `Integer` | column number starting at zero |

#### Returns

`String` - the column letter.

---

### read(url, sheetname, startRow, config)

Return a array of row objects, for default the keys are the letter column with and `rowIdx` key with row index as value.

```js
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = spreadsheet.getActiveSheet();

var rows = read(spreadsheet.getUrl(), sheet.getName(), 2);

console.log(Object.keys(rows[0])); // [ 'rowIdx', 'A', 'B' ]
```

With `model` key in `config` object, you can rename the keys of row object. The value of model most be a object such that key name is the column letter and value is the new key name. The row object only will have the rename keys and `rowIdx` key.

```js
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = spreadsheet.getActiveSheet();

var rows = read(spreadsheet.getUrl(), sheet.getName(), 2, {
  model: {
    A: 'id',
    B: 'name',
  },
});

console.log(Object.keys(rows[0])); // [ 'rowIdx', 'id', 'name' ]
```

The value of `class` key, in `config` object, most be a constructor function or class. When this key is include, the function `read` return a array of instances of the class. In this case, the instances don't have the `rowIdx` key for default.

The constructor function most have one parameter. This parameter have the row data with keys default (column letter) or renamed keys with `model` key.

```js
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = spreadsheet.getActiveSheet();

function Person(row) {
  this.rowIdx = row.rowIdx;
  this.id = row.A;
  this.name = row.B;

  this.sayHello = function () {
    return `Hi! I'am ${this.name}`;
  };
}

var rows = read(spreadsheet.getUrl(), sheet.getName(), 2, {
  class: Person,
});

console.log(Object.keys(rows[0])); // [ 'rowIdx', 'id', 'name', 'sayHello' ]
```

```js
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = spreadsheet.getActiveSheet();

var model = {
  A: 'id',
  B: 'name',
};

function Person(row) {
  this.rowIdx = row.rowIdx;
  this.id = row.id;
  this.name = row.name;

  this.sayHello = function () {
    return `Hi! I'am ${this.name}`;
  };
}

var rows = read(spreadsheet.getUrl(), sheet.getName(), 2, {
  model: model,
  class: Person,
});

console.log(Object.keys(rows[0])); // [ 'rowIdx', 'id', 'name', 'sayHello' ]
```

The `oneRow` key of `config` object accept a boolean value. It is `false` for default. When it is true, `read` function return a array of length 1 with start row values.

It's helpful when you use events and only need the trigger row.

```js
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = spreadsheet.getActiveSheet();

var rows = read(spreadsheet.getUrl(), sheet.getName(), 2, {
  oneRow: true,
});

console.log(rows.length); // 1
```

The `filter` key of `config` object accept a callback function. Uses filter on result array is same a use `filter` option.

```js
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = spreadsheet.getActiveSheet();

function callback(value, index, array) {
  return index % 2 == 0;
}

var evenRows = read(spreadsheet.getUrl(), sheet.getName(), 2, {
  filter: callback,
});

var rows = read(spreadsheet.getUrl(), sheet.getName(), 2);

var filteredRows = rows.filter(callback);

console.log(evenRows);
console.log(filteredRows);

// evenRows is the same as filteredRows
```

#### Parameters

| Name          | Type                  | Description                                                       |
| ------------- | --------------------- | ----------------------------------------------------------------- |
| url           | `String`              | Spreadsheet url                                                   |
| sheetname     | `String`              | Sheet name                                                        |
| startRow      | `Integer`             | Row number from which it will be read                             |
| config.model  | `Object`              | Object with key as column letters, values as new key name         |
| config.class  | `function` or `class` | Constructor function or class                                     |
| config.oneRow | `Boolean`             | If it is `true`, return a array of length one. Default is `false` |
| config.filter | `function`            | Callback function for filter. Most return a boolean value         |

#### Returns

`Object[]` - array with row values as a object.

---

### write(url, sheetname, data, rowIndex)

Write data on a sheet. The paramater `data` is a object with keys as column letter.

If `rowIndex` is equal `-1` or it is omitted, the function write on a new row under of the last row.

```js
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = spreadsheet.getActiveSheet();

write(spreadsheet.getUrl(), sheet.getName(), {
  A: 2,
  B: 'Jane Doe',
});
```

#### Parameters

| Name      | Type      | Description     |
| --------- | --------- | --------------- |
| url       | `String`  | Spreadsheet url |
| sheetname | `String`  | Sheet name      |
| rowIndex  | `Integer` | row number      |

#### Returns

`String` - the column letter.

---

Copyright (c) 2020-2021 Héctor Olvera Vital

Licensed under the MIT License
