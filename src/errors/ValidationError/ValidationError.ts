interface ValidationErrorConstructor {
	prototype: ValidationError;
	new<T>(ctx: ThisType<T>, method: string, message: string): ValidationError;
}

export const ValidationError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'ValidationError',
	);
} as unknown as ValidationErrorConstructor;

export default ValidationError;
