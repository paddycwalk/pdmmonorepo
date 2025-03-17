/**
 * Helper function for use with {@link Array.reduce} that will reduce an array
 * of values to an array containing the unique elements of the source array.
 *
 * For every value, the function checks with {@link Array.includes}
 * whether it already exists in the target array. If it does not, it gets
 * pushed into the array, if it does, the function does nothing before
 * finally returning the accumulator again
 *
 * @example
 * import { reducers } from '@kit/kit-frontend-lib';
 *
 * const someArray = ['First', 'Second', 'Third', 'First', 'Second', 'First'];
 *
 * const uniqueArray = someArray.reduce(reducers.unique);
 *
 * @param unique The accumulator array in which to reduce the unique values
 * @param current The current value
 * @returns The {@link unique} array
 */
export const unique = <T>(unique: T[], current: T): T[] => {
  if (!unique.includes(current)) {
    unique.push(current);
  }

  return unique;
};
