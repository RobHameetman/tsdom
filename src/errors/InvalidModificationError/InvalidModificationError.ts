interface InvalidModificationErrorConstructor {
	prototype: InvalidModificationError;
	new<T>(ctx: ThisType<T>, method: string, message: string): InvalidModificationError;
}

export const InvalidModificationError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'InvalidModificationError',
	);
} as unknown as InvalidModificationErrorConstructor;

export default InvalidModificationError;
