import { isFromContravariant } from './FromContravariant';
import { fakeFromContravariant } from './__test__';
import { fakeContravariant } from '../Contravariant/__test__';

describe('isFromContravariant()', () => {
  it('should return true', () => {
    expect(isFromContravariant(fakeFromContravariant(fakeContravariant(<U>(_: 'test') => undefined as U), 'test'))).toBe(true);
  });
});
