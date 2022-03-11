# String format time

## Functions

| Function | Return type | Brief description |
| -------- | ----------- | ----------------- |
| [isNumber](#isnumbernumber) | `boolean` | Return true if a object is a number. |
| [zeroFiller](#zerofillernum-len) | `string` | Return a number as string with the minimal length given and fill whit leading zeros. |
| [strftime](#strftimeformat-locales-directives) | `string` | Return |
| [timestamp](#timestampformat-date) | `void` | Write data on a sheet. |

---

### isNumber(number)

See [Jon Schlinkert repository](https://github.com/jonschlinkert/is-number).

---

### zeroFiller(num, len)

Given a number and a length, return the number as string with the necessary leading zeros to reach the given length. If length is less that the digits of number, return the number as string.

```js
zeroFiller(1, 4); // return '0001'
zeroFiller(1000, 1); // return '1000'
```

#### Parameters

| Name | Type      | Description    |
| ---- | --------- | -------------- |
| num  | `number`  | Input number   |
| len  | `Integer` | Minimum length |

#### Returns

`String` - Number as string with leading zeros.

---

### strftime(format, locales, directives)

Add `strftime` method to Date type. Return date as string with given format. Allow you chose the locales names of month and weekday.

```js
var date = new Date(1998, 8, 16, 21, 30, 0);
strftime(date, '%Y/%m/%d'); // return 1998/09/16
strftime(date, '%A', 'es-MX'); // return miércoles
strftime(date, '%B', 'fr'); // return septembre
strftime(date, '%c'); // return Wed, Sep 16, 1998, 09:30:00 PM

var adhocDirectives = [{ pattern: '%r', value: '%I:%M:%S %p' }];
strftime(date, '%r', 'default', adhocDirectives); // return 09:30:00 PM
```

See [Formats codes](#format-codes) and [Custom formats](#custom-formats).

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| format | `string` | format template |
| locales | `string` | [locale identifier](https://github.com/TiagoDanin/Locale-Codes#locale-list) |
| directives[].pattern | `string` | directive pattern to search in format template |
| directives[].value | `string` | directive value that replaces the pattern matches in the format template |

#### Returns

`String` - formatted date

---

### timestamp(format, date)

`strftime` implementation ad-hoc. For default return the current datetime with format `%Y-%m-%d %H:%M:%S`.

You can change this function with the settings you use most often.

```js
timestamp(); // return the current time with the format %Y-%m-%d %H:%M:%S
timestamp('%Y/%m/%d', date); // return 1998/09/16
```

See [Formats codes](#format-codes) and [Custom formats](#custom-formats).

#### Parameters

| Name   | Type     | Description     |
| ------ | -------- | --------------- |
| format | `string` | format template |
| date   | `Date`   | date            |

#### Returns

`String` - formatted date

---

## Format codes

The following is a list of all the format codes that the 1989 C standard requires, and these work on all platforms with a standard C implementation.

| Directive | Meaning | Example |
| --------- | ------- | ------- |
| %a | Weekday as locale’s abbreviated name. | Sun, Mon, …, Sat (en_US); So, Mo, …, Sa (de_DE) |
| %A | Weekday as locale’s full name. | Sunday, Monday, …, Saturday (en_US); Sonntag, Montag, …, Samstag (de_DE) |
| %w | Weekday as a decimal number, where 0 is Sunday and 6 is Saturday. | 0, 1, …, 6 |
| %d | Day of the month as a zero-padded decimal number. | 01, 02, …, 31 |
| %b | Month as locale’s abbreviated name. | Jan, Feb, …, Dec (en_US); Jan, Feb, …, Dez (de_DE) |
| %B | Month as locale’s full name. | January, February, …, December (en_US); Januar, Februar, …, Dezember (de_DE) |
| %m | Month as a zero-padded decimal number. | 01, 02, …, 12 |
| %y | Year without century as a zero-padded decimal number. | 00, 01, …, 99 |
| %Y | Year with century as a decimal number. | 0001, 0002, …, 2013, 2014, …, 9998, 9999 |
| %H | Hour (24-hour clock) as a zero-padded decimal number. | 00, 01, …, 23 |
| %I | Hour (12-hour clock) as a zero-padded decimal number. | 01, 02, …, 12 |
| %p | Locale’s equivalent of either AM or PM. | AM, PM (en_US); am, pm (de_DE) |
| %M | Minute as a zero-padded decimal number. | 00, 01, …, 59 |
| %S | Second as a zero-padded decimal number. | 00, 01, …, 59 |
| %f | Microsecond as a decimal number, zero-padded to 6 digits. | 000000, 000001, …, 999999 |
| %z | UTC offset in the form ±HHMM[SS[.ffffff]] (empty string if the object is naive). | (empty), +0000, -0400, +1030, +063415, -030712.345216 |
| %Z | Time zone name (empty string if the object is naive). | (empty), UTC, GMT |
| %j | [Not implemented] Day of the year as a zero-padded decimal number. | 001, 002, …, 366 |
| %U | [Not implemented] Week number of the year (Sunday as the first day of the week) as a zero-padded decimal number. All days in a new year preceding the first Sunday are considered to be in week 0. | 00, 01, …, 53 |
| %W | [Not implemented] Week number of the year (Monday as the first day of the week) as a zero-padded decimal number. All days in a new year preceding the first Monday are considered to be in week 0. | 00, 01, …, 53 |
| %c | Locale’s appropriate date and time representation. | Tue Aug 16 21:30:00 1988 (en_US); Di 16 Aug 21:30:00 1988 (de_DE) |
| %x | Locale’s appropriate date representation. | 08/16/88 (None); 08/16/1988 (en_US); 16.08.1988 (de_DE) |
| %X | Locale’s appropriate time representation. | 21:30:00 (en_US) 21:30:00 (de_DE) |
| %% | A literal '%' character. | % |

### Custom formats

| Directive | Meaning | Example |
| --------- | ------- | ------- |
| %t | Timestamp format ad-hoc, equivalent to '%Y-%m-%d %H:%M:%S' | 1988-08-16 21:30:00 |
| %C | Timestamp format ad-hoc, equivalent to '%d de %B de %Y' | 16 de octubre de 1988 |
