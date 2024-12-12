import Day from '../../day.ts'

const intersection = (a: number[], b: Set<number>) => {
  return new Set(a.filter((x) => b.has(x)));
};

export default class Day5B extends Day {
  constructor() {
    super({
      day: 5,
      challenge: "B",
      
      // The result of the algorithm using sample data
      sampleResult: 123 
    })
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

    const toPrint =rawUpdates.split('\n').flatMap((rawUpdate) => {
      const update = rawUpdate.split(',').map((s) => Number(s.trim()));

      let failed = false;

      for (let i = 1; i < update.length; i++) {
        const page = update[i];
        const rule = rules.get(page) || new Set();

        const before = update.slice(0, i);
        
        if (intersection(before, rule).size !== 0) {
          failed = true;
          break;
        }
      }

      if (failed) {
        return [update.sort((a, b) => {
          const aRules = rules.get(a) || new Set();
          const bRules = rules.get(b) || new Set();

          if (aRules.has(b)) {
            return -1;
          }

          if (bRules.has(a)) {
            return 1;
          }

          return 0;
        })[Math.floor(update.length / 2)]];
      }

      return [];
    });

    return toPrint.reduce((a, b) => a + b, 0);
  }
}
