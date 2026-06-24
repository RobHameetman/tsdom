import { isOneOf } from './OneOf';
import { fakeCovariant, invalidCovariant } from './__test__';

const isT = (value: unknown): value is string => typeof value === 'string';

describe('isOneOf()', () => {
  it('should return true given a valid Covariant', () => {
    expect(isOneOf(fakeCovariant('test'), isT)).toBe(true);
  });

  it('should return false given an invalid Covariant', () => {
    expect(isOneOf(invalidCovariant('test'), isT)).toBe(false);
  });
});
