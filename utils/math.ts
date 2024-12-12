import { memo } from "./memo.ts";

export function addNumbersUpTo(n: number) {
  return (n * (n + 1)) / 2;
}

export const factorial = memo(function (n: number) {
  return n === 0 ? 1 : n * factorial(n - 1);
});
