interface NoModificationAllowedErrorConstructor {
	prototype: NoModificationAllowedError;
	new<T>(ctx: ThisType<T>, method: string, message: string): NoModificationAllowedError;
}

export const NoModificationAllowedError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'NoModificationAllowedError',
	);
} as unknown as NoModificationAllowedErrorConstructor;

export default NoModificationAllowedError;
