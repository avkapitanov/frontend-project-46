#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('filepath1', 'First filepath to compare')
  .argument('filepath2', 'Second filepath to compare')
  .action((filepath1, filepath2) => {
    console.log(filepath1);
    console.log(filepath2);
  });

program.parse();
