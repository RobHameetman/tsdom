interface SyntaxErrorConstructor {
	prototype: SyntaxError;
	new<T>(ctx: ThisType<T>, method: string, message: string): SyntaxError;
}

export const SyntaxError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'SyntaxError',
	);
} as unknown as SyntaxErrorConstructor;

export default SyntaxError;
