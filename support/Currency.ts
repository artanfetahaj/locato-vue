/**
 * Format a value to a currency.
 * Defaults to nl-NL formatting
 *
 * @example 10 => €10
 *
 * @param {number | string} value
 * @param {string} currency https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
 */
export default (amount: number | string, currency?: string): string => {
  let value = amount;
  if (value && ! Number(value) && (value as string).length) {
    value = (value as string).replace(/[.\s]/g, '');
    value = value.replace(/[,\s]/g, '.');
  }

  const currencyOptions = currency ? { style: 'currency', currency } : {};
  return new Intl.NumberFormat('en-US', currencyOptions).format(Number((value as string)));
};
