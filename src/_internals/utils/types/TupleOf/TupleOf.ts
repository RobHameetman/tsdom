import { type OneOf } from '#_internals/utils/types/OneOf';
/**
 * Narrows a value to a single constituent of a union type `T` using double
 * contravariant extraction.
 *
 * @typeParam T - A union type whose members are turned into a tuple.
 */
export type TupleOf<T> =
	OneOf<T> extends infer U
		? Exclude<T, U> extends never
			? [T]
			: [...TupleOf<Exclude<T, U>>, U]
		: never;

/**
 * Checks that an `unknown` value is a {@link TupleOf}.
 *
 * Requirements:
 *   - `value` must be a function with an arity of 1.
 *
 * @typeParam T - A union type whose members are turned into a tuple.
 *
 * @param value - An `unknown` value.
 * @param predicate - [Optional] A type guard that can be used to validate the selected member.
 * @param expectedLength - [Optional] An expected length of the tuple.
 *
 * @returns The determination that `value` is or is not a {@link TupleOf}.
 */
export const isTupleOf = <T>(
	value: unknown,
	predicate?: (v: unknown) => v is OneOf<T>,
	expectedLength?: number,
): value is TupleOf<T> => {
	if (!Array.isArray(value)) {
		return false;
	}

	if (typeof expectedLength === 'number' && value.length !== expectedLength) {
		return false;
	}

	if (predicate) {
		return value.every(predicate);
	}

	return true;
};
