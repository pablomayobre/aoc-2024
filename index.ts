import { program } from '@commander-js/extra-typings';
import { createChallengeDirectory, executeDay } from './wrapper.ts';

program
  .command('init')
  .argument('<day>', 'The day you want to scaffold')
  .option('-b', 'If you want to only scaffold part 2 of the problem')
  .action((day, option) => {
    createChallengeDirectory(parseInt(day.trim()), option.b ? 'B' : 'A');
  });

program
  .command('exec')
  .argument('<day>', 'The day you want to execute')
  .argument('<challenge>', 'The challenge you want to execute (A or B)')
  .option('-s, --sample', 'Use sample data')
  .option('-n, --dont-submit', 'Do not upload answer')

  .action((day, challenge, option, command) => {
    const ch = challenge.toUpperCase().trim();

    if (ch !== 'A' && ch !== 'B') {
      throw new Error(
        `Challenge must be either A or B you passed: ${challenge}`,
      );
    }

    executeDay(
      parseInt(day.trim()),
      ch as 'A' | 'B',
      option.sample,
      option.dontSubmit,
    );
  });

program.parse(process.argv);
