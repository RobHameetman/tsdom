interface DOMStringSizeErrorConstructor {
	prototype: DOMStringSizeError;
	new<T>(ctx: ThisType<T>, method: string, message: string): DOMStringSizeError;
}

export const DOMStringSizeError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'DOMStringSizeError',
	);
} as unknown as DOMStringSizeErrorConstructor;

export default DOMStringSizeError;
