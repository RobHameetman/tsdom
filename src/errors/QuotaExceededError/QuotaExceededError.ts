interface QuotaExceededErrorConstructor {
	prototype: QuotaExceededError;
	new<T>(ctx: ThisType<T>, method: string, message: string): QuotaExceededError;
}

export const QuotaExceededError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'QuotaExceededError',
	);
} as unknown as QuotaExceededErrorConstructor;

export default QuotaExceededError;
