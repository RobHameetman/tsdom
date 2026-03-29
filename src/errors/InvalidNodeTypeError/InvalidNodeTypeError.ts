interface InvalidNodeTypeErrorConstructor {
	prototype: InvalidNodeTypeError;
	new<T>(ctx: ThisType<T>, method: string, message: string): InvalidNodeTypeError;
}

export const InvalidNodeTypeError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'InvalidNodeTypeError',
	);
} as unknown as InvalidNodeTypeErrorConstructor;

export default InvalidNodeTypeError;
