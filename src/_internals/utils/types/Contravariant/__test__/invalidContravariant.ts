import noop from '#_internals/utils/functions/noop';

export const invalidContravariant = () => (arg1: unknown, arg2: unknown) =>
	jest.fn(() => noop(arg1, arg2));
