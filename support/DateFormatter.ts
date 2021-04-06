import { DateTime } from 'luxon';
import { formatSQLDate } from '@/support/Date';

/**
 * Dateformatter get / sets a formatted (DUTCH) Date, used in DatePickers
 *
 * @export
 * @class DateFormatter
 */
export class DateFormatter {
  private date: string | null = null;

  private time: string | null = null;

  private millis: string | null = null;

  private timeZoneOffset: string | null = null;

  private isAtom = false;

  private formatted: string | null = null;

  public get selectedDate(): string {
    return this.date || '';
  }

  public set selectedDate(date: string) {
    const cleanDate: string = this.cacheAndRemoveAtomDateParts(date);
    this.date = date ? formatSQLDate(cleanDate, 'yyyy-LL-dd') : '';
    this.formattedDate = date ? formatSQLDate(cleanDate, 'dd-LL-yyyy') : '';
  }

  public get formattedDate(): string {
    return this.formatted || '';
  }

  public set formattedDate(date: string) {
    if (! date) {
      return;
    }

    this.formatted = this.rebuildAtomDateParts(date);

    if (! this.date || this.formatted !== formatSQLDate(this.date)) {
      this.selectedDate = DateTime.fromFormat(date, 'dd-LL-yyyy').toFormat('yyyy-LL-dd');
    }
  }

  // #FIXME: Please validate if this is ok as is
  protected cacheAndRemoveAtomDateParts(date: string): string {
    if (date.includes('Z') || date.includes('.')) {
      this.isAtom = true;
      if (date.includes('Z')) {
        this.timeZoneOffset = date.split('Z')[1];
        date = date.split('Z')[0];
      }
      if (date.includes('.')) {
        this.millis = date.split('.')[1];
        date = date.split('.')[0];
      }
      if (date.includes('T')) {
        this.time = date.split('T')[1];
        date = date.split('T')[0];
      }
      return date;
    }
    this.isAtom = false;
    return date;
  }

  // #FIXME: Please validate if this is ok as is
  protected rebuildAtomDateParts(date: string): string {
    return this.isAtom
      ? `${
        this.date
      }T${
        this.time ? `${this.time}` : ''
      }${
        this.millis ? `.${this.millis}` : ''
      }Z${
        this.timeZoneOffset ? this.timeZoneOffset : ''
      }`
      : date;
  }
}
