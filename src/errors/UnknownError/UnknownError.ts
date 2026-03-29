interface UnknownErrorConstructor {
	prototype: UnknownError;
	new<T>(ctx: ThisType<T>, method: string, message: string): UnknownError;
}

export const UnknownError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'UnknownError',
	);
} as unknown as UnknownErrorConstructor;

export default UnknownError;
