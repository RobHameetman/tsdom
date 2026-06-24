import { rs } from '@rstest/core';
import noop from '#_internals/utils/functions/noop';

export const fakeContravariant = <T>(cb = noop as <U>(arg: T) => U) =>
	rs.fn((arg: T) => cb(arg));
