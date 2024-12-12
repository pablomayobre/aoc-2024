import Day from '../../day.ts';

const neighbors = (index: string) => {
  const [x, y] = index.split(',').map(Number);
  return [`${x + 1},${y}`, `${x - 1},${y}`, `${x},${y + 1}`, `${x},${y - 1}`];
};

const getNextStepsForTile = (
  tiles: Map<string, number>,
  trailHead: string,
  maxLineLength: number,
): string[] => {
  const currentHeight = tiles.get(trailHead);

  const n = neighbors(trailHead);
  const neighborTiles = n.flatMap((id) =>
    tiles.get(id) === currentHeight + 1 ? [id] : [],
  );

  if (currentHeight === 8) return neighborTiles;

  return neighborTiles.flatMap((id) =>
    getNextStepsForTile(tiles, id, maxLineLength),
  );
};

export default class Day10B extends Day {
  constructor() {
    super({
      day: 10,
      challenge: 'B',

      // The result of the algorithm using sample data
      sampleResult: 81,
    });
  }

  async answer(input: string) {
    // Write your code here
    const tiles = new Map<string, number>();

    const lines = input.trim().split('\n');

    const maxLineLength = lines.reduce(
      (max, line) => Math.max(max, line.length),
      0,
    );

    const trailHeads = [];
    input
      .trim()
      .split('\n')
      .forEach((line, y) => {
        line
          .trim()
          .split('')
          .forEach((tile, x) => {
            const id = `${x},${y}`;
            tiles.set(id, Number(tile));

            if (tile === '0') {
              trailHeads.push(id);
            }
          });
      });

    const result = trailHeads.reduce((acc, trailHead) => {
      const peaks = getNextStepsForTile(
        tiles,
        trailHead,
        maxLineLength,
      );
      return acc + peaks.length;
    }, 0);

    // Return your result
    return result;
  }
}
