interface ConstraintErrorConstructor {
	prototype: ConstraintError;
	new<T>(ctx: ThisType<T>, method: string, message: string): ConstraintError;
}

export const ConstraintError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'ConstraintError',
	);
} as unknown as ConstraintErrorConstructor;

export default ConstraintError;
