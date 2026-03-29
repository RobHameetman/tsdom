interface HierarchyRequestErrorConstructor {
	prototype: HierarchyRequestError;
	new<T>(ctx: ThisType<T>, method: string, message: string): HierarchyRequestError;
}

export const HierarchyRequestError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'HierarchyRequestError',
	);
} as unknown as HierarchyRequestErrorConstructor;

export default HierarchyRequestError;
