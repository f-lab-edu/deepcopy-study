import { deepCopy } from "../deepCopy";

describe("깊은 복사 테스트 - 입력 A : 일반 객체", () => {
  test("일반객체 테스트 1", () => {
    expect(deepCopy({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
  });
  test("깊은복사 테스트 2", () => {
    expect(deepCopy({ a: 1, b: { c: 2, d: 3 } })).toEqual({
      a: 1,
      b: { c: 2, d: 3 },
    });
  });
  test("깊은복사 테스트 3", () => {
    expect(deepCopy({ a: 1, b: { c: 2, d: { e: 3 } } })).toEqual({
      a: 1,
      b: { c: 2, d: { e: 3 } },
    });
  });
});

describe("깊은 복사 테스트 - 입력 B : 배열", () => {
  test("배열 테스트 1", () => {
    expect(deepCopy([1, 2, 3])).toEqual([1, 2, 3]);
  });
  test("배열 테스트 2", () => {
    expect(deepCopy([1, [2, 3]])).toEqual([1, [2, 3]]);
  });
  test("배열 테스트 3", () => {
    expect(deepCopy([1, [2, [3]]])).toEqual([1, [2, [3]]]);
  });
});

describe("깊은 복사 테스트 - 입력 C : null, undefined", () => {
  test("null 테스트", () => {
    expect(deepCopy(null)).toEqual(null);
  });
  test("undefined 테스트", () => {
    expect(deepCopy(undefined)).toEqual(undefined);
  });
});

describe("깊은 복사 테스트 - 입력 D : 순환 참조 객체", () => {
  test("순환 참조 객체 테스트", () => {
    const obj: any = { a: 1 };
    obj.b = obj;
    expect(deepCopy(obj)).toEqual({ a: 1, b: obj });
  });
});
