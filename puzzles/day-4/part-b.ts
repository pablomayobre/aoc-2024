import Day from '../../day.ts';

const XMAS = {
  X: 999,
  M: -1,
  A: 999,
  S: 1,
};

const sequence = (
  map: Map<string, number>,
  x: number,
  y: number,
  direction: readonly [number, number, number, number],
) => {
  const a = `${x + direction[0]},${y + direction[1]}`;
  const b = `${x + direction[2]},${y + direction[3]}`;

  const valueA = map.get(a);
  const valueB = map.get(b);
  if (valueA + valueB !== 0) {
    return false;
  }

  return true;
};

const directions = [
  [1, 1, -1, -1], // Diagonal
  [1, -1, -1, 1], // Diagonal
] as const;

export default class Day4A extends Day {
  constructor() {
    super({
      day: 4,
      challenge: 'A',

      // The result of the algorithm using sample data
      sampleResult: 9,
    });
  }

  async answer(input: string) {
    // Write your code here
    const map = new Map<string, number>();
    const starts = [];

    input
      .trim()
      .split('\n')
      .forEach((line, x) => {
        line
          .trim()
          .split('')
          .forEach((char, y) => {
            map.set(`${x},${y}`, XMAS[char]);
            if (char === 'A') {
              starts.push([x, y]);
            }
          });
      });

    let count = 0;
    for (const start of starts) {
      const X = directions.every((direction) => {
        return sequence(map, start[0], start[1], direction);
      });

      if (X) {
        count++;
      }
    }

    // Return your result
    return count;
  }
}
