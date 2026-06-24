export const fakeCovariant = <T>(value: T | ((...args: ReadonlyArray<unknown>) => T), ...args: ReadonlyArray<unknown>) =>
	jest.fn().mockReturnValue(typeof value === 'function' ? (value as (...args: ReadonlyArray<unknown>) => T)(...args) : value);
