import Day from '../../day.ts';

export default class Day9A extends Day {
  constructor() {
    super({
      day: 9,
      challenge: 'A',

      // The result of the algorithm using sample data
      sampleResult: 1928,
    });
  }

  async answer(input: string) {
    // Write your code here
    const data = input.split('').map(Number);

    const holes = [];
    let position = 0;
    let id = -1;
    const scores = new Map<number, number>();

    data.forEach((value, index) => {
      const isHole = index % 2 === 1;
      if (isHole) {
        holes.push(
          ...new Array(value).fill(position).map((_, i) => position + i),
        );
      } else {
        id++;
        new Array(value)
          .fill(position)
          .map((_, i) => (position + i) * id)
          .map((score, i) => scores.set(position + i, score));
      }
      position += value;
    });

    let count = 0;


    position--;
    for (let i = data.length - 1; i >= 0; i--) {
      const value = data[i];
      const isHole = i % 2 === 1;
      if (isHole) {
        position -= value;
        continue;
      }

      for (let j = 0; j < value; j++) {
        if (holes[0] && holes[0] < position) {
          const hole = holes.shift();
          count += hole * id;
        } else {
          count += scores.get(position);
        }
        position--;
      }
      id--;
    }

    // Return your result
    return count;
  }
}
