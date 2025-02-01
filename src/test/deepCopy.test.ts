import { deepCopy } from "../deepCopy";

type CircularObject = {
  a: number;
  b?: CircularObject;
};

describe("복사가 잘 이루어 졌는가", () => {
  test("일반 객체에 대한 테스트", () => {
    const original = { a: 1, b: 2, c: 3 };
    const copied = deepCopy(original);
    expect(copied).toEqual(original);
  });

  test("중첩 객체에 대한 테스트", () => {
    const original = { a: 1, b: { c: 2, d: 3 } };
    const copied = deepCopy(original);
    expect(copied).toEqual(original);
  });

  test("배열에 대한 테스트", () => {
    const original = [1, 2, 3];
    const copied = deepCopy(original);
    expect(copied).toEqual(original);
  });

  test("이차원 배열에 대한 테스트", () => {
    const original: number[][] = [1, [2, 3]] as number[][];
    const copied = deepCopy(original) as number[][];
    expect(copied).toEqual(original);
  });

  test("null에 대한 테스트", () => {
    expect(deepCopy(null)).toEqual(null);
  });

  test("undefined에 대한 테스트", () => {
    expect(deepCopy(undefined)).toEqual(undefined);
  });

  test("순환 참조 객체에 대한 테스트", () => {
    const obj: CircularObject = { a: 1 };
    obj.b = obj;
    const copied = deepCopy(obj) as CircularObject;
    expect(copied).toEqual(obj);
  });

  test("Date에 대한 테스트 ", () => {
    const date = new Date();
    const copied = deepCopy(date);
    expect(copied).toEqual(date);
  });

  test("정규표현식에 대한 테스트", () => {
    const reg = /test/g;
    const copied = deepCopy(reg);
    expect(copied).toEqual(reg);
  });
});

describe("복사한 객체의 속성 값을 바꿔도 원본 객체에 영향을 미치지 않는가", () => {
  test("일반 객체에 대한 테스트", () => {
    const original = { a: 1, b: 2, c: 3 };
    const copied = deepCopy(original);
    copied.a = 4;
    expect(original).not.toEqual(copied);
  });

  test("중첩 객체에 대한 테스트", () => {
    const original = { a: 1, b: { c: 2, d: 3 } };
    const copied = deepCopy(original);
    copied.b.c = 4;
    expect(original).not.toEqual(copied);
  });

  test("배열에 대한 테스트", () => {
    const original = [1, 2, 3];
    const copied = deepCopy(original);
    copied[0] = 4;
    expect(original).not.toEqual(copied);
  });

  test("이차원 배열에 대한 테스트", () => {
    const original: number[][] = [1, [2, 3]] as number[][];
    const copied = deepCopy(original) as number[][];
    copied[1][0] = 4;
    expect(original).not.toEqual(copied);
  });

  test("순환 참조 객체에 대한 테스트", () => {
    const obj: CircularObject = { a: 1 };
    obj.b = obj;
    const copied = deepCopy(obj) as CircularObject;
    copied.a = 2;
    expect(obj).not.toEqual(copied);
  });

  test("Date에 대한 테스트 ", () => {
    const date = new Date();
    const copied = deepCopy(date);
    copied.setDate(4);
    expect(date).not.toEqual(copied);
  });

  test("정규표현식에 대한 테스트", () => {
    const reg = /test/g;
    const copied = deepCopy(reg);
    copied.lastIndex = 4;
    expect(reg).not.toEqual(copied);
  });

  test("null에 대한 테스트", () => {
    const copied = deepCopy(null);
    expect(copied).toEqual(null);
  });

  test("undefined에 대한 테스트", () => {
    const copied = deepCopy(undefined);
    expect(copied).toEqual(undefined);
  });
});
