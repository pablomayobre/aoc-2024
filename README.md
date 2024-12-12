# Advent of Code Typescript

## Setup

Firs you need to setup [aoc-cli](https://github.com/scarvalhojr/aoc-cli), it should be available globally and you need to have [configured your session cookie](https://github.com/scarvalhojr/aoc-cli?tab=readme-ov-file#session-cookie-).

Then you should update `wrapper.ts` with the year you wanna solve puzzles for.

Run `npm install` or `pnpm install` and start solving puzzles!

## Start a new day

Every time you wanna solve a puzzle you will need to run the `init` command. This command will setup a very basic template, it will create a markdown file containing the puzzle description and your data as a text file.


To do all this run the `init` command with the day you wanna initialize:
```shell
npm run init -- 1

# or

pnpm run init 1
```

The command above would initialize day 1 with the following folder structure

```yaml
puzzles
 - day-1
   - puzzle.md               # The puzzle description for day 1
   - data.txt                # Your data for this puzzle
   - part-a.sample-data.txt  # Empty file where you can place the sample data
   - part-a.ts               # Typescript template to write your answer
```

## Save your sample data

I recommend you first read the puzzle, grab the sample data generally presented as a code block and paste it into `part-a.sample-data.txt`. 

The puzzle will (very likely) give you the answer for that sample data, this value should be set in `sampleResult` inside of your `part-a.ts` template.


## Write your answer

You can then write your answer in the generated template `part-a.ts` like so:

```ts
import Day from '../../day.ts';

export default class Day1A extends Day {
  constructor() {
    super({
      day: 1,
      challenge: 'A',

      sampleResult: '142', // DON'T FORGET TO ADD THE EXPECTED RESULT FOR THE SAMPLE DATA
    });
  }

  async answer(input: string) {
    const list = input.trim().split('\n').map(value => parseInt(value));

    return list.reduce((a, b) => a + b);
  }
}
```

## Test it

You can then test your answer using the following command:

```shell
npm run exec -- 1 A -s

# or 

pnpm run exec 1 A -s
```

> Note:
> `-s` is shorthand for `--sample`

This will run the code for Day 1 part 1 (internally called challenge A) against the sample data.

You will either know if you succeeded or failed on your quest.

## Ship it

Once you are happy with your result against sample data you can submit your answer by running the same command but against your input data:

```shell
npm run exec -- 1 A
```

This will run the code for Day 1 challenge A, against the input data, submit the answer and let you know if it's correct or not.

If you want to test against input data without submitting your answer, you can use the following command

```shell
npm run exec -- 1 A -n

# or

pnpm run exec 1 A -n
```

> Note:
> `-n` is shorthand for `--dont-submit`

Solving challenge A, will automatically update your `puzzle.md` and create a new `part-b.ts` for you to advance into the second part of the puzzle, also known as challenge B.

## Typecheck and Formatting

I left some commands for formatting and type checking with Prettier and Typescript respectively:

``` shell
# Formatting
npm run format

# Typecheck
npm run check
```

## Bun

All this commands mentioned in this README have their `bun` equivalents:

```shell
# pnpm run init 1
pnpm run init-bun 1

# pnpm run exec 1 A -s
pnpm run exec-bun 1 A -s
```

Please note that the template is compatible with Bun, it will be up to you to make sure your solutions also work with it.

The performance improvement is nice, so I recommend this.

## Configure the year

If you wanna do the challenge for a previous year, you just need to update the `YEAR` constant in `./wrapper.ts` around line 6.