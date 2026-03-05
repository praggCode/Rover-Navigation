const { runRover, parseInput, main } = require('./rover');

// ── parseInput tests ───────────────────────────────────────────────────────

describe('parseInput', () => {

    test('correctly parses plateau dimensions', () => {
        const { plateau } = parseInput('5 5\n1 2 N\nLMLMLMLMM');
        expect(plateau).toEqual({ x: 5, y: 5 });
    });

    test('correctly parses a single rover position and instructions', () => {
        const { rovers } = parseInput('5 5\n1 2 N\nLMLMLMLMM');
        expect(rovers[0]).toEqual({ x: 1, y: 2, facing: 'N', instructions: 'LMLMLMLMM' });
    });

    test('correctly parses multiple rovers', () => {
        const { rovers } = parseInput('5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM');
        expect(rovers).toHaveLength(2);
        expect(rovers[1]).toEqual({ x: 3, y: 3, facing: 'E', instructions: 'MMRMMRMRRM' });
    });

    test('throws error when plateau has only one value', () => {
        expect(() => parseInput('5\n1 2 N\nM')).toThrow('Invalid plateau format: expected two numbers');
    });

    test('throws error when plateau has non-numeric values', () => {
        expect(() => parseInput('A B\n1 2 N\nM')).toThrow('Invalid plateau format: coordinates must be numbers');
    });

    test('throws error on empty string input', () => {
        expect(() => parseInput('')).toThrow('Input is empty');
    });

    test('throws error on whitespace-only input', () => {
        expect(() => parseInput('   ')).toThrow('Input is empty');
    });

});

// ── runRover tests ─────────────────────────────────────────────────────────

describe('runRover', () => {
    const plateau = { x: 5, y: 5 };

    test('sample input: rover 1 → 1 3 N', () => {
        const rover = { x: 1, y: 2, facing: 'N', instructions: 'LMLMLMLMM' };
        expect(runRover(rover, plateau)).toBe('1 3 N');
    });

    test('sample input: rover 2 → 5 1 E', () => {
        const rover = { x: 3, y: 3, facing: 'E', instructions: 'MMRMMRMRRM' };
        expect(runRover(rover, plateau)).toBe('5 1 E');
    });

    test('L turns left correctly: N → W → S → E → N', () => {
        const rover = { x: 0, y: 0, facing: 'N', instructions: 'LLLL' };
        expect(runRover(rover, plateau)).toBe('0 0 N');
    });

    test('R turns right correctly: N → E → S → W → N', () => {
        const rover = { x: 0, y: 0, facing: 'N', instructions: 'RRRR' };
        expect(runRover(rover, plateau)).toBe('0 0 N');
    });

    test('moves North correctly', () => {
        const rover = { x: 0, y: 0, facing: 'N', instructions: 'MM' };
        expect(runRover(rover, plateau)).toBe('0 2 N');
    });

    test('moves East correctly', () => {
        const rover = { x: 0, y: 0, facing: 'E', instructions: 'MM' };
        expect(runRover(rover, plateau)).toBe('2 0 E');
    });

    test('moves South correctly', () => {
        const rover = { x: 0, y: 5, facing: 'S', instructions: 'MM' };
        expect(runRover(rover, plateau)).toBe('0 3 S');
    });

    test('moves West correctly', () => {
        const rover = { x: 5, y: 0, facing: 'W', instructions: 'MM' };
        expect(runRover(rover, plateau)).toBe('3 0 W');
    });

    test('no instructions returns starting position', () => {
        const rover = { x: 2, y: 3, facing: 'E', instructions: '' };
        expect(runRover(rover, plateau)).toBe('2 3 E');
    });

    test('rover at plateau boundary does not move out when turning only', () => {
        const rover = { x: 5, y: 5, facing: 'N', instructions: 'LRLR' };
        expect(runRover(rover, plateau)).toBe('5 5 N');
    });

    test('throws when rover moves out of bounds going North', () => {
        const rover = { x: 0, y: 5, facing: 'N', instructions: 'M' };
        expect(() => runRover(rover, plateau)).toThrow('Rover moved out of plateau');
    });

    test('throws when rover moves out of bounds going South', () => {
        const rover = { x: 0, y: 0, facing: 'S', instructions: 'M' };
        expect(() => runRover(rover, plateau)).toThrow('Rover moved out of plateau');
    });

    test('throws when rover moves out of bounds going East', () => {
        const rover = { x: 5, y: 0, facing: 'E', instructions: 'M' };
        expect(() => runRover(rover, plateau)).toThrow('Rover moved out of plateau');
    });

    test('throws when rover moves out of bounds going West', () => {
        const rover = { x: 0, y: 0, facing: 'W', instructions: 'M' };
        expect(() => runRover(rover, plateau)).toThrow('Rover moved out of plateau');
    });

    test('throws when rover starts outside plateau (x too large)', () => {
        const rover = { x: 6, y: 2, facing: 'N', instructions: 'M' };
        expect(() => runRover(rover, plateau)).toThrow('outside the plateau');
    });

    test('throws when rover starts outside plateau (negative coordinates)', () => {
        const rover = { x: -1, y: 2, facing: 'N', instructions: 'M' };
        expect(() => runRover(rover, plateau)).toThrow('outside the plateau');
    });

    test('throws when rover has invalid facing direction', () => {
        const rover = { x: 1, y: 2, facing: 'X', instructions: 'M' };
        expect(() => runRover(rover, plateau)).toThrow('Invalid facing direction: X');
    });

    test('throws when instruction line is missing (undefined)', () => {
        const rover = { x: 1, y: 2, facing: 'N', instructions: undefined };
        expect(() => runRover(rover, plateau)).toThrow('Missing instruction line for rover');
    });

    test('throws on lowercase command l', () => {
        const rover = { x: 1, y: 2, facing: 'N', instructions: 'lmlm' };
        expect(() => runRover(rover, plateau)).toThrow('Invalid command: l');
    });

    test('throws on lowercase command m', () => {
        const rover = { x: 1, y: 2, facing: 'N', instructions: 'm' };
        expect(() => runRover(rover, plateau)).toThrow('Invalid command: m');
    });

    test('throws error on invalid uppercase command', () => {
        const rover = { x: 1, y: 1, facing: 'N', instructions: 'X' };
        expect(() => runRover(rover, plateau)).toThrow('Invalid command: X');
    });

});

// ── main (full input/output) tests ─────────────────────────────────────────

describe('main', () => {

    test('sample input produces correct output', () => {
        const input = `5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM`;
        expect(main(input)).toBe('1 3 N\n5 1 E');
    });

    test('single rover works correctly', () => {
        const input = `5 5\n0 0 N\nMM`;
        expect(main(input)).toBe('0 2 N');
    });

    test('throws on empty input via main', () => {
        expect(() => main('')).toThrow('Input is empty');
    });

});