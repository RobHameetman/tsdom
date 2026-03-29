interface EncodingErrorConstructor {
	prototype: EncodingError;
	new<T>(ctx: ThisType<T>, method: string, message: string): EncodingError;
}

export const EncodingError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'EncodingError',
	);
} as unknown as EncodingErrorConstructor;

export default EncodingError;
