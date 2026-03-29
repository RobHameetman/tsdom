interface ReadOnlyErrorConstructor {
	prototype: ReadOnlyError;
	new<T>(ctx: ThisType<T>, method: string, message: string): ReadOnlyError;
}

export const ReadOnlyError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'ReadOnlyError',
	);
} as unknown as ReadOnlyErrorConstructor;

export default ReadOnlyError;
