import { type Contravariant, isContravariant } from '#_internals/utils/types/Contravariant';
import {
	type FromContravariant,
	isFromContravariant,
} from '#_internals/utils/types/FromContravariant';
/**
 * Narrows a value to a single constituent of a union or tuple type `T` using
 * double contravariant extraction.
 *
 * @typeParam T - A union or tuple type from which one member is selected.
 */
export type OneOf<T> = FromContravariant<
	FromContravariant<
		Contravariant<Contravariant<T extends Array<unknown> ? T[number] : T>>
	>
>;

/**
 * Checks that an `unknown` value is a {@link OneOf}.
 *
 * Requirements:
 *   - `value` must be a function with an arity of 1.
 *
 * @typeParam T - A union or tuple type from which one member is selected.
 *
 * @param value - An `unknown` value.
 * @param predicate - An optional type guard that can be used to validate the selected member.
 *
 * @returns The determination that `value` is or is not a {@link OneOf}.
 */
export const isOneOf = <T>(
	value: unknown,
	predicate?: (v: unknown) => v is OneOf<T>,
): value is OneOf<T> =>
	/**
	 * value
	 */
	predicate ? predicate(value) : true;
