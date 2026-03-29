
/**
 * Checks that an `unknown` value is a valid {@link DataTransfer}.
 *
 * Requirements:
 *   - `value` must be a valid instance of {@link DataTransfer} or an object
 *     with all the properties and methods of a {@link DataTransfer}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link DataTransfer}.
 */
export const isFocused = ($this: Node) =>
	$this.isSameNode($this.ownerDocument?.activeElement || null);

export default isFocused;
