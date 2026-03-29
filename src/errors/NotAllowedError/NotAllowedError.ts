interface NotAllowedErrorConstructor {
	prototype: NotAllowedError;
	new<T>(ctx: ThisType<T>, method: string, message: string): NotAllowedError;
}

export const NotAllowedError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'NotAllowedError',
	);
} as unknown as NotAllowedErrorConstructor;

export default NotAllowedError;
