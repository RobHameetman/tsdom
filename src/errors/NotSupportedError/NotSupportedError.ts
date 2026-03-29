interface NotSupportedErrorConstructor {
	prototype: NotSupportedError;
	new<T>(ctx: ThisType<T>, method: string, message: string): NotSupportedError;
}

export const NotSupportedError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'NotSupportedError',
	);
} as unknown as NotSupportedErrorConstructor;

export default NotSupportedError;
