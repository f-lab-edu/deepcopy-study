export const deepCopy = <T>(value: T, cache = new WeakMap()): T => {
  // null이거나 object가 아닌 경우 value를 반환 , 재귀함수 종료
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (value instanceof Date) {
    const copyDate = new Date(value.getTime());
    Object.setPrototypeOf(copyDate, Object.getPrototypeOf(value));
    return copyDate as T;
  }

  if (value instanceof RegExp) {
    const copyRegExp = new RegExp(value.source, value.flags);
    copyRegExp.lastIndex = value.lastIndex;
    return copyRegExp as T;
  }

  if (cache.has(value)) {
    return cache.get(value);
  }

  const deepCopyValue = {} as T;

  cache.set(value, deepCopyValue);

  if (Array.isArray(value)) {
    return value.map((v) => deepCopy(v, cache)) as T;
  }

  //   객체의 모든 key를 순회 하면서 hasOwnProperty로 key가 있는지 확인
  //   key가 있다면 deepCopy 함수를 재귀 호출
  //   key가 없다면 value를 그대로 대입
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      (deepCopyValue as T)[key] = deepCopy((value as T)[key], cache);
    }
  }

  return deepCopyValue;
};
