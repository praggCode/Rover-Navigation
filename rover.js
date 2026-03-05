const directions = ['N', 'E', 'S', 'W'];

function turnLeft(facing) {
    return directions[(directions.indexOf(facing) + 3) % 4];
}

function turnRight(facing) {
    return directions[(directions.indexOf(facing) + 1) % 4];
}

function moveForward(x, y, facing, plateau) {
    if (facing === 'N') y++;
    else if (facing === 'E') x++;
    else if (facing === 'S') y--;
    else if (facing === 'W') x--;

    if (x < 0 || x > plateau.x || y < 0 || y > plateau.y) {
        throw new Error('Rover moved out of plateau');
    }

    return { x, y };
}

function runRover(rover, plateau) {
    let { x, y, facing, instructions } = rover;
    if (x < 0 || x > plateau.x || y < 0 || y > plateau.y) {
        throw new Error(`Rover starting position (${x}, ${y}) is outside the plateau`);
    }
    if (!directions.includes(facing)) {
        throw new Error(`Invalid facing direction: ${facing}`);
    }
    if (instructions === undefined || instructions === null) {
        throw new Error('Missing instruction line for rover');
    }

    for (const cmd of instructions) {
        if (cmd === 'L') {
            facing = turnLeft(facing);
        } else if (cmd === 'R') {
            facing = turnRight(facing);
        } else if (cmd === 'M') {
            const pos = moveForward(x, y, facing, plateau);
            x = pos.x;
            y = pos.y;
        } else {
            throw new Error(`Invalid command: ${cmd}`);
        }
    }

    return `${x} ${y} ${facing}`;
}

function parseInput(input) {
    if (!input || !input.trim()) {
        throw new Error('Input is empty');
    }

    const lines = input.trim().split('\n');
    const plateauParts = lines[0].trim().split(' ');
    if (plateauParts.length !== 2) {
        throw new Error('Invalid plateau format: expected two numbers');
    }

    const [px, py] = plateauParts.map(Number);
    if (isNaN(px) || isNaN(py)) {
        throw new Error('Invalid plateau format: coordinates must be numbers');
    }

    const plateau = { x: px, y: py };
    const rovers = [];

    for (let i = 1; i < lines.length; i += 2) {
        const parts = lines[i].trim().split(' ');
        const [x, y, facing] = parts;
        if (lines[i + 1] === undefined) {
            throw new Error('Missing instruction line for rover');
        }

        const instructions = lines[i + 1];
        rovers.push({
            x: Number(x),
            y: Number(y),
            facing,
            instructions
        });
    }

    return { plateau, rovers };
}

function main(input) {
    const { plateau, rovers } = parseInput(input);
    const results = rovers.map(rover => runRover(rover, plateau));
    return results.join('\n');
}

if (require.main === module) {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8');
    console.log(main(input));
}

module.exports = { runRover, parseInput, main };