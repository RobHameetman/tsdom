interface SecurityErrorConstructor {
	prototype: SecurityError;
	new<T>(ctx: ThisType<T>, method: string, message: string): SecurityError;
}

export const SecurityError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'SecurityError',
	);
} as unknown as SecurityErrorConstructor;

export default SecurityError;
