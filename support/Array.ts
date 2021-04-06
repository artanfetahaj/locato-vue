/**
 * Converts an Array to a Key Value Pair Object
 *
 * @param {object[]} array
 * @param {string} keyField
 * @param {string} valueField
 */
export const arrayToKeyValuePair = (
  array: {[key: string]: string}[],
  keyField: string, valueField: string,
) => {
  const parsedObject: {[key: string]: string} = {};
  array.forEach((object: {[key: string]: string}) => {
    parsedObject[object[keyField]] = object[valueField];
  });
  return parsedObject;
};

/**
 * Returns a sorted array of objects, sorted by a specific property in the object
 *
 * @param {object[]} objects
 * @param {string} property
 */
export const sortObjectsArrayByProperty = (
  objects: object[],
  property: string,
  // eslint-disable-next-line
): object[] => objects.sort((object1: any, object2: any) => {
  if (object1[property] > object2[property]) { return 1; }
  if (object2[property] > object1[property]) { return - 1; }
  return 0;
});
