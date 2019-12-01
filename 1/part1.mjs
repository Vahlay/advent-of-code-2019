import * as Fs from 'fs';
import * as Os from 'os';


function get_module_needed_fuel(mass){
    return Math.floor(mass/3) - 2;
}

let fuelNeeded = Fs.readFileSync('./input','utf-8')
                    .split(Os.EOL)
                    .map(numAsStr => parseInt(numAsStr)) //Directly passing parseInt to map() causes some of the number to be parsed as NaN
                    .map(get_module_needed_fuel)
                    .reduce((totalFuel,moduleFuel) => totalFuel + moduleFuel);

console.log(fuelNeeded);
