import UrlPattern from '@/support/UrlPattern';

export const ValidationRules = (): Rules => ({
  required: (value: string): boolean | string => !! value || 'This field is required',
  name: (value: string): boolean | string => {
    const pattern = /^[a-zA-Z0-9\-]+$/;
    return pattern.test(value) || 'Invalid name';
  },
  url: (value: string): boolean | string => UrlPattern.test(value) || 'Invalid url',
  email: (value: string): boolean | string => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Invalid email';
  },
  number: (value: string): boolean | string => {
    const pattern = /^[0-9]+$/;
    return pattern.test(value) || 'Only numbers allowed';
  },
  valuta: (value: string): boolean | string => {
    const pattern = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
    const correctDecimalLength: boolean = value.split('.').length > 0 ? value.split('.')[1].length <= 2 : true;
    return (pattern.test(value) && correctDecimalLength) || 'Only valuta allowed';
  },
  time: (value: string): boolean | string => {
    const pattern = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])[0-5][0-9]$/;
    return pattern.test(value) || 'Invalid time';
  },
  date: (value: string): boolean | string => {
    const pattern = /((0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-[12]\d{3})/;
    return pattern.test(value) || 'Invalid date';
  },
  alphanumeric: (value: string): boolean | string => {
    if (! /^[a-z0-9]+$/i.test(value)) {
      return 'No special characters or spaces allowed';
    }
    return true;
  },
  alphanumericWithSpace: (value: string): boolean | string => {
    if (! /^[a-z\d\-_\s]+$/i.test(value)) {
      return 'No special characters allowed';
    }
    return true;
  },
  lowercase: (value: string): boolean | string => {
    const pattern = /[a-z]+/;
    return pattern.test(value) || 'Only lowercase letters are allowed';
  },
  uppercase: (value: string): boolean | string => {
    const pattern = /[A-Z]+/;
    return pattern.test(value) || 'Only uppercase letters are allowed';
  },
  length: (value: string): boolean | string => {
    const pattern = /.{8,}/;
    return pattern.test(value) || '8 characters minimum';
  },
  lengthExactly3: (value: string): boolean | string => (value && value.length === 3) || 'Exactly 3 characters',
  lengthMinimum2: (value: string): boolean | string => (value && value.length >= 2) || 'At least 2 characters',
  numberPassword: (value: string): boolean | string => {
    const pattern = /[0-9]+/;
    return pattern.test(value) || 'One number required';
  },
  special: (value: string): boolean | string => {
    const pattern = /\W|_/g;
    return pattern.test(value) || 'One special character required';
  },
  dutchPhone: (value: string): boolean | string => {
    const pattern = /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/g;
    return pattern.test(value) || 'Invalid (dutch) phone number';
  },
  dutchPostcode: (value: string): boolean | string => {
    const pattern = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
    return pattern.test(value) || 'Invalid (dutch) postcode';
  },
});

export type Rule = (value: string) => boolean | string;

export interface Rules {
  [key: string]: Rule;
}
