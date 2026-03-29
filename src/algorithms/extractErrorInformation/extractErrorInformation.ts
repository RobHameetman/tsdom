/**
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#extract-error
 *
 * @param exception - The exception to extract information from.
 *
 * @returns A {@link Map} of error information attributes.
 */
export const extractErrorInformation = (exception: unknown) => {
	const attributes = new Map<string, unknown>();

	attributes.set('error', exception);
	attributes.set('message', (exception as Error).message);
	attributes.set('filename', (exception as Error).fileName);
	attributes.set('lineno', (exception as Error).lineNumber);
	attributes.set('colno', (exception as Error).columnNumber);

	return attributes;
};

export default extractErrorInformation;
