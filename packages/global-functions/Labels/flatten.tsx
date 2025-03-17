export const PROPERTY_SEPARATOR = ".";

// eslint-disable-next-line @typescript-eslint/ban-types
function isObject(value?: unknown): value is object {
  return value !== undefined && typeof value === "object";
}

/**
 * Recursively flattens an object into a shallow representation
 * of itself, mapping one concatenated key per primitive terminal value.
 * To return the object to its original form, use {@link unflatten}
 *
 * @example
 * ```ts
 * const unflatObject = {
 *   "lorem": {
 *     "ipsum": "dolor"
 *   }
 * };
 *
 * const flat = flatten(unflatObject);
 *
 * // flat === {
 * //   "lorem.ipsum": "dolor"
 * // }
 * ```
 *
 * @param object anything
 * @returns anything but flat
 */
export const flatten = (
  object: Record<string, unknown>,
): Record<string, unknown> => {
  return Object.entries(object).reduce(
    (flat, [key, value]) =>
      isObject(value)
        ? Object.entries(flatten(value as Record<string, unknown>)).reduce(
            (temp, [innerKey, innerValue]) => (
              (temp[`${key}${PROPERTY_SEPARATOR}${innerKey}`] = innerValue),
              temp
            ),
            flat,
          )
        : ((flat[key] = value), flat),
    {} as Record<string, unknown>,
  );
};

/**
 * Unflattens a shallow object into a nested form.
 * Use the {@link limit} parameter to control the depth of
 * the result.
 * The default of 0 will fully unflatten the
 * object, a value of 1 will split the key exactly once,
 * beginning from the start and construct an object level
 * for every part resulting from the split.
 *
 * To flatten an object, use the {@link flatten} function
 *
 * @example
 * ```ts
 * const flatObject = {
 *   "lorem.ipsum.dolor.sit": "amet"
 * };
 *
 * const unflat = unflatten(flatObject, 1);
 *
 * // unflat === {
 * //   "lorem": {
 * //     "ipsum.dolor.sit": "amet"
 * //   }
 * // }
 * ```
 *
 * @param object anything flat
 * @param limit how unflat anything should be
 * @returns anything but unflat
 */
export const unflatten = (
  object: Record<string, unknown>,
  limit = -1,
): Record<string, unknown> => {
  return Object.entries(object).reduce(
    (unflat, [key, value]) => {
      const keyParts = key.split(PROPERTY_SEPARATOR);
      const start = keyParts.slice(0, limit);
      const rest = keyParts.slice(limit).join(PROPERTY_SEPARATOR);
      const parts = [...start, rest];

      parts.reduce((temp, innerKey, index, keys) => {
        if (temp[innerKey]) {
          return temp[innerKey] as Record<string, unknown>;
        }

        if (isNaN(Number(keys[index + 1]))) {
          if (keys.length - 1 === index) {
            temp[innerKey] = value;
          } else {
            temp[innerKey] = {};
          }
        } else {
          temp[innerKey] = [];
        }

        return temp[innerKey] as Record<string, unknown>;
      }, unflat);

      return unflat;
    },
    {} as Record<string, unknown>,
  );
};
