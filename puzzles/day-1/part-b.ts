import Day from '../../day.ts'

export default class Day1B extends Day {
  constructor() {
    super({
      day: 1,
      challenge: "B",
      
      // The result of the algorithm using sample data
      sampleResult: 31 
    })
  }

  async answer(input: string) {
    // Write your code here
    const lines = input.trim().split('\n');
    const left = [];
    const right = new Map<number, number>();

    lines.map((line) => {
      const [l, r] = line.split('   ').map(Number);
      left.push(l);
      right.set(r, (right.get(r) ?? 0) + 1);
    });

    let totalDistance = 0;

    for (let i = 0; i < left.length; i++) {
      const l = left[i];
      const r = right.get(l) ?? 0;
      totalDistance += l * r;
    }

    // Return your result
    return totalDistance;
  }
}
