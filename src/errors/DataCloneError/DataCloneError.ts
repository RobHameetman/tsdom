interface DataCloneErrorConstructor {
	prototype: DataCloneError;
	new<T>(ctx: ThisType<T>, method: string, message: string): DataCloneError;
}

export const DataCloneError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'DataCloneError',
	);
} as unknown as DataCloneErrorConstructor;

export default DataCloneError;
