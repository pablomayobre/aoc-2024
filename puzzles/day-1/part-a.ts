import Day from '../../day.ts'

export default class Day1A extends Day {
  constructor() {
    super({
      day: 1,
      challenge: "A",
      
      // The result of the algorithm using sample data
      sampleResult: 11 
    })
  }

  async answer(input: string) {
    // Write your code here
    const lines = input.trim().split('\n');
    const left = [];
    const right = [];

    lines.map((line) => {
      const [l, r] = line.split('   ').map(Number);
      left.push(l);
      right.push(r);
    });

    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    let totalDistance = 0;

    for (let i = 0; i < left.length; i++) {
      const l = left[i];
      const r = right[i];
      totalDistance += Math.abs(l - r);
    } 

    // Return your result
    return totalDistance;
  }
}
