import { mkdir, open, rm, stat, writeFile, readFile } from 'fs/promises';
import type Day from './day.ts';
import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';

export const YEAR = 2023;

const execute = promisify(exec);

export async function exists(path: string) {
  return await stat(path)
    .then(() => true)
    .catch(() => false);
}

export function dayTemplate(day: number, challenge: 'A' | 'B') {
  return `import Day from '../../day.ts'

export default class Day${day}${challenge} extends Day {
  constructor() {
    super({
      day: ${day},
      challenge: "${challenge}",
      
      // The result of the algorithm using sample data
      sampleResult: null 
    })
  }

  async answer(input: string) {
    // Write your code here


    // Return your result
    return 0; 
  }
}
`;
}

export async function downloadData(day: number, challenge: 'A' | 'B') {
  console.log(`Creating files for day ${day} (challenge ${challenge})`);

  const path = `./puzzles/day-${day}`;

  // Typescript code
  if (!(await exists(`${path}/part-${challenge.toLowerCase()}.ts`))) {
    await writeFile(
      `${path}/part-${challenge.toLowerCase()}.ts`,
      dayTemplate(day, challenge),
    );
  }

  // Sample data
  if (await exists(`${path}/part-${challenge.toLowerCase()}.sample-data.txt`)) {
    console.log('Sample data already exists. Skipping.');
  } else if (
    challenge === 'B' &&
    (await exists(`${path}/part-a.sample-data.txt`))
  ) {
    // Copy over sample data from challenge "A", sometimes it doesn't match though so we keep them separate
    await writeFile(
      `${path}/part-${challenge.toLowerCase()}.sample-data.txt`,
      await readFile(`${path}/part-a.sample-data.txt`),
    );
  } else {
    // Touch the file
    await (
      await open(`${path}/part-${challenge.toLowerCase()}.sample-data.txt`, 'a')
    ).close();
  }

  // Remove puzzle and data
  await rm(`${path}/data.txt`, { force: true });
  await rm(`${path}/puzzle.md`, { force: true });

  console.log(
    `Downloading puzzle and input data for day ${day} (challenge ${challenge})`,
  );

  // Download puzzle and data from AOC
  await execute(
    `aoc download --year ${YEAR} --day ${day} --input-file ${path}/data.txt --puzzle-file ${path}/puzzle.md`,
  );

  console.log('');
  console.log(chalk.green.bold('Done ✅'));
}

export async function createChallengeDirectory(
  day: number,
  challenge: 'A' | 'B' = 'A',
) {
  await mkdir(`./puzzles/day-${day}/`, { recursive: true });

  await downloadData(day, challenge);
}

export async function executeDay(
  dayNumber: number,
  challenge: 'A' | 'B',
  useSampleData?: boolean,
  dontSubmit?: boolean,
) {
  const path = `./puzzles/day-${dayNumber}`;
  const dayFile = `${path}/part-${challenge.toLowerCase()}.ts`;

  if (await exists(dayFile)) {
    const { default: day } = (await import(dayFile)) as {
      default: { new (): Day };
    };

    const instance = new day();

    const fileName = useSampleData
      ? `part-${challenge.toLowerCase()}.sample-data`
      : 'data';

    if (! await exists(`${path}/${fileName}.txt`)) {
      await downloadData(dayNumber, challenge)
      
      if (useSampleData) {
        console.log("You will need to fill in your sample data before executing this challenge.")
        return;
      }
    }

    const file = (await readFile(`${path}/${fileName}.txt`)).toString();

    const { result, time } = await instance.exec(file);

    console.log(chalk.bold(`Your answer was: ${chalk.inverse(` ${result} `)}`));
    console.log(`Execution time: ${time}ms`);

    if (dontSubmit) {
      return;
    }

    let passed = false;
    if (useSampleData) {
      if (instance.sampleResult === '') {
        throw new Error(
          "Don't forget to pass a sampleResult to the super() constructor. You should be able to find the value in your puzzle description.",
        );
      }

      passed = instance.sampleResult === result.toString();
    } else {
      passed = await submitAnswer(result.toString(), dayNumber, challenge);
    }

    console.log('');

    console.log(
      passed
        ? chalk.green.bold(`✅  -  You have solved the challenge`)
        : chalk.red.bold(
            `❎  -  That's not the right solution, try again${
              useSampleData ? '' : ' in a couple minutes'
            }`,
          ),
    );

    if (passed && challenge === 'A' && !useSampleData) {
      await downloadData(dayNumber, 'B');
    } else if (passed && challenge === 'B' && !useSampleData) {
      await rm(`${path}/puzzle.md`, { force: true });

      // Download puzzle again just to have the answer saved to file
      await execute(
        `aoc download --year ${YEAR} --day ${dayNumber} --puzzle-only --puzzle-file ${path}/puzzle.md`,
      );
    }
  } else {
    await downloadData(dayNumber, challenge)
      
    console.log("The day you tried to execute didn't exist so we created it for you.")
    console.log("Fill your answer and execute it once more.")
  }
}

export function submitAnswer(
  result: string,
  day: number,
  challenge: 'A' | 'B',
) {
  return new Promise<boolean>((resolve, reject) =>
    exec(
      `aoc submit ${challenge === 'A' ? 1 : 2} ${result} -y ${YEAR} -d ${day}`,
      (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }

        const message = stdout.trim().toLowerCase();
        if (message.startsWith("that's not the right answer")) {
          return resolve(false);
        }
        if (message.startsWith("that's the right answer!")) {
          return resolve(true);
        }
        return reject(new Error(`Unknown message from AOC:\n${message}`));
      },
    ),
  );
}
