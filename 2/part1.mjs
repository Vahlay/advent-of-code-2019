import * as Fs from 'fs';
import * as Os from 'os';

/**
 * Execute an OPcode on 2 values and return the result
 * 
 * @param {number} opcode 
 * @param {number} input1 
 * @param {number} input2
 * 
 * @returns {number|null}
 */
function parse_opcode(opcode,input1,input2){
    switch(opcode){
        case 1:
            return input1 + input2
        case 2:
            return input1 * input2
        default:
            throw new Error(`Unknown OPCode ${opcode}`);
    }
}

/**
 * @param {Array<number>} program 
 * @param {number} parseAddress 
 * 
 * @returns {Array<number>|null} The state of the program after executing the instruction or null if the instruction was the end of the program
 */
function parse_intcode_instruction(program,parseAddress){
    const [opcode,input1Addr,input2Addr,outputAddr] = program.slice(parseAddress,parseAddress + 4);
    return opcode !== 99 ?
        program.map((token,address) => address === outputAddr ? parse_opcode(opcode,program[input1Addr],program[input2Addr]) : token) :
        null;
}

/**
 * @param {Array<number>} program 
 * @param {number} address
 * 
 * @returns {Array<number>} The result of executing the program from the given address
 */
function run_intcode(program,address = 0){
    const instructionResult = parse_intcode_instruction(program,address);
    return instructionResult !== null ? run_intcode(instructionResult,address + 4) : program;
}


const program = Fs.readFileSync('./2/input','utf-8')
                .split(',')
                .map(numAsStr => parseInt(numAsStr)) //Directly passing parseInt to map() causes some of the number to be parsed as NaN

program[1] = 12;
program[2] = 2;

console.log(run_intcode(program)[0]);