import { rs } from '@rstest/core';
import type { Contravariant } from '../../Contravariant';

export const fakeFromContravariant = <T>(value: Contravariant<T>, t: T) =>
	rs.fn().mockImplementation(value).mockReturnValue(t);
