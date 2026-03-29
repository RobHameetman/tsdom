import OrderedSet from '@/infra/OrderedSet';
import type { ListLike } from '@/infra/ListLike';

/**
 * An alias for lists returned by {@link Array.concat()}.
 */
export interface ConcatList<T = unknown> extends ConcatArray<T> {
	slice(start?: number, end?: number): List<T>;
	[Symbol.dispose](): void;
}

/**
 * An alias for lists returned by {@link Array.flat()} and {@link Array.flatMap()}.
 */
export type FlatList<L, D extends number> = FlatArray<L, D>;

/**
 * A list is a specification type consisting of a finite ordered sequence of items.
 *
 * @see https://infra.spec.whatwg.org/#lists
 *
 * @typeParam T - The type of items contained in the {@link List}.
 *
 * @remarks
 * The spec mentions that this type originates from the JavaScript specification,
 * which is implemented as {@link Array}. This type therefore is an {@link Array}
 * with more declarative semantics.
 */
export interface ReadonlyList<T = unknown> extends ReadonlyArray<T> {
	/**
	 * Sorts the list in ascending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-ascending-order
	 *
	 * @param by - A comparison function to sort the list by.
	 *
	 * @returns A new {@link List} sorted in ascending order.
	 */
	ascending(by?: (a: T, b: T) => number): List<T>;

	/**
	 * Creates a shallow copy of the list, meaning that the list is cloned, but
	 * the items themselves are not cloned.
	 *
	 * @see https://infra.spec.whatwg.org/#list-clone
	 *
	 * @returns A new {@link List} instance containing the same items as the
	 * original.
	 */
	clone(): List<T>;

	/**
	 * Determines if the list contains a given item.
	 *
	 * @see https://infra.spec.whatwg.org/#list-contain
	 *
	 * @param value - The item to locate in the list.
	 *
	 * @returns A boolean which is `true` if the given `value` is in the list,
	 * `false` otherwise.
	 */
	contains(value: T): boolean;

	/**
	 * Sorts the list in descending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-descending-order
	 *
	 * @param by - A comparison function to sort the list by.
	 *
	 * @returns A new {@link List} sorted in descending order.
	 */
	descending(by?: (a: T, b: T) => number): List<T>;

	/**
	 * Returns the range from 0 to the list's size, exclusive.
	 *
	 * @see https://infra.spec.whatwg.org/#list-get-the-indices
	 *
	 * @returns An {@link OrderedSet} of the number indices in the list.
	 */
	indices(): OrderedSet<number>;

	/**
	 * Determines if the list's size is `0`.
	 *
	 * @see https://infra.spec.whatwg.org/#list-is-empty
	 *
	 * @returns A boolean which is `true` if this list is empty, `false` otherwise.
	 */
	isEmpty(): boolean;

	/**
	 * Frees internal resources used by the {@link List}.
	 */
	[Symbol.dispose](): void;

	/**
	 * Override {@link Array} methods that return arrays to ensure they return
	 * lists.
	 *
	 * @remarks
	 * This is handled by the `get` trap in the {@link List} prototype proxy,
	 * which returns a higher-order function for every method and ensures that if
	 * the result is an array, it is converted to a {@link List}.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	concat(...items: ReadonlyArray<ConcatList<T>>): List<T>;
	concat(...items: ReadonlyArray<T | ConcatList<T>>): List<T>;
	filter<S extends T>(predicate: (value: T, index: number, array: List<T>) => value is S, thisArg?: unknown): List<S>;
	filter(predicate: (value: T, index: number, array: List<T>) => unknown, thisArg?: unknown): List<T>;
	flat<A, D extends number = 1>(this: A, depth?: D): List<FlatList<A, D>>;
	flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: List<T>) => U | ReadonlyArray<U>, thisArg?: This): List<U>;
	map<U>(callbackfn: (value: T, index: number, array: List<T>) => U, thisArg?: unknown): List<U>;
	slice(start?: number, end?: number): List<T>;
	toReversed(): List<T>;
	toSorted(compareFn?: (a: T, b: T) => number): List<T>;
	toSpliced(start: number, deleteCount: number, ...items: ReadonlyArray<T>): List<T>;
  toSpliced(start: number, deleteCount?: number): List<T>;
	with(index: number, value: T): List<T>;
}

/**
 * A list is a specification type consisting of a finite ordered sequence of items.
 *
 * @see https://infra.spec.whatwg.org/#lists
 *
 * @typeParam T - The type of items contained in the {@link List}.
 *
 * @remarks
 * The spec mentions that this type originates from the JavaScript specification,
 * which is implemented as {@link Array}. This type therefore is an {@link Array}
 * with more declarative semantics.
 */
export interface List<T = unknown> extends Array<T> {
	/**
	 * Add the given item to the end of the list.
	 *
	 * @see https://infra.spec.whatwg.org/#list-append
	 *
	 * @param item - An item to be added to the list.
	 *
	 * @returns The {@link List} instance with the given `item` added.
	 */
	append(item: T): this;

	/**
	 * Sorts the list in ascending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-ascending-order
	 *
	 * @param by - A comparison function to sort the list by.
	 *
	 * @returns A new {@link List} sorted in ascending order.
	 */
	ascending(by?: (a: T, b: T) => number): List<T>;

	/**
	 * Creates a shallow copy of the list, meaning that the list is cloned, but
	 * the items themselves are not cloned.
	 *
	 * @see https://infra.spec.whatwg.org/#list-clone
	 *
	 * @returns A new {@link List} instance containing the same items as the
	 * original.
	 */
	clone(): List<T>;

	/**
	 * Determines if the list contains a given item.
	 *
	 * @see https://infra.spec.whatwg.org/#list-contain
	 *
	 * @param value - The item to locate in the list.
	 *
	 * @returns A boolean which is `true` if the given `value` is in the list,
	 * `false` otherwise.
	 */
	contains(value: T): boolean;

	/**
	 * Sorts the list in descending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-descending-order
	 *
	 * @param by - A comparison function to sort the list by.
	 *
	 * @returns A new {@link List} sorted in descending order.
	 */
	descending(by?: (a: T, b: T) => number): List<T>;

	/**
	 * Removes all items from the list.
	 *
	 * @see https://infra.spec.whatwg.org/#list-empty
	 *
	 * @returns The {@link List} instance after removing all items.
	 */
	empty(): this;

	/**
	 * Appends every item in the given list to the end of the list.
	 *
	 * @see https://infra.spec.whatwg.org/#list-extend
	 *
	 * @param list - An {@link ListLike} collection of items to be added to the list.
	 *
	 * @returns The {@link List} instance with the given `items` added.
	 */
	extend(items: ListLike<T>): this;

	/**
	 * Returns the range from 0 to the list's size, exclusive.
	 *
	 * @see https://infra.spec.whatwg.org/#list-get-the-indices
	 *
	 * @returns An {@link OrderedSet} of the number indices in the list.
	 */
	indices(): OrderedSet<number>;

	/**
	 * Inserts an item at the given index in the list.
	 *
	 * @see https://infra.spec.whatwg.org/#list-insert
	 *
	 * @param item - An item to be inserted into the list.
	 * @param at - The index at which to insert the item.
	 *
	 * @returns The {@link ListLike} instance with the given `item` inserted.
	 */
	insert(item: T, before: number): this;

	/**
	 * Determines if the list's size is `0`.
	 *
	 * @see https://infra.spec.whatwg.org/#list-is-empty
	 *
	 * @returns A boolean which is `true` if this list is empty, `false` otherwise.
	 */
	isEmpty(): boolean;

	/**
	 * Add the given item to the beginning of the list.
	 *
	 * @see https://infra.spec.whatwg.org/#list-prepend
	 *
	 * @param item - An item to be added to the list.
	 *
	 * @returns The {@link List} instance with the given `item` added.
	 */
	prepend(item: T): this;

	/**
	 * Removes any items in the list that match the given condition.
	 *
	 * @see https://infra.spec.whatwg.org/#list-remove
	 *
	 * @param condition - A condition to match items in the list.
	 *
	 * @returns The {@link List} instance with the matching items removed.
	 */
	remove(condition: (value: T) => boolean): this;

	/**
	 * Replaces any items in the list that match the given condition with the
	 * given replacement item.
	 *
	 * @see https://infra.spec.whatwg.org/#list-replace
	 *
	 * @param condition - A condition to match items in the list.
	 * @param replacement - An item to replace the matching items.
	 *
	 * @returns The {@link List} instance with the matching items replaced.
	 */
	replace(condition: (value: T) => boolean, replacement: T): this;

	/**
	 * Frees internal resources used by the {@link List}.
	 */
	[Symbol.dispose](): void;

	/**
	 * Override {@link Array} methods that return arrays to ensure they return
	 * lists.
	 *
	 * @remarks
	 * This is handled by the `get` trap in the {@link List} prototype proxy,
	 * which returns a higher-order function for every method and ensures that if
	 * the result is an array, it is converted to a {@link List}.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	concat(...items: ReadonlyArray<ConcatList<T>>): List<T>;
	concat(...items: ReadonlyArray<T | ConcatList<T>>): List<T>;
	filter<S extends T>(predicate: (value: T, index: number, array: List<T>) => value is S, thisArg?: unknown): List<S>;
	filter(predicate: (value: T, index: number, array: List<T>) => unknown, thisArg?: unknown): List<T>;
	flat<A, D extends number = 1>(this: A, depth?: D): List<FlatList<A, D>>;
	flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: List<T>) => U | ReadonlyArray<U>, thisArg?: This): List<U>;
	map<U>(callbackfn: (value: T, index: number, array: List<T>) => U, thisArg?: unknown): List<U>;
	slice(start?: number, end?: number): List<T>;
	splice(start: number, deleteCount?: number): List<T>;
	splice(start: number, deleteCount: number, ...items: ReadonlyArray<T>): List<T>;
	toReversed(): List<T>;
	toSorted(compareFn?: (a: T, b: T) => number): List<T>;
	toSpliced(start: number, deleteCount: number, ...items: ReadonlyArray<T>): List<T>;
  toSpliced(start: number, deleteCount?: number): List<T>;
	with(index: number, value: T): List<T>;
}

/**
 * A constructor that creates a new {@link List} instance and includes
 * Array-like static methods.
 */
export interface ListConstructor {
	new <T>(...args: ConstructorParameters<ArrayConstructor>): List<T>;
	<T>(...args: ConstructorParameters<ArrayConstructor>): List<T>;

	readonly prototype: List;
	readonly [Symbol.species]: ListConstructor;

	/**
	 * Override static {@link Array} methods that return arrays to ensure they
	 * return lists.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	from<T>(iterable: Iterable<T> | ListLike<T>): List<T>;
	from<T, U>(iterable: Iterable<T> | ListLike<T>, mapfn: (v: T, k: number) => U, thisArg?: unknown): List<U>;
	fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ListLike<T | PromiseLike<T>>): Promise<List<T>>;
	fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ListLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: unknown): Promise<List<Awaited<U>>>;
	isList<T = unknown>(arg: unknown): arg is List<T>;
	of<T>(...items: ReadonlyArray<T>): List<T>;
}

/**
 * Creates a new {@link List} instance.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array#parameters
 *
 * @typeParam T - The type of items contained in the {@link List}.
 *
 * @param args - The items to populate the list with or a length to create an
 * empty list.
 *
 * @returns A new {@link List} instance.
 */
export const List = function<T>(
	this: List<T>,
	...args: ConstructorParameters<ArrayConstructor>
) {
	const instance = Array.apply(this, args);

	Object.setPrototypeOf(instance, List.prototype);

	return instance;
} as unknown as ListConstructor;

/**
 * Checks that an `unknown` value is a finite {@link List} of items.
 *
 * Requirements:
 *   - `value` must be an instance of {@link List}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a finite {@link List} of items.
 */
export const isList = <T>(value: unknown): value is List<T> =>
	value instanceof List;

/**
 * The prototype object for the {@link List} constructor as a `Proxy` to
 * override methods that return arrays to ensure they return lists.
 */
const __PROTO__ = new Proxy(Array.prototype, {
	get(_: typeof Array.prototype, key: string | symbol, instance: List) {
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

			if (Array.isArray(result) && !(result instanceof List)) {
				return List.from(result);
			}

			return result;
		};
	},
});

Object.defineProperties(List, {
	prototype: {
		value: Object.seal(Object.create(__PROTO__, {
			append: {
				value<T = unknown>(this: List<T>, item: T) {
					this.push(item);

					return this;
				},
				configurable: true,
				writable: true,
			},
			ascending: {
				value<T = unknown>(this: List<T>, by?: (a: T, b: T) => number) {
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
				value<T = unknown>(this: List<T>) {
					return List.from(this);
				},
				configurable: true,
				writable: true,
			},
			contains: {
				value<T>(this: List<T>, value: T) {
					return this.includes(value);
				},
				configurable: true,
				writable: true,
			},
			descending: {
				value<T = unknown>(this: List<T>, by?: (a: T, b: T) => number) {
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
			empty: {
				value<T = unknown>(this: List<T>) {
					Array.prototype.splice.call(this, 0, Infinity);

					return this;
				},
				configurable: true,
				writable: true,
			},
			extend: {
				value<T = unknown>(this: List<T>, items: ListLike<T>) {
					this.push(...([...items] as ReadonlyArray<T>));

					return this;
				},
				configurable: true,
				writable: true,
			},
			indices: {
				value<T = unknown>(this: List<T>) {
					return Object.freeze(OrderedSet.range(0, this.length));
				},
				configurable: true,
				writable: true,
			},
			insert: {
				value<T = unknown>(this: List<T>, item: T, before: number) {
					this.splice(before, 0, item);

					return this;
				},
				configurable: true,
				writable: true,
			},
			isEmpty: {
				value<T = unknown>(this: List<T>) {
					return this.length === 0;
				},
				configurable: true,
				writable: true,
			},
			prepend: {
				value<T = unknown>(this: List<T>, item: T) {
					this.unshift(item);

					return this;
				},
				configurable: true,
				writable: true,
			},
			remove: {
				value<T = unknown>(this: List<T>, condition: (value: T) => boolean) {
					if (!this.isEmpty()) {
						let index = 0;

						for (const item of this) {
							if (!condition(item)) {
								this[index] = item;
								index += 1;
							}
						}

						this.length = index;
					}

					return this;
				},
				configurable: true,
				writable: true,
			},
			replace: {
				value<T = unknown>(this: List<T>, condition: (value: T) => boolean, replacement: T) {
					for (const [index, value] of this.entries()) {
						if (condition(value)) {
							this[index] = replacement;
						}
					}

					return this;
				},
				configurable: true,
				writable: true,
			},
			constructor: {
				value: List,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value<T>(this: List<T>) {
					this.empty();
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'List',
				configurable: true,
			},
		})),
	},
	from: {
		value<T, U>(...args: Parameters<typeof Array.from<T, U>>) {
			return new List<U>().extend(Array.from<T, U>(...args));
		},
		configurable: true,
		writable: true,
	},
	fromAsync: {
		async value<T, U>(...args: Parameters<typeof Array.fromAsync<T, U>>) {
			return new List<Awaited<U>>().extend((await Array.fromAsync<T, U>(...args)));
		},
		configurable: true,
		writable: true,
	},
	isList: {
		value: isList,
		configurable: true,
		writable: true,
	},
	of: {
		value<T>(...args: Parameters<typeof Array.of<T>>) {
			return List.from<T>(Array.of<T>(...args));
		},
		configurable: true,
		writable: true,
	},
	[Symbol.species]: {
		get() {
			return List;
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
				prototype[Symbol.toStringTag] === 'List';
		},
	},
});

Object.seal(List);

export default List;
