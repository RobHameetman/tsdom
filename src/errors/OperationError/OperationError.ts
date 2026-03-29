interface OperationErrorConstructor {
	prototype: OperationError;
	new<T>(ctx: ThisType<T>, method: string, message: string): OperationError;
}

export const OperationError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'OperationError',
	);
} as unknown as OperationErrorConstructor;

export default OperationError;
