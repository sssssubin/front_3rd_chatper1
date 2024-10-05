// TODO: createVNode 함수 구현
// 1. type, props, ...children을 매개변수로 받는 함수를 작성하세요.
// 2. 반환값은 { type, props, children } 형태의 객체여야 합니다.
// 3. children은 평탄화(flat)되어야 하며, falsy 값은 필터링되어야 합니다.
// 4. Infinity를 사용하여 모든 깊이의 배열을 평탄화하세요.

export function createVNode(type, props, ...children) {
  // 배열을 평탄화하는 함수
  function flattenArray(arr) {
    return arr.flat(Infinity);
  }

  // falsy 값을 필터링하는 함수
  function filterFalsyValues(arr) {
    return arr.filter((child) => child !== null && child !== undefined);
  }

  return {
    type,
    props,
    // 먼저 평탄화한 후, falsy 값을 필터링
    children: filterFalsyValues(flattenArray(children)),
  };
}
