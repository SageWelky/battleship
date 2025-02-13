export function makeCached(funcToMakeCached) {
  let firstCall = true;
  let cached;

  return function(...args) {
    let result;

    if (firstCall) {
      result = funcToMakeCached.apply(this, args);

      if (result instanceof Promise) {
        return result.then(res => {
          firstCall = false;
          cached = res;
          return res;
        });
      }
      firstCall = false;
    } else {
      result = funcToMakeCached.apply(this, [...args, cached]);

      if (result instanceof Promise) {
        return result.then(res => {
          cached = res;
          return res;
        });
      }
    }

    cached = result;
    return result;
  };
}
