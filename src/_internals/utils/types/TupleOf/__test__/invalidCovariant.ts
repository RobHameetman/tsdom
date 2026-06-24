import noop from '#_internals/utils/functions/noop';

export const invalidCovariant =
	<T>(_: T) =>
	(..._args: ReadonlyArray<unknown>) =>
		jest.fn().mockReturnValue(undefined);
