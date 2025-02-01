import { deepCopy } from "../deepCopy";

type CircularObject = {
  a: number;
  b?: CircularObject;
};

describe("deepCopy 함수 테스트", () => {
  describe("복사가 제대로 이루어졌는가", () => {
    describe("객체 테스트", () => {
      test("일반 객체", () => {
        const original = { a: 1, b: 2, c: 3 };
        const copied = deepCopy(original);
        expect(copied).toEqual(original);
      });

      test("중첩 객체", () => {
        const original = { a: 1, b: { c: 2, d: 3 } };
        const copied = deepCopy(original);
        expect(copied).toEqual(original);
      });

      test("순환 참조 객체", () => {
        const obj: CircularObject = { a: 1 };
        obj.b = obj;
        const copied = deepCopy(obj) as CircularObject;
        expect(copied).toEqual(obj);
      });
    });

    describe("배열 테스트", () => {
      test("일차원 배열", () => {
        const original = [1, 2, 3];
        const copied = deepCopy(original);
        expect(copied).toEqual(original);
      });

      test("이차원 배열", () => {
        const original: number[][] = [1, [2, 3]] as number[][];
        const copied = deepCopy(original) as number[][];
        expect(copied).toEqual(original);
      });
    });

    describe("특수 타입 테스트", () => {
      test("null", () => {
        expect(deepCopy(null)).toEqual(null);
      });

      test("undefined", () => {
        expect(deepCopy(undefined)).toEqual(undefined);
      });

      test("Date", () => {
        const date = new Date();
        const copied = deepCopy(date);
        expect(copied instanceof Date).toBe(true);
        expect(copied.getTime()).toBe(date.getTime());
      });

      test("정규표현식", () => {
        const reg = /test/gi;
        reg.lastIndex = 2;
        const copied = deepCopy(reg);
        expect(copied instanceof RegExp).toBe(true);
        expect(copied.source).toBe(reg.source);
        expect(copied.flags).toBe(reg.flags);
        expect(copied.lastIndex).toBe(reg.lastIndex);
      });
    });
  });

  describe("복사본을 수정하였을때 원본객체에 영향을 끼치는가", () => {
    describe("객체 테스트", () => {
      test("일반 객체", () => {
        const original = { a: 1, b: 2, c: 3 };
        const copied = deepCopy(original);
        copied.a = 4;
        expect(original).not.toEqual(copied);
      });

      test("중첩 객체", () => {
        const original = { a: 1, b: { c: 2, d: 3 } };
        const copied = deepCopy(original);
        copied.b.c = 4;
        expect(original).not.toEqual(copied);
      });

      test("순환 참조 객체", () => {
        const obj: CircularObject = { a: 1 };
        obj.b = obj;
        const copied = deepCopy(obj) as CircularObject;
        copied.a = 2;
        expect(obj).not.toEqual(copied);
      });
    });

    describe("배열 테스트", () => {
      test("일차원 배열", () => {
        const original = [1, 2, 3];
        const copied = deepCopy(original);
        copied[0] = 4;
        expect(original).not.toEqual(copied);
      });

      test("이차원 배열", () => {
        const original: number[][] = [1, [2, 3]] as number[][];
        const copied = deepCopy(original) as number[][];
        copied[1][0] = 4;
        expect(original).not.toEqual(copied);
      });
    });

    describe("특수 타입 테스트", () => {
      test("Date", () => {
        const date = new Date();
        const originalTime = date.getTime();
        const copied = deepCopy(date);
        copied.setDate(4);
        expect(date.getTime()).toBe(originalTime);
        expect(copied.getTime()).not.toBe(originalTime);
      });

      test("정규표현식", () => {
        const reg = /test/gi;
        reg.lastIndex = 2;
        const copied = deepCopy(reg);
        const originalLastIndex = reg.lastIndex;
        copied.lastIndex = 4;
        expect(reg.lastIndex).toBe(originalLastIndex);
        expect(copied.lastIndex).toBe(4);
      });
    });
  });
});
