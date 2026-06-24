import type { Contravariant } from '../../Contravariant';

export const fakeFromContravariant = <T>(value: Contravariant<T>, t: T) =>
	jest.fn().mockImplementation(value).mockReturnValue(t);
