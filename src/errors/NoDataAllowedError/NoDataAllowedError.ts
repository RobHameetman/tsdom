interface NoDataAllowedErrorConstructor {
	prototype: NoDataAllowedError;
	new<T>(ctx: ThisType<T>, method: string, message: string): NoDataAllowedError;
}

export const NoDataAllowedError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'NoDataAllowedError',
	);
} as unknown as NoDataAllowedErrorConstructor;

export default NoDataAllowedError;
