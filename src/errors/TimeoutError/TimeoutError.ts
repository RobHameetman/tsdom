interface TimeoutErrorConstructor {
	prototype: TimeoutError;
	new<T>(ctx: ThisType<T>, method: string, message: string): TimeoutError;
}

export const TimeoutError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'TimeoutError',
	);
} as unknown as TimeoutErrorConstructor;

export default TimeoutError;
