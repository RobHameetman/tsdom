/**
 * Moves `T` to a contra-variant position, in other words, makes it a parameter
 * to a function type.
 *
 * @typeParam T - The (compile-time) parameter type the contra-variant function
 * accepts.
 */
export type Contravariant<T> =
  T extends unknown
    ? (arg: T) => unknown
    : never;

/**
 * Checks that an `unknown` value is a {@link Contravariant}.
 *
 * Requirements:
 *   - `value` must be a function with an arity of 1.
 *
 * @typeParam T - The (compile-time) parameter type the contra-variant function
 * accepts.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Contravariant}.
 */
export const isContravariant = <T>(value: unknown): value is Contravariant<T> => (
	/**
	 * value
	 */
	typeof value === 'function' &&
	value.length === 1
);
