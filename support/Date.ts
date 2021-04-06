import { DateTime } from 'luxon';

/**
 * Formats an SQLDate to a readable nl-NL date
 *
 * @example 2020-12-23 => 23-12-2020
 *
 * @param {string} date
 * @param {string} luxonFormat defaults to 'dd-LL-yyyy'
 */
export const formatSQLDate = (date: string, luxonFormat = 'dd-LL-yyyy'): string => DateTime.fromSQL(date).toFormat(luxonFormat);

/**
 * Formats an Atom Date to a readable nl-NL date
 *
 *
 * @param {string} date
 * @param {string} luxonFormat defaults to 'dd-LL-yyyy'
 */
export const formatAtomDate = (date: string, luxonFormat = 'dd-LL-yyyy'): string => date.replace('T', ' ').split('.')[0];

/**
 * Formats an ISODate to a readable nl-NL date
 *
 * @example 2016-05-25T09:08:34.123 => 23-12-2020
 *
 * @param {string} date
 * @param {string} luxonFormat defaults to 'dd-LL-yyyy'
 */
export const formatISODate = (date: string, luxonFormat = 'dd-LL-yyyy'): string => DateTime.fromISO(date).toFormat(luxonFormat);

export class MonthFormatter {
  private date: string | null = null;

  private formatted: string | null = null;

  public get selectedDate() {
    return this.date || '';
  }

  public set selectedDate(date: string) {
    // yyyy-LL
    this.date = date; // 2020-05
    this.formattedDate = DateTime.fromFormat(date, 'yyyy-LL').toFormat('LLLL yy'); // Mei 20
  }

  public get formattedDate() {
    return this.formatted || '';
  }

  public set formattedDate(date: string) {
    if (! date) {
      return;
    }

    this.formatted = date; // Mei 20

    if (! this.date || DateTime.fromFormat(this.formatted, 'LLLL yy').toFormat('yyyy-LL') !== this.date) {
      this.selectedDate = DateTime.fromFormat(date, 'LLLL yy').toFormat('yyyy-LL');
    }
  }
}

export class RangeFormatter {
  private dates: string[] | null = null;

  private formatted: string[] | null = null;

  public get selectedDates() {
    return this.dates || [];
  }

  public set selectedDates(dates: string[]) {
    this.dates = dates;

    if (this.dates.length === 2) {
      this.formattedDates = [DateTime.fromFormat(this.dates[0], 'yyyy-LL-dd').toFormat('dd-LL-yyyy'), DateTime.fromFormat(this.dates[1], 'yyyy-LL-dd').toFormat('dd-LL-yyyy')];
    }
  }

  public get formattedDates() {
    return this.formatted || [];
  }

  public set formattedDates(dates: string[]) {
    if (! dates) {
      return;
    }

    this.formatted = dates;
  }
}
