// hardly inspired by array-move
// https://github.com/sindresorhus/array-move

export function arrayMoveMutable<TItem>(
  array: TItem[],
  fromIndex: number,
  toIndex: number,
): void {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    if (item !== undefined) {
      array.splice(endIndex, 0, item);
    }
  }
}

export function arrayMoveImmutable<TItem>(
  array: TItem[],
  fromIndex: number,
  toIndex: number,
): TItem[] {
  const newArray = [...array];
  arrayMoveMutable(newArray, fromIndex, toIndex);
  return newArray;
}
