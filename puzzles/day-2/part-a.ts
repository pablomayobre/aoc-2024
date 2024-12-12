import Day from '../../day.ts'

export default class Day2A extends Day {
  constructor() {
    super({
      day: 2,
      challenge: "A",
      
      // The result of the algorithm using sample data
      sampleResult: 2 
    })
  }

  async answer(input: string) {
    // Write your code here
    const reports = input.trim().split('\n');

    let safeReports = 0;

    for (const report of reports) {
      const safe = isSafe(report.trim().split(" ").map(Number));

      if (safe) {
        safeReports++;
      }
    }

    // Return your result
    return safeReports;
  }
}

const isSafe = (report: number[]) => {
  let increasing = report[1] > report[0];
  for (let i = 0; i < report.length; i++) {
    const current = report[i];
    const next = report[i + 1];
    if (increasing && (current >= next)) {
      return false;
    }
    if (!increasing && (current <= next)) {
      return false;
    }

    const diff = Math.abs(current - next);
    if (diff > 3) {
      return false;
    }
  }

  return true;
};
