import type { List } from '#infra/List';
import type { ListLike } from '#infra/ListLike';

/**
 * An alias for ordered sets returned by {@link Array.concat()}.
 */
export interface ConcatOrderedSet<T = unknown> extends ConcatArray<T> {
	slice(start?: number, end?: number): OrderedSet<T>;
	[Symbol.dispose](): void;
}

/**
 * An alias for ordered sets returned by {@link Array.flat()} and
 * {@link Array.flatMap()}.
 */
export type FlatOrderedSet<L, D extends number> = FlatArray<L, D>;

/**
 * Some lists are designated as ordered sets. An ordered set is a list with the
 * additional semantic that it must not contain the same item twice.
 *
 * @see https://infra.spec.whatwg.org/#ordered-set
 * @see https://dom.spec.whatwg.org/#ordered-sets
 *
 * @typeParam T - The type of items contained in the {@link OrderedSet}.
 */
export interface ReadonlyOrderedSet<T = unknown> extends ReadonlyArray<T> {
	/**
	 * Sorts the set in ascending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-ascending-order
	 *
	 * @param by - A comparison function to sort the set by.
	 *
	 * @returns A new {@link OrderedSet} sorted in ascending order.
	 */
	ascending(by?: (a: T, b: T) => number): OrderedSet<T>;

	/**
	 * Creates a shallow copy of the set, meaning that the set is cloned, but the
	 * items themselves are not cloned.
	 *
	 * @see https://infra.spec.whatwg.org/#list-clone
	 *
	 * @returns A new {@link OrderedSet} instance containing the same items as the
	 * original.
	 */
	clone(): OrderedSet<T>;

	/**
	 * Determines if the set contains a given item.
	 *
	 * @see https://infra.spec.whatwg.org/#list-contain
	 *
	 * @param value - The item to locate in the set.
	 *
	 * @returns A boolean which is `true` if the given `value` is in the set,
	 * `false` otherwise.
	 */
	contains(value: T): boolean;

	/**
	 * Sorts the set in descending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-descending-order
	 *
	 * @param by - A comparison function to sort the set by.
	 *
	 * @returns A new {@link OrderedSet} sorted in descending order.
	 */
	descending(by?: (a: T, b: T) => number): OrderedSet<T>;

	/**
	 * Returns a new {@link OrderedSet} containing the items that are in this set
	 * but not in the given `set`.
	 *
	 * @see https://infra.spec.whatwg.org/#set-difference
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A new {@link OrderedSet} containing the difference between the
	 * two sets.
	 */
	difference<U = unknown>(items: OrderedSet<U>): OrderedSet<T>;

	/**
	 * Determines if two ordered sets are equal.
	 *
	 * @see https://infra.spec.whatwg.org/#set-equal
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A boolean which is `true` if the two sets are equal, `false`
	 * otherwise.
	 */
	equals<T, U>(set: OrderedSet<U>): boolean;

	/**
	 * Returns the range from 0 to the set's size, exclusive.
	 *
	 * @see https://infra.spec.whatwg.org/#list-get-the-indices
	 *
	 * @returns An {@link OrderedSet} of the number indices in the set.
	 */
	indices(): OrderedSet<number>;

	/**
	 * Returns a new {@link OrderedSet} containing the items that are in both this
	 * set and the given `set`.
	 *
	 * @see https://infra.spec.whatwg.org/#set-intersection
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A new {@link OrderedSet} containing the intersection between the
	 * two sets.
	 */
	intersection<U = unknown>(items: OrderedSet<T | U>): OrderedSet<T & U>;

	/**
	 * Determines if the set's size is `0`.
	 *
	 * @see https://infra.spec.whatwg.org/#list-is-empty
	 *
	 * @returns A boolean which is `true` if this set is empty, `false` otherwise.
	 */
	isEmpty(): boolean;

	/**
	 * Determines whether this set is a subset of the given `set`. An ordered set
	 * is a subset of another ordered set if all items in this set are also
	 * contained in the provided ordered set.
	 *
	 * @see https://infra.spec.whatwg.org/#set-subset
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A boolean which is `true` if this set is a subset of the given
	 * `set`, `false` otherwise.
	 */
	isSubsetOf<U = unknown>(set: OrderedSet<U>): boolean;

	/**
	 * Determines whether this set is a superset of the given `set`. An ordered
	 * set is a superset of another ordered set if it contains all items in the
	 * provided ordered set.
	 *
	 * @see https://infra.spec.whatwg.org/#set-superset
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A boolean which is `true` if this set is a superset of the given
	 * `set`, `false` otherwise.
	 */
	isSupersetOf<U = unknown>(set: OrderedSet<U>): boolean;

	/**
	 * Returns a new {@link OrderedSet} containing the items that are in both this
	 * set and the given `set`.
	 *
	 * @see https://infra.spec.whatwg.org/#set-union
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A new {@link OrderedSet} containing the union of both sets.
	 */
	union<U = unknown>(items: OrderedSet<U>): OrderedSet<T | U>;

	/**
	 * Frees internal resources used by the {@link OrderedSet}.
	 */
	[Symbol.dispose](): void;

	/**
	 * Override {@link ReadonlyArray} methods that return arrays to ensure they
	 * return ordered sets.
	 *
	 * @remarks
	 * This is handled by the `get` trap in the {@link OrderedSet} prototype
	 * proxy, which returns a higher-order function for every method and ensures
	 * that if the result is an array, it is converted to a {@link OrderedSet}.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	concat(...items: ReadonlyArray<ConcatOrderedSet<T>>): OrderedSet<T>;
	concat(...items: ReadonlyArray<T | ConcatOrderedSet<T>>): OrderedSet<T>;
	filter<S extends T>(predicate: (value: T, index: number, array: OrderedSet<T>) => value is S, thisArg?: unknown): OrderedSet<S>;
	filter(predicate: (value: T, index: number, array: OrderedSet<T>) => unknown, thisArg?: unknown): OrderedSet<T>;
	flat<A, D extends number = 1>(this: A, depth?: D): OrderedSet<FlatOrderedSet<A, D>>;
	flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: OrderedSet<T>) => U | ReadonlyArray<U>, thisArg?: This): OrderedSet<U>;
	map<U>(callbackfn: (value: T, index: number, array: OrderedSet<T>) => U, thisArg?: unknown): OrderedSet<U>;
	slice(start?: number, end?: number): OrderedSet<T>;
	toReversed(): OrderedSet<T>;
	toSorted(compareFn?: (a: T, b: T) => number): OrderedSet<T>;
	toSpliced(start: number, deleteCount: number, ...items: ReadonlyArray<T>): OrderedSet<T>;
	toSpliced(start: number, deleteCount?: number): OrderedSet<T>;
	with(index: number, value: T): OrderedSet<T>;
}

/**
 * Some lists are designated as ordered sets. An ordered set is a list with the
 * additional semantic that it must not contain the same item twice.
 *
 * @see https://infra.spec.whatwg.org/#ordered-set
 * @see https://dom.spec.whatwg.org/#ordered-sets
 *
 * @typeParam T - The type of items contained in the {@link OrderedSet}.
 */
export interface OrderedSet<T = unknown> extends Array<T> {
	/**
	 * Add the given item to the end of the set.
	 *
	 * @see https://infra.spec.whatwg.org/#set-append
	 *
	 * @param item - An item to be added to the set.
	 *
	 * @returns The {@link OrderedSet} instance with the given `item` added.
	 */
	append(item: T): this;

	/**
	 * Sorts the set in ascending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-ascending-order
	 *
	 * @param by - A comparison function to sort the set by.
	 *
	 * @returns A new {@link OrderedSet} sorted in ascending order.
	 */
	ascending(by?: (a: T, b: T) => number): OrderedSet<T>;

	/**
	 * Creates a shallow copy of the set, meaning that the set is cloned, but the
	 * items themselves are not cloned.
	 *
	 * @see https://infra.spec.whatwg.org/#list-clone
	 *
	 * @returns A new {@link OrderedSet} instance containing the same items as the
	 * original.
	 */
	clone(): OrderedSet<T>;

	/**
	 * Determines if the set contains a given item.
	 *
	 * @see https://infra.spec.whatwg.org/#list-contain
	 *
	 * @param value - The item to locate in the set.
	 *
	 * @returns A boolean which is `true` if the given `value` is in the set,
	 * `false` otherwise.
	 */
	contains(value: T): boolean;

	/**
	 * Sorts the set in descending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-descending-order
	 *
	 * @param by - A comparison function to sort the set by.
	 *
	 * @returns A new {@link OrderedSet} sorted in descending order.
	 */
	descending(by?: (a: T, b: T) => number): OrderedSet<T>;

	/**
	 * Returns a new {@link OrderedSet} containing the items that are in this set
	 * but not in the given `set`.
	 *
	 * @see https://infra.spec.whatwg.org/#set-difference
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A new {@link OrderedSet} containing the difference between the
	 * two sets.
	 */
	difference<U = unknown>(items: OrderedSet<U>): OrderedSet<T>;

	/**
	 * Removes all items from the list.
	 *
	 * @see https://infra.spec.whatwg.org/#list-empty
	 *
	 * @returns The {@link OrderedSet} instance after removing all items.
	 */
	empty(): this;

	/**
	 * Appends every item in the given set to the end of the set. This is
	 * different than {@link OrderedSet.union}, which creates a new set.
	 *
	 * @see https://infra.spec.whatwg.org/#set-extend
	 *
	 * @param list - A {@link ListLike} collection of items to be added to the set.
	 *
	 * @returns The {@link OrderedSet} instance with the given `items` added.
	 */
	extend(items: ListLike<T>): this;

	/**
	 * Determines if two ordered sets are equal.
	 *
	 * @see https://infra.spec.whatwg.org/#set-equal
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A boolean which is `true` if the two sets are equal, `false`
	 * otherwise.
	 */
	equals<T, U>(set: OrderedSet<U>): boolean;

	/**
	 * Returns the range from 0 to the set's size, exclusive.
	 *
	 * @see https://infra.spec.whatwg.org/#list-get-the-indices
	 *
	 * @returns An {@link OrderedSet} of the number indices in the set.
	 */
	indices(): OrderedSet<number>;

	/**
	 * Inserts an item at the given index in the set.
	 *
	 * @see https://infra.spec.whatwg.org/#list-insert
	 *
	 * @param item - An item to be inserted into the set.
	 * @param at - The index at which to insert the item.
	 *
	 * @returns The {@link ListLike} instance with the given `item` inserted.
	 */
	insert(item: T, at: number): this;

	/**
	 * Returns a new {@link OrderedSet} containing the items that are in both this
	 * set and the given `set`.
	 *
	 * @see https://infra.spec.whatwg.org/#set-intersection
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A new {@link OrderedSet} containing the intersection between the
	 * two sets.
	 */
	intersection<U = unknown>(items: OrderedSet<T | U>): OrderedSet<T & U>;

	/**
	 * Determines if the set's size is `0`.
	 *
	 * @see https://infra.spec.whatwg.org/#list-is-empty
	 *
	 * @returns A boolean which is `true` if this set is empty, `false` otherwise.
	 */
	isEmpty(): boolean;

	/**
	 * Determines whether this set is a subset of the given `set`. An ordered set
	 * is a subset of another ordered set if all items in this set are also
	 * contained in the provided ordered set.
	 *
	 * @see https://infra.spec.whatwg.org/#set-subset
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A boolean which is `true` if this set is a subset of the given
	 * `set`, `false` otherwise.
	 */
	isSubsetOf<U = unknown>(set: OrderedSet<U>): boolean;

	/**
	 * Determines whether this set is a superset of the given `set`. An ordered
	 * set is a superset of another ordered set if it contains all items in the
	 * provided ordered set.
	 *
	 * @see https://infra.spec.whatwg.org/#set-superset
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A boolean which is `true` if this set is a superset of the given
	 * `set`, `false` otherwise.
	 */
	isSupersetOf<U = unknown>(set: OrderedSet<U>): boolean;

	/**
	 * Add the given item to the beginning of the set.
	 *
	 * @see https://infra.spec.whatwg.org/#set-prepend
	 *
	 * @param item - An item to be added to the set.
	 *
	 * @returns The {@link OrderedSet} instance with the given `item` added.
	 */
	prepend(item: T): this;

	/**
	 * Removes any items in the set that match the given condition.
	 *
	 * @see https://infra.spec.whatwg.org/#list-remove
	 *
	 * @param condition - A condition to match items in the set.
	 *
	 * @returns The {@link OrderedSet} instance with the matching items removed.
	 */
	remove(condition: (value: T) => boolean): this;

	/**
	 * Replaces an item in the set with a given replacement item.
	 *
	 * @see https://infra.spec.whatwg.org/#set-replace
	 *
	 * @param item - An item in the set to be replaced.
	 * @param replacement - An item to replace the given `item`.
	 *
	 * @returns The {@link OrderedSet} instance with the given `item` replaced
	 * by the `replacement`.
	 */
	replace(item: T, replacement: T): this;

	/**
	 * Returns a new {@link OrderedSet} containing the items that are in both this
	 * set and the given `set`.
	 *
	 * @see https://infra.spec.whatwg.org/#set-union
	 *
	 * @param set - Another {@link OrderedSet} instance to compare with.
	 *
	 * @returns A new {@link OrderedSet} containing the union of both sets.
	 */
	union<U = unknown>(items: OrderedSet<U>): OrderedSet<T | U>;

	/**
	 * Frees internal resources used by the {@link OrderedSet}.
	 */
	[Symbol.dispose](): void;

	/**
	 * Override {@link Array} methods that return arrays to ensure they return
	 * ordered sets.
	 *
	 * @remarks
	 * This is handled by the `get` trap in the {@link OrderedSet} prototype
	 * proxy, which returns a higher-order function for every method and ensures
	 * that if the result is an array, it is converted to a {@link OrderedSet}.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	concat(...items: ReadonlyArray<ConcatOrderedSet<T>>): OrderedSet<T>;
	concat(...items: ReadonlyArray<T | ConcatOrderedSet<T>>): OrderedSet<T>;
	filter<S extends T>(predicate: (value: T, index: number, array: OrderedSet<T>) => value is S, thisArg?: unknown): OrderedSet<S>;
	filter(predicate: (value: T, index: number, array: OrderedSet<T>) => unknown, thisArg?: unknown): OrderedSet<T>;
	flat<A, D extends number = 1>(this: A, depth?: D): OrderedSet<FlatOrderedSet<A, D>>;
	flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: OrderedSet<T>) => U | ReadonlyArray<U>, thisArg?: This): OrderedSet<U>;
	map<U>(callbackfn: (value: T, index: number, array: OrderedSet<T>) => U, thisArg?: unknown): OrderedSet<U>;
	slice(start?: number, end?: number): OrderedSet<T>;
	splice(start: number, deleteCount?: number): OrderedSet<T>;
	splice(start: number, deleteCount: number, ...items: ReadonlyArray<T>): OrderedSet<T>;
	toReversed(): OrderedSet<T>;
	toSorted(compareFn?: (a: T, b: T) => number): OrderedSet<T>;
	toSpliced(start: number, deleteCount: number, ...items: ReadonlyArray<T>): OrderedSet<T>;
	toSpliced(start: number, deleteCount?: number): OrderedSet<T>;
	with(index: number, value: T): OrderedSet<T>;
}

/**
 * A constructor that creates a new {@link OrderedSet} instance and includes
 * Array-like static methods, as well as static methods for ranges, parsing,
 * and serialization operations.
 *
 * @see https://infra.spec.whatwg.org/#ordered-set
 * @see https://dom.spec.whatwg.org/#ordered-sets
 */
export interface OrderedSetConstructor {
	new <T>(...args: ConstructorParameters<ArrayConstructor>): OrderedSet<T>;
	<T>(...args: ConstructorParameters<ArrayConstructor>): OrderedSet<T>;

	readonly prototype: OrderedSet;
	readonly [Symbol.species]: OrderedSetConstructor;

	/**
	 * @see https://infra.spec.whatwg.org/#the-range
	 *
	 * @param to - The start index of the range.
	 *
	 * @param from - [Optional] The end index of the range.
	 * @defaultValue The size of the set.
	 *
	 * @param inclusive - [Optional] A boolean indicating whether the end index is
	 * inclusive.
	 * @defaultValue `false`
	 *
	 * @returns A new {@link OrderedSet} containing the items in the given range.
	 */
	range(to: number, from?: number, inclusive?: boolean): OrderedSet<number>;

	/**
	 * Parses a space-delimited string into an {@link OrderedSet} of string
	 * tokens.
	 *
	 * @see https://dom.spec.whatwg.org/#concept-ordered-set-parser
	 *
	 * @param input - A string to be parsed into an {@link OrderedSet}.
	 *
	 * @returns An {@link OrderedSet} parsed from the given `input` string.
	 */
	parse(input: string): OrderedSet<string>;

	/**
	 * Serializes an {@link OrderedSet} into a space-delimited string. Note that
	 * the Infra spec says the separator should be an empty string by default but
	 * the DOM spec specifies U+0020 SPACE, so we follow the DOM spec here. A
	 * different separator can be provided if needed.
	 *
	 * @see https://dom.spec.whatwg.org/#concept-ordered-set-serializer
	 *
	 * @param set - An {@link OrderedSet} to be serialized into a string.
	 * @param separator - [Optional] A string used to separate items in the serialized string.
	 * @defaultValue ` ` (U+0020 SPACE)
	 *
	 * @returns The string concatenation of set using U+0020 SPACE.
	 */
	serialize(set: OrderedSet<unknown>, separator?: string): string;

	/**
	 * Override static {@link Array} methods that return arrays to ensure they
	 * return ordered sets.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	from<T>(iterable: Iterable<T> | ArrayLike<T>): OrderedSet<T>;
	from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: unknown): OrderedSet<U>;
	fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<OrderedSet<T>>;
	fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: unknown): Promise<OrderedSet<Awaited<U>>>;
	isOrderedSet<T = unknown>(arg: unknown): arg is OrderedSet<T>;
	of<T>(...items: ReadonlyArray<T>): OrderedSet<T>;
}

/**
 * @internal
 * Stores the internal {@link Set} of items for each {@link OrderedSet}
 * instance.
 */
const values = new WeakMap<OrderedSet, Set<unknown>>();

/**
 * @internal
 * Marks an {@link OrderedSet} instance as operationalized for built-in
 * {@link Array} methods. This is used to ensure methods like `splice()` and
 * `unshift()` function correctly. When these methods are called, they extend
 * the array in-place by shifting everything to the right starting from the end,
 * which can temporarily create duplicate items. By marking the instance as
 * operationalized, we prevent false negatives for the constraint that restricts
 * duplicate items from being added by direct index assignment.
 *
 * Note that because methods like `push()` and `unshift()` may add multiple
 * items, we do not know how many times the `set` trap may be invoked during a
 * built-in procedure, so it's the responsibility of the method marking an
 * instance as operationalized to manually remove the instance from this
 * `WeakSet` once the operation is complete.
 */
const operationalized = new WeakSet<OrderedSet>();

/**
 * @internal
 * Marks an {@link OrderedSet} instance as operationalized for the duration of
 * the provided callback function.
 *
 * @param set - An {@link OrderedSet} instance to mark as operationalized.
 * @param callback - A callback function to execute while the set is marked as
 * operationalized.
 *
 * @returns The result of the provided callback function.
 */
const _operationalize = <T>(set: OrderedSet<T>, callback: () => void) => {
	operationalized.add(set);
	let result: unknown;

	try {
		result = callback();
	} finally {
		operationalized.delete(set);
	}

	return result;
};

/**
 * Creates a new {@link OrderedSet} instance.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array#parameters
 *
 * @typeParam T - The type of items contained in the {@link OrderedSet}.
 *
 * @param args - The items to populate the ordered set with or a length to
 * create an empty ordered set.
 *
 * @returns A new {@link OrderedSet} instance.
 */
export const OrderedSet = function<T>(
	this: OrderedSet<T>,
	...args: ConstructorParameters<ArrayConstructor>
) {
	const items = new Set<T>(args as ReadonlyArray<T>);

	/* @ts-expect-error - Expected 3-4 arguments, but got 2. (this is a false positive, possibly a bug in TypeScript) */
	const instance = Array.from.call(this, items) as OrderedSet<T>;

	Object.setPrototypeOf(instance, OrderedSet.prototype);

	const proxy = new Proxy(instance, {
		defineProperty(instance: OrderedSet<T>, key: string | symbol, property: PropertyDescriptor) {
			const index = Number(key);

			// console.log('DEFINE', { instance, key, property, index, proxy });

			if (!Number.isInteger(index) || !('value' in property)) {
				return Reflect.defineProperty(instance, key, property);
			}

			if ('value' in property && !property.configurable) {
				throw new TypeError(`Cannot redefine property: ${String(key)}`);
			}

			const items = values.get(proxy);
			const { value } = property;

			if (Number.isInteger(index)) {
				if (items && (operationalized.has(proxy) || !items.has(value))) {
					if (Reflect.defineProperty(instance, key, property)) {
						items.clear();

						for (const item of instance) {
							items.add(item);
						}
					}
				}

				return true;
			} else if (key === 'length' && items && !operationalized.has(proxy)) {
				if (Reflect.defineProperty(instance, key, { ...property, value: Math.min(value, items.size) })) {
						items.clear();

						for (const item of instance) {
							items.add(item);
						}

						return true;
					}

				return Reflect.defineProperty(instance, key, { ...property, value: items.size });
			}

			return Reflect.defineProperty(instance, key, property);
		},
		deleteProperty(instance: OrderedSet<T>, key: string | symbol) {
			if (Object.isSealed(instance)) {
				return false;
			}

			const index = Number(key);

			// console.log('DELETE', { instance, key, items, index });

			if (Number.isInteger(index)) {
				const item = instance[index];

				if (item !== undefined) {
					if (!operationalized.has(proxy)) {
						items.delete(item);
					}

					let i = 0;

					for (const item of items) {
						Reflect.set(instance, i, item);
						i += 1;
					}

					Reflect.set(instance, 'length', i);
				}

				return true;
			}

			return Reflect.deleteProperty(instance, key);
		},
		set(instance: OrderedSet<T>, key: string | symbol, value: T, proxy: OrderedSet<T>) {
			if (!Object.isExtensible(instance)) {
				throw new TypeError(`Cannot add property ${String(key)}, ordered set is not extensible`);
			}

			const index = Number(key);

			// console.log('SET', { instance, key, value, items, index, proxy });

			if (Number.isInteger(index)) {
				if (items && (operationalized.has(proxy) || !items.has(value))) {
					if (Reflect.set(instance, key, value)) {
						items.clear();

						for (const item of instance) {
							items.add(item);
						}
					}
				}

				return true;
			} else if (key === 'length' && items && !operationalized.has(proxy)) {
				if (Reflect.set(instance, key, Math.min(value as number, items.size))) {
						items.clear();

						for (const item of instance) {
							items.add(item);
						}

						return true;
					}

				return Reflect.set(instance, key, items.size);
			}

			return Reflect.set(instance, key, value);
		},
	}) as OrderedSet<T>;

	values.set(proxy, items);

	return proxy;
} as unknown as OrderedSetConstructor;

/**
 * Checks that an `unknown` value is an {@link OrderedSet}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `OrderedSet`.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link OrderedSet}.
 */
export const isOrderedSet = <T = unknown>(value: unknown): value is OrderedSet<T> =>
	value instanceof OrderedSet;

/**
 * The prototype object for the {@link OrderedSet} constructor as a `Proxy` to
 * override methods that return arrays to ensure they return ordered sets.
 */
const __PROTO__ = new Proxy(Array.prototype, {
	get(_: typeof Array.prototype, key: string | symbol, instance: OrderedSet) {
		const index = typeof key === 'string' ? Number(key) : NaN;

		/**
		 * @privateRemarks
		 * If a numeric index is being accessed here it means it's not a key of the
		 * instance so the value must be `undefined`.
		 */
		if (Number.isInteger(index)) {
			return;
		}

		const value = Reflect.get(_, key, instance);

		if (typeof value !== 'function' || key === Symbol.iterator) {
			return value;
		}

		return (...args: ReadonlyArray<unknown>) => {
			const result = Reflect.apply(value, instance, args);

			if (Array.isArray(result) && !(result instanceof OrderedSet)) {
				return OrderedSet.from(result);
			}

			return result;
		};
	},
});

Object.defineProperties(OrderedSet, {
	prototype: {
		value: Object.seal(Object.create(__PROTO__, {
			append: {
				value<T = unknown>(this: OrderedSet<T>, item: T) {
					this.push(item);

					return this;
				},
				configurable: true,
				writable: true,
			},
			ascending: {
				value<T = unknown>(this: OrderedSet<T>, by?: (a: T, b: T) => number) {
					let asc = by;

					if (!asc) {
						asc = (a: T, b: T) => {
							if (a < b) {
								return -1;
							}

							if (a > b) {
								return 1;
							}

							return 0;
						};
					}

					return this.toSorted(asc);
				},
				configurable: true,
				writable: true,
			},
			clone: {
				value<T = unknown>(this: OrderedSet<T>) {
					return OrderedSet.from(this);
				},
				configurable: true,
				writable: true,
			},
			contains: {
				value<T>(this: OrderedSet<T>, value: T) {
					const items = values.get(this);

					return items?.has(value) || false;
				},
				configurable: true,
				writable: true,
			},
			copyWithin: {
				value<T = unknown>(this: OrderedSet<T>, target: number, start = 0, end?: number) {
					if (values.has(this)) {
						_operationalize(this, () => {
							Array.prototype.copyWithin.call(this, target, start, end);
						});

						/**
						 * @privateRemarks
						 * This needs to be created before we reset the internal state.
						 */
						const discrete = new Set(this);

						this.empty().extend(discrete);
					}

					return this;
				},
				configurable: true,
				writable: true,
			},
			descending: {
				value<T = unknown>(this: OrderedSet<T>, by?: (a: T, b: T) => number) {
					let desc = by;

					if (!desc) {
						desc = (a: T, b: T) => {
							if (b < a) {
								return -1;
							}

							if (b > a) {
								return 1;
							}

							return 0;
						};
					}

					return this.toSorted(desc);
				},
				configurable: true,
				writable: true,
			},
			difference: {
				value<T = unknown, U = unknown>(this: OrderedSet<T>, items: OrderedSet<T | U>) {
					const set = new OrderedSet<T>();

					for (const item of this) {
						if (!items.contains(item)) {
							set.append(item);
						}
					}

					return set;
				},
				configurable: true,
				writable: true,
			},
			empty: {
				value<T = unknown>(this: OrderedSet<T>) {
					this.length = 0;

					return this;
				},
				configurable: true,
				writable: true,
			},
			extend: {
				value<T = unknown>(this: OrderedSet<T>, items: ListLike<T>) {
					// this.push(...([...items] as ReadonlyArray<T>));
					for (const item of items) {
						this.append(item as T);
					}

					return this;
				},
				configurable: true,
				writable: true,
			},
			equals: {
				value<T = unknown, U = unknown>(this: OrderedSet<T>, set: OrderedSet<U>) {
					const items = values.get(this);

					if (items && items.size === set.length) {
						return this.isSubsetOf(set) && this.isSupersetOf(set);
					}

					return false;
				},
				configurable: true,
				writable: true,
			},
			fill: {
				value<T = unknown>(this: OrderedSet<T>, item: T, start = 0, end = this.length) {
					if (values.has(this)) {
						_operationalize(this, () => {
							Array.prototype.fill.call(this, item, start, end);
						});

						/**
						 * @privateRemarks
						 * This needs to be created before we reset the internal state.
						 */
						const discrete = new Set(this);

						this.empty().extend(discrete);
					}

					return this;
				},
				configurable: true,
				writable: true,
			},
			indices: {
				value<T = unknown>(this: OrderedSet<T>) {
					return Object.freeze(OrderedSet.range(0, this.length));
				},
				configurable: true,
				writable: true,
			},
			insert: {
				value<T = unknown>(this: OrderedSet<T>, item: T, before: number) {
					this.splice(before, 0, item);

					return this;
				},
				configurable: true,
				writable: true,
			},
			intersection: {
				value<T = unknown, U = unknown>(this: OrderedSet<T>, items: OrderedSet<T | U>) {
					const set = new OrderedSet<T & U>();

					for (const item of this) {
						if (items.contains(item)) {
							set.append(item as T & U);
						}
					}

					return set;
				},
				configurable: true,
				writable: true,
			},
			isEmpty: {
				value<T = unknown>(this: OrderedSet<T>) {
					return this.length === 0;
				},
				configurable: true,
				writable: true,
			},
			isSubsetOf: {
				value<T = unknown, U = unknown>(this: OrderedSet<T>, set: OrderedSet<U>) {
					const items = values.get(this);

					if (items) {
						return items.isSubsetOf(new Set(set));
					}

					return false;
				},
				configurable: true,
				writable: true,
			},
			isSupersetOf: {
				value<T = unknown, U = unknown>(this: OrderedSet<T>, set: OrderedSet<U>) {
					const items = values.get(this);

					if (items) {
						return items.isSupersetOf(new Set(set));
					}

					return false;
				},
				configurable: true,
				writable: true,
			},
			pop: {
				value<T = unknown>(this: OrderedSet<T>) {
					if (this.length > 0) {
						return Array.prototype.pop.call(this) as T;
					}

					return undefined;
				},
				configurable: true,
				writable: true,
			},
			prepend: {
				value<T = unknown>(this: OrderedSet<T>, item: T) {
					this.unshift(item);

					return this;
				},
				configurable: true,
				writable: true,
			},
			replace: {
				value<T = unknown>(this: OrderedSet<T>, item: T, replacement: T) {
					const items = values.get(this);

					if (items) {
						const hasItem = this.contains(item);
						const hasReplacement = this.contains(replacement);

						if (hasItem || hasReplacement) {
							let index = this.indexOf(item);

							if (hasReplacement) {
								index = index === -1
									? this.indexOf(replacement)
									: Math.min(index, this.indexOf(replacement));
							}

							this[index] = replacement;
						}
					}

					return this;
				},
				configurable: true,
				writable: true,
			},
			remove: {
				value<T = unknown>(this: OrderedSet<T>, condition: (value: T) => boolean) {
					if (!this.isEmpty()) {
						const items =
							Array.from(this)
								.filter(condition)
								.map(this.indexOf)
								.reverse();

						for (const index of items) {
							// this.splice(index, 1);
							delete this[index];
						}
					}

					return this;
				},
				configurable: true,
				writable: true,
			},
			reverse: {
				value<T = unknown>(this: OrderedSet<T>) {
					return _operationalize(this, () =>
						Array.prototype.reverse.call(this),
					);
				},
				configurable: true,
				writable: true,
			},
			shift: {
				value<T = unknown>(this: OrderedSet<T>) {
					return _operationalize(this, () =>
						Array.prototype.shift.call(this) as T | undefined,
					);
				},
				configurable: true,
				writable: true,
			},
			sort: {
				value<T = unknown>(this: OrderedSet<T>, compareFn?: (a: T, b: T) => number) {
					return _operationalize(this, () =>
						Array.prototype.sort.call(this, compareFn),
					);
				},
				configurable: true,
				writable: true,
			},
			splice: {
				value<T = unknown>(this: OrderedSet<T>, start: number, deleteCount: number, ...items: ReadonlyArray<T>) {
					const filtered = Array.from(new Set(items.filter((item) => !this.contains(item))));

					if ((items.length && filtered.length) || !items.length || deleteCount > 0) {
						return OrderedSet.from(_operationalize(this, () =>
							Array.prototype.splice.call(this, start, deleteCount, ...filtered),
						) as ReturnType<Array<T>['splice']>);
					}

					return OrderedSet.of<T>();
				},
				configurable: true,
				writable: true,
			},
			union: {
				value<T = unknown, U = unknown>(this: OrderedSet<T>, items: OrderedSet<U>) {
					const set = this.clone() as OrderedSet<T | U>;

					for (const item of items) {
						set.append(item);
					}

					return set;
				},
				configurable: true,
				writable: true,
			},
			unshift: {
				value<T = unknown>(this: OrderedSet<T>, ...items: ReadonlyArray<T>) {
					const filtered = Array.from(new Set(items.filter((item) => !this.contains(item))));

					if (filtered.length) {
						return _operationalize(this, () =>
							Array.prototype.unshift.call(this, ...filtered)
						);
					}

					return this.length;
				},
				configurable: true,
				writable: true,
			},
			constructor: {
				value: OrderedSet,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value<T>(this: OrderedSet<T>) {
					this.empty();
					values.delete(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'OrderedSet',
				configurable: true,
			},
		})),
	},
	from: {
		value<T, U>(...args: Parameters<typeof Array.from<T, U>>) {
			return new OrderedSet<U>(...Array.from<T, U>(...args));
		},
		configurable: true,
		writable: true,
	},
	fromAsync: {
		async value<T, U>(...args: Parameters<typeof Array.fromAsync<T, U>>) {
			return new OrderedSet<Awaited<U>>().extend((await Array.fromAsync<T, U>(...args)));
		},
		configurable: true,
		writable: true,
	},
	isOrderedSet: {
		value: isOrderedSet,
		configurable: true,
		writable: true,
	},
	of: {
		value<T>(...args: Parameters<typeof Array.of<T>>) {
			return new OrderedSet(...args);
		},
		configurable: true,
		writable: true,
	},
	parse: {
		value(input: string) {
			const inputTokens = input.split(/[\t\n\f\r ]+/).filter(Boolean);
			const tokens = new OrderedSet<string>();

			for (const token of inputTokens) {
				tokens.append(token);
			}

			return tokens;
		},
		configurable: true,
		writable: true,
	},
	range: {
		value(from: number, to: number, inclusive = false) {
			from = isNaN(from) ? 0 : from;
			to = isNaN(to) ? 0 : to;

			const n = Math.ceil(from);
			const m = Math.floor(inclusive ? to + 1 : to);

			return new OrderedSet<number>(...Array.from(
				{ length: m - n },
				(_, i) => n + i,
			));
		},
		configurable: true,
		writable: true,
	},
	serialize: {
		value<T = unknown>(set: OrderedSet<T>, separator = ' ') {
			if (!set.length) {
				return '';
			}

			return Array.from(set).map((item) =>
				typeof item === 'object' && item !== null
					? JSON.stringify(item)
					: String(item)
			).join(separator);
		},
		configurable: true,
		writable: true,
	},
	[Symbol.species]: {
		get() {
			return OrderedSet;
		},
		configurable: true,
	},
	[Symbol.hasInstance]: {
		value: (instance: unknown) => {
			if (!instance) {
				return false;
			}

			const prototype = Object.getPrototypeOf(instance);

			return Symbol.toStringTag in prototype &&
				prototype[Symbol.toStringTag] === 'OrderedSet';
		},
	},
});

Object.seal(OrderedSet);

export default OrderedSet;
