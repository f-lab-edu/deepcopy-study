# deepcopy-study
- 깊은 복사를 공부하면서 실제 함수로 구현해보는 연습입니다.

## 초기 셋팅 과정
```typescript
# npm 초기화
npm init -y

# TypeScript 및 Jest 관련 패키지 설치
npm install -D typescript @types/node @types/jest
npm install -D jest ts-jest

# TypeScript 초기화 
npx tsc --init

# Jest 초기화
npx jest --init

# 폴더 및 파일 생성
src폴더 생성 및 테스트 폴더 생성

#package.json 스크립트 추가
```typescript
 "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "build": "tsc",
    "start": "node dist/index.js"
  },
```


## 초기 셋팅 중 오류 발생
- 오류메시지
```typescript
/Users/sunny/f-lab/deepcopy-study/src/test/deepCopy.test.ts:1
   ({"Object.<anonymous>":function(module,exports,require,dirname,filename,jest){import deepCopy from "../deepCopy";
                                                                                     ^^^^^^
   SyntaxError: Cannot use import statement outside a module
     at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1505:14)
```
- 원인 : Jest가 ES모듈구문(import,export)를 처리하지 못해서 발생한 문제
- 해결 :
  - package.json에 "type": "module" 추가하기
  - jest.config.ts 파일에 useESM관련 기능 추가하기 (Jest의 기본설정이 CJS모듈 시스템을 활용하고있어서 ESM설정을 해줘야함)



## 테스트 방법
```typescript
npm test
```