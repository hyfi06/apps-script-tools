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
| number | `Number` | column number starting at zero |

#### Returns

`String` - the column letter. 
