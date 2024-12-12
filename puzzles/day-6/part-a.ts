import Day from '../../day.ts'

const directions = {
  "up": [0, -1],
  "down": [0, 1],
  "left": [-1, 0],
  "right": [1, 0]
}

const directionMap = {
  "up": "right",
  "right": "down",
  "down": "left",
  "left": "up"
}

const getNext = (current: [number, number], direction: string): [number, number] => {
  const [x, y] = current;
  const [dx, dy] = directions[direction];
  return [x + dx, y + dy];
}

export default class Day6A extends Day {
  constructor() {
    super({
      day: 6,
      challenge: "A",
      
      // The result of the algorithm using sample data
      sampleResult: 41 
    })
  }

  async answer(input: string) {
    // Write your code here
    const visited = new Set<string>();
    const map = new Map<string, boolean>();
    let current: [number, number] = [0, 0];
    let direction = "up"

    let maxX = 0;
    let maxY = 0;

    input.trim().split('\n').forEach((line, y) => {
      line.split('').forEach((char, x) => {
        if (char === '#') {
          map.set(`${x},${y}`, true);
        }
        if (char === "^") {
          current = [x, y];
          visited.add(`${x},${y}`);
        }

        maxX = Math.max(maxX, x);
      });
      maxY = Math.max(maxY, y);
    });

    while (current[0] > 0 && current[1] > 0 && current[0] < maxX && current[1] < maxY) {
      const next = getNext(current, direction);

      if (map.get(`${next[0]},${next[1]}`)) {
        direction = directionMap[direction];
      } else {
        current = next;
        visited.add(`${next[0]},${next[1]}`);
      }
    }

    // Return your result
    return visited.size; 
  }
}
