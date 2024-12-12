import Day from '../../day.ts';

const intersection = (a: number[], b: Set<number>) => {
  return new Set(a.filter((x) => b.has(x)));
};

export default class Day5A extends Day {
  constructor() {
    super({
      day: 5,
      challenge: 'A',

      // The result of the algorithm using sample data
      sampleResult: 143,
    });
  }

  async answer(input: string) {
    const [rawRules, rawUpdates] = input.trim().split('\n\n');

    const rules = new Map<number, Set<number>>();

    rawRules.split('\n').forEach((rule) => {
      const [a, b] = rule.split('|').map((s) => s.trim());

      const before = rules.get(Number(a)) || new Set<number>();
      before.add(Number(b));
      rules.set(Number(a), before);
    });

    const toPrint = rawUpdates.split('\n').flatMap((rawUpdate) => {
      const update = rawUpdate.split(',').map((s) => Number(s.trim()));

      for (let i = 1; i < update.length; i++) {
        const page = update[i];
        const rule = rules.get(page) || new Set();

        const before = update.slice(0, i);

        if (intersection(before, rule).size !== 0) {
          return [];
        }
      }

      return [update[Math.floor(update.length / 2)]];
    });

    return toPrint.reduce((a, b) => a + b, 0);
  }
}
