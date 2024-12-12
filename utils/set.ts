export function intersection<T>(a: Iterable<T>, b: Set<T>) {
  return new Set([...a].filter((x) => b.has(x)));
}

export function union<T>(a: Iterable<T>, b: Iterable<T>) {
  return new Set([...a, ...b]);
}

export function difference<T>(a: Iterable<T>, b: Set<T>) {
  return new Set([...a].filter((x) => !b.has(x)));
}

export function symmetricDifference<T>(a: Set<T>, b: Set<T>) {
  return new Set([...a, ...b].filter((x) => !(a.has(x) && b.has(x))));
}
