interface TransactionInactiveErrorConstructor {
	prototype: TransactionInactiveError;
	new<T>(ctx: ThisType<T>, method: string, message: string): TransactionInactiveError;
}

export const TransactionInactiveError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'TransactionInactiveError',
	);
} as unknown as TransactionInactiveErrorConstructor;

export default TransactionInactiveError;
