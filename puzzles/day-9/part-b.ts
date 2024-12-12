import Day from '../../day.ts';

export default class Day9B extends Day {
  constructor() {
    super({
      day: 9,
      challenge: 'B',

      // The result of the algorithm using sample data
      sampleResult: 2858,
    });
  }

  async answer(input: string) {
    // Write your code here
    const data = input.split('').map(Number);

    const holes = [];
    const files = [];
    let position = 0;
    let id = -1;

    data.forEach((value, index) => {
      const isHole = index % 2 === 1;
      if (isHole) {
        files.push({
          hole: true,
          size: value,
          position: position,
          id: null,
        });
        holes.push(files.length - 1);
      } else {
        id++;
        files.push({
          hole: false,
          size: value,
          position: position,
          id: id,
        });
      }
      position += value;
    });

    let count = 0;

    fileLoop: for (let i = files.length - 1; i >= 0; i--) {
      const file = files[i];
      if (file.hole) {
        continue;
      }

      for (let j = 0; j < holes.length; j++) {
        const hole = files[holes[j]];
        if (hole.size >= file.size && hole.position < file.position) {
          count +=
            file.id *
            (hole.position * file.size + ((file.size * (file.size + 1)) / 2 - file.size));

          hole.size -= file.size;
          hole.position += file.size;
          continue fileLoop;
        }
      }

      count +=
        file.id *
        (file.position * file.size + ((file.size * (file.size + 1)) / 2 - file.size));
    }

    // Return your result
    return count;
  }
}
