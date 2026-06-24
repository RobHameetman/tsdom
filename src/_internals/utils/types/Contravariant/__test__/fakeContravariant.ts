import noop from '#_internals/utils/functions/noop';

export const fakeContravariant = <T>(cb = noop as <U>(arg: T) => U) =>
	jest.fn((arg: T) => cb(arg));
