interface NamespaceErrorConstructor {
	prototype: NamespaceError;
	new<T>(ctx: ThisType<T>, method: string, message: string): NamespaceError;
}

export const NamespaceError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'NamespaceError',
	);
} as unknown as NamespaceErrorConstructor;

export default NamespaceError;
