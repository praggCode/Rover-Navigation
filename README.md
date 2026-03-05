# Rover Navigation

A solution to the ISRO Rover Navigation problem — simulates robotic rovers moving on a rectangular plateau based on command instructions.

## Problem

Rovers are placed on a grid and given a series of commands:
- `L` — rotate 90° left
- `R` — rotate 90° right
- `M` — move forward one grid point

Given a starting position and instructions, the program outputs each rover's final position and heading.

## Example

**Input:**
```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```

**Output:**
```
1 3 N
5 1 E
```

## Getting Started

**Install dependencies:**
```bash
npm install
```

**Run with an input file:**
```bash
node rover.js < input.txt
```

**Run tests:**
```bash
npm test
```

## Project Structure

```
├── rover.js          # Core logic
├── rover.test.js     # Jest test suite (31 tests)
├── input.txt         # Sample input
└── README.md
```

## What's Tested

- Input parsing and validation
- Rover movement in all 4 directions
- Left and right rotation
- Boundary protection
- Invalid commands, facing directions, and malformed input
- Full integration with sample input

## Test Coverage

```
File      | % Stmts | % Branch | % Funcs | % Lines
rover.js  |  93.44  |  93.47   |   100   |  92.72
```
