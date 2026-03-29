interface WrongDocumentErrorConstructor {
	prototype: WrongDocumentError;
	new<T>(ctx: ThisType<T>, method: string, message: string): WrongDocumentError;
}

export const WrongDocumentError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'WrongDocumentError',
	);
} as unknown as WrongDocumentErrorConstructor;

export default WrongDocumentError;
