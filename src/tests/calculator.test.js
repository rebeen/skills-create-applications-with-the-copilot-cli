const {
  calculate,
  modulo,
  power,
  squareRoot,
} = require('../calculator');

describe('calculator', () => {
  describe('addition', () => {
    test('adds the example values 2 and 3', () => {
      expect(calculate('+', 2, 3)).toBe(5);
    });

    test('supports the named operation', () => {
      expect(calculate('add', 10, -4)).toBe(6);
    });

    test('handles decimals and zero', () => {
      expect(calculate('add', 0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('subtraction', () => {
    test('subtracts the example values 10 and 4', () => {
      expect(calculate('-', 10, 4)).toBe(6);
    });

    test('supports the named operation and negative results', () => {
      expect(calculate('subtract', 4, 10)).toBe(-6);
    });
  });

  describe('multiplication', () => {
    test('multiplies the example values 45 and 2', () => {
      expect(calculate('*', 45, 2)).toBe(90);
    });

    test('supports the named operation and zero', () => {
      expect(calculate('multiply', 7, 0)).toBe(0);
    });
  });

  describe('division', () => {
    test('divides the example values 20 and 5', () => {
      expect(calculate('/', 20, 5)).toBe(4);
    });

    test('supports the named operation and fractional results', () => {
      expect(calculate('divide', 5, 2)).toBe(2.5);
    });

    test('rejects division by zero', () => {
      expect(() => calculate('/', 10, 0)).toThrow('Cannot divide by zero.');
    });
  });

  describe('modulo', () => {
    test('returns the remainder from the example values 5 and 2', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('supports modulo through calculate', () => {
      expect(calculate('%', 10, 4)).toBe(2);
    });

    test('rejects a zero divisor', () => {
      expect(() => modulo(10, 0)).toThrow('Cannot take modulo by zero.');
    });
  });

  describe('power', () => {
    test('raises the example base 2 to the exponent 3', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('supports power through calculate', () => {
      expect(calculate('^', 3, 2)).toBe(9);
    });
  });

  describe('square root', () => {
    test('returns the square root from the example value 16', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('supports square root through calculate', () => {
      expect(calculate('sqrt', 2)).toBeCloseTo(Math.sqrt(2));
    });

    test('rejects negative numbers', () => {
      expect(() => squareRoot(-1)).toThrow(
        'Cannot take the square root of a negative number.',
      );
    });
  });

  describe('validation', () => {
    test('rejects unsupported operations', () => {
      expect(() => calculate('log', 10, 2)).toThrow(
        'Unsupported operation. Use +, -, *, /, %, ^, sqrt, or their names.',
      );
    });

    test('accepts operation names regardless of case', () => {
      expect(calculate('MuLtIpLy', 3, 4)).toBe(12);
    });

    test.each([
      [Number.NaN, 2],
      [2, Number.NaN],
      [Number.POSITIVE_INFINITY, 2],
      [2, Number.NEGATIVE_INFINITY],
    ])('rejects non-finite operands: %p and %p', (left, right) => {
      expect(() => calculate('add', left, right)).toThrow(
        'Operands must be valid numbers.',
      );
    });
  });
});
