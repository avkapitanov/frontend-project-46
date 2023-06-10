#!/usr/bin/env node
import { Command } from 'commander';
import generateDiff from '../src/main.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('filepath1', 'First filepath to compare')
  .argument('filepath2', 'Second filepath to compare')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const { format } = options;

    console.log(generateDiff(filepath1, filepath2, format));
  });

program.parse();
