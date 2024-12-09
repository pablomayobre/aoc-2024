export default class Day {
  readonly day: number;
  readonly challenge: 'A' | 'B';

  readonly sampleResult: string;

  constructor({
    day,
    challenge,
    sampleResult,
  }: {
    day: number;
    challenge: 'A' | 'B';
    sampleResult: string | number | null | undefined;
  }) {
    this.day = day;
    this.challenge = challenge;
    this.sampleResult = (sampleResult ?? '').toString();
  }

  async exec(file: string) {
    const start = performance.now();
    const result = await this.answer(file);
    const end = performance.now();

    return { result, time: end - start };
  }

  async answer(input: string): Promise<string | number> {
    throw new Error('Not implemented');
  }
}
