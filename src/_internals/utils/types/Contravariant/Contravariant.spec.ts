import { isContravariant } from './Contravariant';
import { fakeContravariant, invalidContravariant } from './__test__';

describe('isContravariant()', () => {
  it('should return true given a valid Contravariant', () => {
    expect(isContravariant(fakeContravariant())).toBe(true);
  });

  it('should return false given an invalid Contravariant', () => {
    expect(isContravariant(invalidContravariant())).toBe(false);
  });
});
