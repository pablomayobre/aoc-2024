import Day from '../../day.ts'

export default class Day7B extends Day {
  constructor() {
    super({
      day: 7,
      challenge: "B",

      // The result of the algorithm using sample data
      sampleResult: 11387
    })
  }

  async answer(input: string, isSample?: boolean) {
    // Write your code here

    const results = []
    input.trim().split('\n').forEach(line => {
      const [testValue, numbers] = line.split(':').map(s => s.trim())
      const numbersArray = numbers.split(' ').map(Number)

      if (findOperations(numbersArray, Number(testValue))) {
        results.push(Number(testValue))
      }
    })

    const result = results.reduce((a, b) => a + b, 0)

    // Return your result
    return result;
  }
}

function findOperations(numbers: number[], testValue: number) {
  const [first, ...rest] = numbers
  const operations = ['+', '*', '||']
  let combinations: number[]= [first]

  rest.forEach((number, index) => {
    combinations = combinations.flatMap(combination => {
      return operations.flatMap(operation => {
        let result = 0
        if (operation === '+') {
          result = combination + number
        } else if (operation === '*') {
          result = combination * number
        } else {
          result = Number(`${combination}${number}`)
        }

        if (result === 0 || result > testValue) {
          return []
        }

        return [result]
      })
    })
  })

  return combinations.filter(combination => combination === testValue).length > 0
}