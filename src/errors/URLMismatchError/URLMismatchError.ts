interface URLMismatchErrorConstructor {
	prototype: URLMismatchError;
	new<T>(ctx: ThisType<T>, method: string, message: string): URLMismatchError;
}

export const URLMismatchError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'URLMismatchError',
	);
} as unknown as URLMismatchErrorConstructor;

export default URLMismatchError;
