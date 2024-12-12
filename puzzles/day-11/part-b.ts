import Day from '../../day.ts'

export default class Day11B extends Day {
  constructor() {
    super({
      day: 11,
      challenge: "B",
      
      // The result of the algorithm using sample data
      sampleResult: 65601038650482 
    })
  }

  async answer(input: string) {
    // Write your code here
    const blinks = 75;

    let stones = input.trim().split(' ') as `${number}`[];

    const result = stones.map((stone) => mutate(stone, blinks)).reduce((acc, curr) => {
      return acc + curr
    }, 0);

    // Return your result
    return result; 
  }
}

const cache = new Map<`${number}.${number}`, number>();

const mutate = (number: `${number}`, iterations: number): number => {
  if (iterations === 0) {
    return 1
  }

 const cached = cache.get(`${iterations}.${number}`);
  if (cached) {
    return cached;
  } 

  const items = []
  if (number === "0") {
    items.push("1");
  } else if (number.length % 2 === 0) {
    const split = number.length / 2;
    items.push(Number(number.slice(0, split)).toString());
    items.push(Number(number.slice(split)).toString());
  } else {
    items.push((Number(number) * 2024).toString());
  }

  const count = items.map((item) => {
    return mutate(item, iterations - 1)
  }).reduce((acc, curr) => {
    return acc + curr
  }, 0)

  cache.set(`${iterations}.${number}`, count);
  return count;
};
