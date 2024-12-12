import Day from '../../day.ts'

export default class Day3B extends Day {
  constructor() {
    super({
      day: 3,
      challenge: "B",
      
      // The result of the algorithm using sample data
      sampleResult: 48 
    })
  }

  async answer(input: string) {
    // Write your code here
    const mulRegex = /(mul\(([0-9]+),([0-9]+)\))|((do|don't)\(\))/g;
    const matches = input.match(mulRegex);

    if (!matches) {
      return 0;
    }

    let enabled = true;
    let result = 0;
    for (const match of matches) {
      if (match.includes("don't")) {
        enabled = false;
      } else if (match.includes("do")) {
        enabled = true;
      } else if (enabled) {
        const [_, x, y] = match.match(/mul\(([0-9]+),([0-9]+)\)/)!;
        result += Number(x) * Number(y);
      }
    }

    // Return your result
    return result; 
  }
}
