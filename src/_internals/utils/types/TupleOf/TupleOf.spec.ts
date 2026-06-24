import { isTupleOf } from './TupleOf';
import { fakeCovariant, invalidCovariant } from './__test__';

const isT = (value: unknown): value is string => typeof value === 'string';

describe('isTupleOf()', () => {
  it('should return true given a valid Covariant', () => {
    expect(isTupleOf(fakeCovariant('test'), isT)).toBe(true);
  });

  it('should return false given an invalid Covariant', () => {
    expect(isTupleOf(invalidCovariant('test'), isT)).toBe(false);
  });
});
