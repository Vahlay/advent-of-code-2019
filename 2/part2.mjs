import * as Fs from 'fs';
import {run_intcode} from './part1.mjs';

/**
 * @param {Array<number>} program 
 * @param {number} noun 
 * @param {number} verb 
 */
function run_program_with_noun_and_verb(program,noun,verb){
    const initialMemory = [
        ...program.slice(0,1),
        noun,
        verb,
        ...program.slice(3)
    ]
    
    return run_intcode(initialMemory)[0];
}

const program = Fs.readFileSync('./2/input','utf-8')
                .split(',')
                .map(numAsStr => parseInt(numAsStr)); //Directly passing parseInt to map() causes some of the number to be parsed as NaN

const range = [...Array(100).keys()];
/** @var {Array<Array<number>>} combinations */
const combinations = range.map(noun => range.map(verb => [noun,verb])).flat();
const expectedResult = 19690720;


const expectedCombination = combinations.find((combination) => {
    const [noun,verb] = combination;
    return run_program_with_noun_and_verb(program,noun,verb) === expectedResult;
})

console.log("Day 2 Step 2 answer : ",expectedCombination[0]*100 + expectedCombination[1]);