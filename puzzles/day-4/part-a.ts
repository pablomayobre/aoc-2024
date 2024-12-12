import Day from '../../day.ts';

const XMAS = {
  X: 0,
  M: 1,
  A: 2,
  S: 3,
};

const sequence = (
  map: Map<string, number>,
  x: number,
  y: number,
  sx: number,
  sy: number,
) => {
  for (let i = 1; i < 4; i++) {
    const tile = `${x + sx * i},${y + sy * i}`;

    const value = map.get(tile);
    if (!value) {
      return false;
    }
    if (value !== i) {
      return false;
    }
  }

  return true;
};

const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

export default class Day4A extends Day {
  constructor() {
    super({
      day: 4,
      challenge: 'A',

      // The result of the algorithm using sample data
      sampleResult: 18,
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
            if (char === 'X') {
              starts.push([x, y]);
            }
          });
      });

    let count = 0;
    for (const start of starts) {
      for (const direction of directions) {
        if (sequence(map, start[0], start[1], direction[0], direction[1])) {
          count++;
        }
      }
    }

    // Return your result
    return count;
  }
}
