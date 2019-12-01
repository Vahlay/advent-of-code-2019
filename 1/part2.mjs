import * as Fs from 'fs';
import * as Os from 'os';


function get_needed_fuel(mass){
    return Math.floor(mass/3) - 2;
}

/**
 * Recursively add all the fuel needed to carry a certain mass of fuel
 * @param fuelMass 
 */
function add_fuel_for_fuel(fuelMass){
    return get_needed_fuel(fuelMass) > 0 ?
        fuelMass + add_fuel_for_fuel(get_needed_fuel(fuelMass)) :
        fuelMass;
}

const totalFuel = Fs.readFileSync('./1/input','utf-8')
                    .split(Os.EOL)
                    .map(numAsStr => parseInt(numAsStr)) //Directly passing parseInt to map() causes some of the number to be parsed as NaN
                    .map(get_needed_fuel)
                    .map(add_fuel_for_fuel)
                    .reduce((totalFuel,moduleFuel) => totalFuel + moduleFuel);

console.log(totalFuel);
