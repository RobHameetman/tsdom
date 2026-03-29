interface InvalidAccessErrorConstructor {
	prototype: InvalidAccessError;
	new<T>(ctx: ThisType<T>, method: string, message: string): InvalidAccessError;
}

export const InvalidAccessError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'InvalidAccessError',
	);
} as unknown as InvalidAccessErrorConstructor;

export default InvalidAccessError;
