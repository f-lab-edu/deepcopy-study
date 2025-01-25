export const deepCopy = <T>(value: T, weakMap = new WeakMap()): T => {
  // null이거나 object가 아닌 경우 value를 반환 , 재귀함수 종료
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (weakMap.has(value)) {
    return weakMap.get(value);
  }

  let deepCopyValue = {} as T;

  weakMap.set(value, deepCopyValue);

  if (Array.isArray(value)) {
    return value.map((v) => deepCopy(v, weakMap)) as T;
  }

  //   객체의 모든 key를 순회 하면서 hasOwnProperty로 key가 있는지 확인
  //   key가 있다면 deepCopy 함수를 재귀 호출
  //   key가 없다면 value를 그대로 대입
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      (deepCopyValue as T)[key] = deepCopy((value as T)[key], weakMap);
    }
  }

  return deepCopyValue;
};
