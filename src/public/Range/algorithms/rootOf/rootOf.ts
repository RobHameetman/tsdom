/**
 * Gets the root of a live {@link Range}.
 *
 * @see https://dom.spec.whatwg.org/#concept-range-root
 *
 * @param range - A {@link Range} instance.
 *
 * @returns The root of the range's start node.
 */
export const rootOf = (range: Range) =>
	range.startContainer.getRootNode() as Node;

export default rootOf;
