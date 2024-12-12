import Day from '../../day.ts';

type Direction = 'up' | 'down' | 'left' | 'right';
type Visited = Direction | 'turn' | null;
type VisitedMap = Map<string, readonly [Visited, Visited]>;

const directions = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
} as const;

const directionMap = {
  up: 'right',
  right: 'down',
  down: 'left',
  left: 'up',
} as const;

const getNext = (
  current: [number, number],
  direction: 'up' | 'down' | 'left' | 'right',
): [number, number] => {
  const [x, y] = current;
  const [dx, dy] = directions[direction];
  return [x + dx, y + dy];
};

export default class Day6B extends Day {
  constructor() {
    super({
      day: 6,
      challenge: 'B',

      // The result of the algorithm using sample data
      sampleResult: 6,
    });
  }

  async answer(input: string) {
    // Write your code here
    const visited: VisitedMap = new Map();
    const map = new Map<string, boolean>();
    let current: [number, number] = [0, 0];
    let direction: Direction;

    let maxX = 0;
    let maxY = 0;

    input
      .trim()
      .split('\n')
      .forEach((line, y) => {
        line.split('').forEach((char, x) => {
          if (char === '#') {
            map.set(`${x},${y}`, true);
          }
          if (char === '^') {
            current = [x, y];
            visited.set(`${x},${y}`, ['up', null] as const);
          }

          maxX = Math.max(maxX, x);
        });
        maxY = Math.max(maxY, y);
      });

    while (
      current[0] > 0 &&
      current[1] > 0 &&
      current[0] < maxX &&
      current[1] < maxY
    ) {
      const next = getNext(current, direction);

      if (map.get(`${next[0]},${next[1]}`)) {
        prevDirection = direction;
        direction = directionMap[direction];
        visited.set(`${current[0]},${current[1]}`, ['turn']);
      } else {
        current = next;
        visited.set(`${next[0]},${next[1]}`, direction);
      }
    }

    // Return your result
    return visited.size;
  }
}
