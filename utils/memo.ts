export function memo<T extends any[], R extends any>(fn: (...args:T) => R) {
  const cache = new Map<string, R>();
  return   (...args: T) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
