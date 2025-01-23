import { deepCopy } from "../deepCopy";

describe("deepCopy", () => {
  test("깊은복사 테스트 1", () => {
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
  test("깊은복사 테스트 4", () => {
    expect(deepCopy({ a: 1, b: { c: 2, d: { e: { f: 3 } } } })).toEqual({
      a: 1,
      b: { c: 2, d: { e: { f: 3 } } },
    });
  });
});
