import * as Fs from 'fs';
import * as Os from 'os';

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {Point} start 
 * @param {string} directions 
 * @returns {Array<Point>}
 */
function generate_visited_points_from_instruction(start,instruction){
    const heading = instruction.substring(0,1);
    const range   = parseInt(instruction.substring(1));

    const nextPoint = get_next_point_for_heading(start,heading);

    return [
        nextPoint,
        ... range > 1 ? generate_visited_points_from_instruction(nextPoint,`${heading}${range-1}`) : []
    ];
}

/**
 * @param {Point} origin 
 * @param {string} heading 
 * 
 * @returns {Point}
 */
function get_next_point_for_heading(start,heading){
    switch(heading){
        case 'U':
            return {x: start.x, y: start.y + 1};
        case 'D':
            return {x: start.x, y: start.y - 1};
        case 'R':
            return {x: start.x + 1, y: start.y};
        case 'L':
            return {x: start.x - 1, y: start.y};
        
    }
}

/**
 * @param {Point} start 
 * @param {Array<string>} instructions 
 */
function generate_wire_points(start,instructions){
    return instructions.reduce((points,instruction) => {
            return [
                ...points,
                ...generate_visited_points_from_instruction(points[points.length-1],instruction)
            ]
        },
        [start]
    );
}

function point_equals(point1){
    return (point2) => point1.x === point2.x && point1.y === point2.y;
}

function manhattan_distance(point1,point2){
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

function compare_distance_to_reference(reference){
    return (point1,point2) => manhattan_distance(point1,reference) - manhattan_distance(point2,reference);
}

const wires = Fs.readFileSync('./3/input','utf-8')
                .split(Os.EOL)
                .map(wireDirections => wireDirections.split(','));

/** @var {Point} origin */
const origin = {x : 0, y : 0};

const wires2 = [['R75','D30','R83','U83','L12','D49','R71','U7','L72'],['U62','R66','U55','R34','D71','R55','D58','R83']];

const wiresPoints = wires2.map(instructions => generate_wire_points(origin,instructions).slice(1) /*Removes the origin from the wires points*/);

const instersections = wiresPoints[0].filter(point => wiresPoints[1].some(point_equals(point)));

const closestIntersection = instersections.sort(compare_distance_to_reference(origin))[0];

console.log(closestIntersection,manhattan_distance(origin,closestIntersection));