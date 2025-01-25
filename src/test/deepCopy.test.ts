import { deepCopy } from "../deepCopy";

describe("깊은 복사 테스트 - 입력 A : 일반 객체", () => {
  test("일반객체 테스트 1", () => {
    const original = { a: 1, b: 2, c: 3 };
    const copied = deepCopy(original) as typeof original;
    copied.a = 4;
    expect(original.a).toBe(1);
    expect(original !== copied).toBe(true);
  });

  test("깊은복사 테스트 2", () => {
    const original = { a: 1, b: { c: 2, d: 3 } };
    const copied = deepCopy(original) as typeof original;
    copied.b.c = 4;
    expect(original.b.c).toBe(2);
    expect(original.b !== copied.b).toBe(true);
  });
});

describe("깊은 복사 테스트 - 입력 B : 배열", () => {
  test("배열 테스트 1", () => {
    const original = [1, 2, 3];
    const copied = deepCopy(original) as typeof original;
    copied[0] = 4;
    expect(original[0]).toBe(1);
    expect(original !== copied).toBe(true);
  });

  test("배열 테스트 2", () => {
    const original: number[][] = [1, [2, 3]] as number[][];
    const copied = deepCopy(original) as number[][];
    (copied[1] as number[])[0] = 4;
    expect(original[1][0]).toBe(2);
    expect(original[1] !== copied[1]).toBe(true);
  });
});

describe("깊은 복사 테스트 - 입력 C : null, undefined", () => {
  test("null 테스트", () => {
    expect(deepCopy(null)).toBe(null);
  });

  test("undefined 테스트", () => {
    expect(deepCopy(undefined)).toBe(undefined);
  });
});

type CircularObject = {
  a: number;
  b?: CircularObject;
};

describe("깊은 복사 테스트 - 입력 D : 순환 참조 객체", () => {
  test("순환 참조 객체 테스트", () => {
    const obj: CircularObject = { a: 1 };
    obj.b = obj;
    const copied = deepCopy(obj) as CircularObject;
    expect(copied.b).toBe(copied);
  });
});
