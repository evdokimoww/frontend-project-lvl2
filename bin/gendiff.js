#!/usr/bin/env node
import { Command } from 'commander';
// eslint-disable-next-line import/extensions
import genDiff from '../diff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)));

program.parse();