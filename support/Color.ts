/**
 * Converts a hex color value to a rgb color value
 *
 * @param {string} hex
 */
export const hex2rgb = (hex: string): RGBColor | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

/**
 * Converts a hex color value to a rgba color value
 *
 * @param {string} hex
 * @param {number} opacity
 */
export const hex2rgba = (hex: string, opacity: number): string => {
  const parsedHex: string = hex.replace('#', '');
  const regMatch = parsedHex.match(new RegExp(`(.{${parsedHex.length / 3}})`, 'g'));
  if (! regMatch) { return ''; }

  const rgba: number[] = [];
  for (let i = 0; i < regMatch.length; i += 1) {
    rgba[i] = parseInt(regMatch[i].length === 1 ? regMatch[i] + regMatch[i] : regMatch[i], 16);
  }

  if (typeof opacity !== 'undefined') rgba.push(opacity);

  return `rgba(${rgba.join(',')})`;
};

/**
 * Calculates the illuminace value of a hex color value
 *
 * @param {string} hex
 */
export const calculateIlluminance = (hex: string): number => {
  const rgbColor: RGBColor | null = hex2rgb(hex);
  if (! rgbColor) {
    return 0;
  }

  const red = rgbColor.r;
  const green = rgbColor.g;
  const blue = rgbColor.b;

  const a = [red, green, blue].map((color: number) => {
    const colorIlluminance = color / 255;
    return (colorIlluminance <= 0.03928)
      ? colorIlluminance / 12.92 : ((colorIlluminance + 0.055) / 1.055) ** 2.4;
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 * Calculate the contrast to white of a hex color value
 *
 * @param {string} hex
 */
export const contrastToWhite = (hex: string): number | undefined => {
  const illuminance = calculateIlluminance(hex);
  if (! illuminance) {
    return 0;
  }

  const whiteIlluminance = 1;
  return whiteIlluminance / illuminance;
};

/**
 * Check of the contrast to white is ok of a particular hex color value
 *
 * @param {string} hex
 */
export const isContrastToWhiteOk = (hex: string): boolean => {
  const contrast = contrastToWhite(hex);

  if (! contrast) {
    return true;
  }
  return contrast > 4.5;
};

export const pickerColors: string[] = [
  '#f44d3b',
  '#d32f02',
  '#9f0500',
  '#fe9000',
  '#e27500',
  '#c45200',
  '#dbdf00',
  '#fcc400',
  '#fb9e00',
  '#a6dd00',
  '#b0bc00',
  '#808900',
  '#68ccca',
  '#68bc00',
  '#194d33',
  '#73d7ff',
  '#16a5a5',
  '#0c797d',
  '#aea1ff',
  '#009de0',
  '#0061b1',
  '#fda1ff',
  '#7b64ff',
  '#fa28ff',
  '#653294',
  '#ab149e',
];

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}
