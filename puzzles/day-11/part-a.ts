import Day from '../../day.ts'

export default class Day11A extends Day {
  constructor() {
    super({
      day: 11,
      challenge: "A",
      
      // The result of the algorithm using sample data
      sampleResult: 55312 
    })
  }

  async answer(input: string) {
    // Write your code here
    const blinks = 25;

    let stones = input.trim().split(' ') as `${number}`[];

    for (let i = 0; i < blinks; i++) {
      stones = stones.flatMap(mutate).map((n) => `${n}` as const);
      if (i < 6) {
        console.log(`- Currently there are ${stones.length} stones:`)
        console.log(stones.join(' '));
      }
    }
    // Return your result
    return stones.length; 
  }
}

const mutate = (number: `${number}`) => {
  if (number === "0") {
    return [1];
  } else if (number.length % 2 === 0) {
    const split = number.length / 2;
    return [Number(number.slice(0, split)), Number(number.slice(split))];
  } else {
    return [(Number(number) * 2024)];
  }
};
