import Day from '../../day.ts'

export default class Day3A extends Day {
  constructor() {
    super({
      day: 3,
      challenge: "A",
      
      // The result of the algorithm using sample data
      sampleResult: 161 
    })
  }

  async answer(input: string) {
    // Write your code here
    const mulRegex = /mul\(([0-9]+),([0-9]+)\)/g;
    const matches = input.match(mulRegex);

    if (!matches) {
      return 0;
    }

    const result = matches.reduce((acc, match) => {
      const [_, x, y] = match.match(/mul\(([0-9]+),([0-9]+)\)/)!;
      return acc + Number(x) * Number(y);
    }, 0);

    // Return your result
    return result; 
  }
}
