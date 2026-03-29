interface TypeMismatchErrorConstructor {
	prototype: TypeMismatchError;
	new<T>(ctx: ThisType<T>, method: string, message: string): TypeMismatchError;
}

export const TypeMismatchError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'TypeMismatchError',
	);
} as unknown as TypeMismatchErrorConstructor;

export default TypeMismatchError;
