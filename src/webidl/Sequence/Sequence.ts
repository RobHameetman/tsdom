import { type List, isList } from '@/infra/List';
import { type OrderedSet, isOrderedSet } from '@/infra/OrderedSet';
import { type Queue, isQueue } from '@/infra/Queue';
import { type Stack, isStack } from '@/infra/Stack';

/**
 * The {@link Sequence<T>} type is a parameterized type whose values are
 * (possibly zero-length) lists of values of type `T`. Any list can be
 * implicitly treated as a {@link Sequence<T>}, as long as it contains only
 * items that are of type `T`.
 *
 * @see https://webidl.spec.whatwg.org/#idl-sequence
 */
export type Sequence<T> =
	| List<T>
	| OrderedSet<T>
	| Queue<T>
	| Stack<T>
	| Array<T>
	| ReadonlyArray<T>;

/**
 * Checks that an `unknown` value is a {@link Sequence}.
 *
 * Requirements:
 *   - `value` must be a list of values of type `T`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Sequence}.
 */
export const isSequence = <T>(value: unknown): value is Sequence<T> =>
	isList<T>(value) ||
	isOrderedSet<T>(value) ||
	isQueue<T>(value) ||
	isStack<T>(value) ||
	Array.isArray(value);
