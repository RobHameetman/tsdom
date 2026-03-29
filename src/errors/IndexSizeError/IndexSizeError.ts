interface IndexSizeErrorConstructor {
	prototype: IndexSizeError;
	new<T>(ctx: ThisType<T>, method: string, message: string): IndexSizeError;
}

export const IndexSizeError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'IndexSizeError',
	);
} as unknown as IndexSizeErrorConstructor;

export default IndexSizeError;
