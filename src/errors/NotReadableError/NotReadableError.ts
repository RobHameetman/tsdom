interface NotReadableErrorConstructor {
	prototype: NotReadableError;
	new<T>(ctx: ThisType<T>, method: string, message: string): NotReadableError;
}

export const NotReadableError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'NotReadableError',
	);
} as unknown as NotReadableErrorConstructor;

export default NotReadableError;
