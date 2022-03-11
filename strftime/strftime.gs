/* 
Copyright (c) 2022 Héctor Olvera Vital
Licensed under the MIT License
*/

/**
 * @copyright 2014-present, Jon Schlinkert.
 * @param {object} num to test
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
 * @requires isNumber
 * Convert number to string with a given minimum length and fill with leading zeros
 * @param {number} num Input number
 * @param {number} len Minimum length
 * @return {string|Object} Number as string with leading zeros
 */
function zeroFiller(num, len = 2) {
  if (!isNumber(num) || !isNumber(len)) return num;
  let numStr = num.toString();
  while (numStr.length < len) numStr = '0' + numStr;
  return numStr;
}

/**
 * Returns the date as string with the given format and with the given local. Allows you to add custom directives.
 * @requires zeroFiller
 * @param {string} date - date
 * @param {string} format - date format template
 * @param {string} [locales = 'default'] - locale identifier
 * @param {Object[]} [directives = []] - directives array
 * @param {string} [directives[].pattern] - directive pattern
 * @param {string} [directives[].value] - directive value
 * @return {string} formatted date
 */
function strftime(date, format, locales = 'default', directives = []) {
  const standard_directives = [
    { pattern: '%%', value: '%' },
    {
      pattern: '%a',
      value: date.toLocaleString(locales, { weekday: 'short' }),
    },
    { pattern: '%A', value: date.toLocaleString(locales, { weekday: 'long' }) },
    { pattern: '%w', value: date.getDay() },
    { pattern: '%d', value: date.toLocaleString(locales, { day: '2-digit' }) },
    { pattern: '%b', value: date.toLocaleString(locales, { month: 'short' }) },
    { pattern: '%B', value: date.toLocaleString(locales, { month: 'long' }) },
    {
      pattern: '%m',
      value: date.toLocaleString(locales, { month: '2-digit' }),
    },
    { pattern: '%y', value: date.toLocaleString(locales, { year: '2-digit' }) },
    { pattern: '%Y', value: zeroFiller(date.getFullYear(), 4) },
    { pattern: '%H', value: zeroFiller(date.getHours(), 2) },
    {
      pattern: '%I',
      value: date
        .toLocaleString(locales, { hour: '2-digit', hour12: true })
        .slice(0, 2),
    },
    {
      pattern: '%p',
      value: date
        .toLocaleString(locales, { hour12: true })
        .split(':')
        .pop()
        .slice(3),
    },
    { pattern: '%M', value: zeroFiller(date.getMinutes(), 2) },
    { pattern: '%S', value: zeroFiller(date.getSeconds(), 2) },
    { pattern: '%f', value: zeroFiller(date.getMilliseconds() * 1000, 6) },
    {
      pattern: '%z',
      value: date.toTimeString().split(' ')[1].replace('GMT', ''),
    },
    {
      pattern: '%Z',
      value: date
        .toLocaleString('default', { timeZoneName: 'short' })
        .split(' ')
        .pop(),
    },
    { pattern: '%j', value: '' }, // not implemented
    { pattern: '%U', value: '' }, // not implemented
    { pattern: '%W', value: '' }, // not implemented
    {
      pattern: '%c',
      value: date.toLocaleString(locales, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    },
    { pattern: '%x', value: date.toLocaleDateString(locales) },
    { pattern: '%X', value: date.toLocaleTimeString(locales) },
  ];
  const custom_directives = [
    { pattern: '%C', value: '%d de %B de %Y' },
    { pattern: '%t', value: '%Y-%m-%d %H:%M:%S' },
  ];
  const all_directives = [
    ...directives,
    ...custom_directives,
    ...standard_directives,
  ];
  let strTime = format;
  all_directives.forEach((directive) => {
    strTime = strTime.replace(
      new RegExp(directive.pattern, 'g'),
      directive.value
    );
  });
  return strTime;
}

/**
 * @requires strftime
 * @param {string} [format = '%C'] format Date format
 * @param {Date} [date = new Date()] Date
 * @return {string} formatted date
 */
function timestamp(format = '%t', date = new Date()) {
  if (typeof date !== 'object') date = new Date(date);
  return strftime(date, format, 'es-MX');
}
