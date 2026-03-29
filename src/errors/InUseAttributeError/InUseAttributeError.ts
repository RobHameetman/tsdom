interface InUseAttributeErrorConstructor {
	prototype: InUseAttributeError;
	new<T>(ctx: ThisType<T>, method: string, message: string): InUseAttributeError;
}

export const InUseAttributeError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'InUseAttributeError',
	);
} as unknown as InUseAttributeErrorConstructor;

export default InUseAttributeError;
