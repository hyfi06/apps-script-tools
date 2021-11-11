# Read and Write Sheets tools



## Functions

| Function | Return type | Brief description |
| - | - | - |
| isNumber | `boolean` | Return true if a object is a number. |
| toANotation | `string` | Return column letter. For example, 0 return A, 1 return B. |
| read | `Object[]` | Return a array of objects with values of a sheet. |
| write | `void` | Write data in a sheet. |

---


### toANotation(number)

Given a column number (starting at zero), return a column letter. This function translete array index to a column letter of a sheet.


```js
toANotation(0) // return 'A'
toANotation(5) // return 'F'

```

#### Parameters
| Name | Type | Description |
| - | - | - |
| number | `Integer` | column number starting at zero |

#### Returns

`String` - the column letter. 

---

### read(url, sheetname, startRow, config)

Return a array of row objects, for default the keys are the letter column with and `rowIdx` key with row index as value.

```js
var sheet = SpreadsheetApp.getActiveSpreadsheet();

var rows = read(sheet.getUrl(), sheet.getName(), 2);

console.log(Object.keys(rows)); // { 'rowIdx', 'A', 'B', ... }
```


With `model` key in `config` object, you can rename the keys of row object. The value of model most be a object such that key name is the column letter and value is the new key name. If a column letter is omitted, this column will be omitted.

```js
var sheet = SpreadsheetApp.getActiveSpreadsheet();

var rows = read(sheet.getUrl(), sheet.getName(), 2, {
	model: {
		'A': 'id',
		'B': 'name',
	}});


console.log(Object.keys(rows)); // { 'rowIdx', 'id', 'name' }

```



