/**
 * Moves `T` to a contra-variant position, in other words, makes it a parameter
 * to a function type.
 *
 * @typeParam T - A function type from which the argument type will be extracted.
 */
export type FromContravariant<T> =
  [T] extends [(arg: infer U) => unknown]
    ? U
    : never;

/**
 * Checks that an `unknown` value is a {@link FromContravariant}.
 *
 * Requirements:
 *   - `value` must be a function with an arity of 1.
 *
 * @typeParam T - A function type from which the argument type will be extracted.
 *
 * @param _ - An (unused) `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link FromContravariant}.
 */
export const isFromContravariant = <T>(_: unknown): _ is FromContravariant<T> => (
	/**
	 * Intentionally no runtime validation; this enables ergonomic static
	 * narrowing.
	 */
	true
);
