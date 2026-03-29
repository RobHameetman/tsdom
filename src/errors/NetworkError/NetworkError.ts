interface NetworkErrorConstructor {
	prototype: NetworkError;
	new<T>(ctx: ThisType<T>, method: string, message: string): NetworkError;
}

export const NetworkError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'NetworkError',
	);
} as unknown as NetworkErrorConstructor;

export default NetworkError;
