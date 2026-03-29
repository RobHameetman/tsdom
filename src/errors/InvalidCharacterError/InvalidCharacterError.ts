interface InvalidCharacterErrorConstructor {
	prototype: InvalidCharacterError;
	new<T>(ctx: ThisType<T>, method: string, message: string): InvalidCharacterError;
}

export const InvalidCharacterError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'InvalidCharacterError',
	);
} as unknown as InvalidCharacterErrorConstructor;

export default InvalidCharacterError;
