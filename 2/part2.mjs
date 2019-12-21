import * as Fs from 'fs';
import {run_intcode} from './part1.mjs';

const program = Fs.readFileSync('./2/input','utf-8')
                .split(',')
                .map(numAsStr => parseInt(numAsStr)) //Directly passing parseInt to map() causes some of the number to be parsed as NaN

program[1] = 12;
program[2] = 2;

console.log(run_intcode(program)[0]);