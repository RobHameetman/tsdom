interface NotFoundErrorConstructor {
	prototype: NotFoundError;
	new<T>(ctx: ThisType<T>, method: string, message: string): NotFoundError;
}

export const NotFoundError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'NotFoundError',
	);
} as unknown as NotFoundErrorConstructor;

export default NotFoundError;
