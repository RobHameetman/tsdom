import List, { type ReadonlyList } from '#infra/List';
import OrderedSet, { type ReadonlyOrderedSet } from '#infra/OrderedSet';
import Queue, { type ReadonlyQueue } from '#infra/Queue';
import Stack, { type ReadonlyStack } from '#infra/Stack';

export type ListLike<T = unknown> =
	| Array<T>
	| ReadonlyArray<T>
	| List<T>
	| ReadonlyList<T>
	| OrderedSet<T>
	| ReadonlyOrderedSet<T>
	| Queue<T>
	| ReadonlyQueue<T>
	| Stack<T>
	| ReadonlyStack<T>
	| Int8Array
	| Readonly<Int8Array>
	| Uint8Array
	| Readonly<Uint8Array>
	| Uint8ClampedArray
	| Readonly<Uint8ClampedArray>
	| Int16Array
	| Readonly<Int16Array>
	| Uint16Array
	| Readonly<Uint16Array>
	| Int32Array
	| Readonly<Int32Array>
	| Uint32Array
	| Readonly<Uint32Array>
	| Float32Array
	| Readonly<Float32Array>
	| Float64Array
	| Readonly<Float64Array>
	| BigInt64Array
	| Readonly<BigInt64Array>
	| BigUint64Array
	| Readonly<BigUint64Array>
	| Set<T>
	| ReadonlySet<T>
	| Iterable<T>
	| IterableIterator<T>;

export type ListLikeConstructor =
	| typeof Array
	| typeof List
	| typeof OrderedSet
	| typeof Queue
	| typeof Stack;

/**
 * Checks that an `unknown` value is a finite {@link ListLike} of items.
 *
 * Requirements:
 *   - `value` must be an instance of {@link ListLike}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a finite {@link ListLike} of items.
 */
export const isListLike = (
	value: unknown,
): value is ListLike =>
	Symbol.iterator in Object(value) &&
	!(Object(value) instanceof String);
