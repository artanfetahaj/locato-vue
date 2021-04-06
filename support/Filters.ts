/* eslint-disable */

import Vue from 'vue';
import Currency from '@/support/Currency';
import { formatSQLDate } from '@/support/Date';
import { DateTime } from 'luxon';
import { concatenate } from '@/support/String';

Vue.filter('currency', (value: any) => {
  return Currency(value, 'USD');
});

Vue.filter('secondsToDays', (value: any) => {
  if (! value || ! Number.isInteger(value)) {
    return '-';
  }

  const totalDays = Math.floor(value / 24 / 60);
  const dayString = totalDays === 1 ? 'day' : 'days';

  return `${totalDays} ${dayString}`;
});

Vue.filter('hours', (value: any) => {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
});

Vue.filter('dateFormatTime', (date: string) => {
  if (date === '-') {
    return '-';
  }

  if (!date) {
    return '';
  }

  if (!DateTime.fromSQL(date).isValid) { return '-'; }

  return formatSQLDate(date, 'dd-LL-yyyy HH:mm');
});

Vue.filter('formatTime', (date: string) => {
  if (date === '-') {
    return '-';
  }

  if (!date) {
    return '';
  }

  if (!DateTime.fromSQL(date).isValid) { return '-'; }

  return formatSQLDate(date, 'HH:mm');
});

Vue.filter('dateFormat', (date: string) => {
  if (!date) {
    return '';
  }

  if (!DateTime.fromSQL(date).isValid) { return '-'; }

  return formatSQLDate(date);
});

Vue.filter('atomFormat', (date: string) => {
  if (!date) {
    return '';
  }

  return date.replace('T', ' ').split('.')[0];
});

Vue.filter('lower', (value: string) => {
  if (!value) {
    return '';
  }

  return value.toLowerCase();
});

Vue.filter('capitalize', (value: string) => {
  if (!value) {
    return '';
  }

  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
});

Vue.filter('concatenateString', (value: string, characters: number = 140) => {
  return concatenate(value, characters);
});
