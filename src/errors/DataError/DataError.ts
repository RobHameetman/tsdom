interface DataErrorConstructor {
	prototype: DataError;
	new<T>(ctx: ThisType<T>, method: string, message: string): DataError;
}

export const DataError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'DataError',
	);
} as unknown as DataErrorConstructor;

export default DataError;
