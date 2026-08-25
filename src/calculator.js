#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting only:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*)
 * - division (/)
 *
 * Usage:
 *   node src/calculator.js <operation> <first-number> <second-number>
 *   node src/calculator.js add 2 3
 *   node src/calculator.js + 2 3
 */

const OPERATIONS = {
  add: (left, right) => left + right,
  '+': (left, right) => left + right,
  subtract: (left, right) => left - right,
  '-': (left, right) => left - right,
  multiply: (left, right) => left * right,
  '*': (left, right) => left * right,
  divide: (left, right) => {
    if (right === 0) {
      throw new Error('Cannot divide by zero.');
    }

    return left / right;
  },
  '/': (left, right) => {
    if (right === 0) {
      throw new Error('Cannot divide by zero.');
    }

    return left / right;
  },
};

function calculate(operation, left, right) {
  const calculateOperation = OPERATIONS[operation.toLowerCase()];

  if (!calculateOperation) {
    throw new Error('Unsupported operation. Use +, -, *, /, or their names.');
  }

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('Both operands must be valid numbers.');
  }

  return calculateOperation(left, right);
}

function printUsage() {
  console.error(
    'Usage: node src/calculator.js <operation> <first-number> <second-number>',
  );
}

function main() {
  const [operation, leftInput, rightInput] = process.argv.slice(2);

  if (!operation || leftInput === undefined || rightInput === undefined) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(
      operation,
      Number(leftInput),
      Number(rightInput),
    );
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { calculate };
