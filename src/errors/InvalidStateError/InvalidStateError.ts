interface InvalidStateErrorConstructor {
	prototype: InvalidStateError;
	new<T>(ctx: ThisType<T>, method: string, message: string): InvalidStateError;
}

export const InvalidStateError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'InvalidStateError',
	);
} as unknown as InvalidStateErrorConstructor;

export default InvalidStateError;
