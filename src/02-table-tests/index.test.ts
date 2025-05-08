// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
];

describe('simpleCalculator - table tests', () => {
  test.each(testCases)(
    'should return $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: '%' });
    expect(result).toBeNull();
  });

  test('should return null for invalid a or b', () => {
    expect(simpleCalculator({ a: 'x', b: 2, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: 1, b: null, action: Action.Subtract }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: {}, b: [], action: Action.Multiply }),
    ).toBeNull();
  });
});
