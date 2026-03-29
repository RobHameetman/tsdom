interface AbortErrorConstructor {
	prototype: AbortError;
	new<T>(ctx: ThisType<T>, method: string, message: string): AbortError;
}

export const AbortError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	DOMException.call(
		this,
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'AbortError',
	);

	Object.setPrototypeOf(this, DOMException.prototype);

	return this;
} as unknown as AbortErrorConstructor;

export default AbortError;
