import Day from '../../day.ts';

export default class Day2B extends Day {
  constructor() {
    super({
      day: 2,
      challenge: 'B',

      // The result of the algorithm using sample data
      sampleResult: 14,
    });
  }

  async answer(input: string) {
    // Write your code here
    const reports = input.trim().split('\n');

    let safeReports = 0;

    for (const report of reports) {
      const safe = isSafe(report.trim().split(' ').map(Number));

      if (safe) {
        safeReports++;
      }
    }

    // Return your result
    return safeReports;
  }
}

const isSafe = (report: number[]) => {
  nextRemoved: for (let removed = 0; removed < report.length; removed++) {
    const tempReport = report.filter((_, index) => index !== removed);

    let increasing = tempReport[1] > tempReport[0];
    for (let i = 0; i < tempReport.length - 1; i++) {
      const current = tempReport[i];
      const next = tempReport[i + 1];
      if (increasing && current >= next) {
        continue nextRemoved;
      }
      if (!increasing && current <= next) {
        continue nextRemoved;
      }

      const diff = Math.abs(current - next);
      if (diff > 3) {
        continue nextRemoved;
      }
    }

    return true;
  }

  return false;
};
