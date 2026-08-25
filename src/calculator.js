#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting only:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*)
 * - division (/)
 * - modulo (%)
 * - exponentiation (power, ^)
 * - square root (sqrt)
 *
 * Usage:
 *   node src/calculator.js <operation> <first-number> [second-number]
 *   node src/calculator.js add 2 3
 *   node src/calculator.js + 2 3
 *   node src/calculator.js sqrt 9
 */

function modulo(left, right) {
  if (right === 0) {
    throw new Error('Cannot take modulo by zero.');
  }

  return left % right;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(number) {
  if (number < 0) {
    throw new Error('Cannot take the square root of a negative number.');
  }

  return Math.sqrt(number);
}

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
  modulo,
  '%': modulo,
  power,
  '^': power,
  '**': power,
  sqrt: squareRoot,
  'square-root': squareRoot,
};

function calculate(operation, left, right) {
  const calculateOperation = OPERATIONS[operation.toLowerCase()];

  if (!calculateOperation) {
    throw new Error(
      'Unsupported operation. Use +, -, *, /, %, ^, sqrt, or their names.',
    );
  }

  if (!Number.isFinite(left)) {
    throw new Error('Operands must be valid numbers.');
  }

  const isSquareRoot = operation.toLowerCase() === 'sqrt'
    || operation.toLowerCase() === 'square-root';
  if (isSquareRoot) {
    return calculateOperation(left);
  }

  if (!Number.isFinite(right)) {
    throw new Error('Operands must be valid numbers.');
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
  const normalizedOperation = operation && operation.toLowerCase();
  const isSquareRoot = normalizedOperation === 'sqrt'
    || normalizedOperation === 'square-root';

  if (
    !operation
    || leftInput === undefined
    || (!isSquareRoot && rightInput === undefined)
  ) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(
      operation,
      Number(leftInput),
      isSquareRoot ? undefined : Number(rightInput),
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

module.exports = { calculate, modulo, power, squareRoot };
