export const deepCopy = (value: unknown) => {
  // null이거나 object가 아닌 경우 value를 반환 , 재귀함수 종료
  if (value === null || typeof value !== "object") {
    return value;
  }

  //   객체이므로 Record<string, unknown>으로 타입 단언
  const obj = value as Record<string, unknown>;

  //  객체를 담을 빈 객체 생성
  let deepCopyValue: Record<string, unknown> = {};

  //   객체의 모든 key를 순회 하면서 hasOwnProperty로 key가 있는지 확인
  //   key가 있다면 deepCopy 함수를 재귀 호출
  //   key가 없다면 value를 그대로 대입
  for (let key in obj) {
    deepCopyValue[key] = obj.hasOwnProperty(key)
      ? deepCopy(obj[key])
      : obj[key];
  }

  return deepCopyValue;
};
