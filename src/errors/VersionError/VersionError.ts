interface VersionErrorConstructor {
	prototype: VersionError;
	new<T>(ctx: ThisType<T>, method: string, message: string): VersionError;
}

export const VersionError = function<T>(
	ctx: ThisType<T>,
	method: string,
	message: string
) {
	return new DOMException(
		`Failed to execute '${method}' on '${ctx.constructor.name}': ${message}`,
		'VersionError',
	);
} as unknown as VersionErrorConstructor;

export default VersionError;
