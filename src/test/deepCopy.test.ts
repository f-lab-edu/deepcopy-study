import { deepCopy } from "../deepCopy";

describe("deepCopy", () => {
  test("깊은복사 테스트입니다.", () => {
    expect(deepCopy({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
  });
});
