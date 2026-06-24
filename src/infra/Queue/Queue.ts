import OrderedSet from '#infra/OrderedSet';
import type { ListLike } from '#infra/ListLike';

/**
 * An alias for queues returned by {@link Array.concat()}.
 */
export interface ConcatQueue<T = unknown> extends ConcatArray<T> {
	slice(start?: number, end?: number): Queue<T>;
	[Symbol.dispose](): void;
}

/**
 * An alias for queues returned by {@link Array.flat()} and {@link Array.flatMap()}.
 */
export type FlatQueue<L, D extends number> = FlatArray<L, D>;

/**
 * A queue is a list where items are added at the end and removed from the
 * front.
 *
 * @see https://infra.spec.whatwg.org/#queues
 *
 * @typeParam T - The type of items contained in the {@link ReadonlyQueue}.
 *
 * @remarks
 * Although `queues` are lists, `forEach()` must not be used with them; instead,
 * a combination of `while` and `dequeue()` is more appropriate.
 */
export interface ReadonlyQueue<T = unknown> extends ReadonlyArray<T> {
	/**
	 * Sorts the queue in ascending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-ascending-order
	 *
	 * @param by - A comparison function to sort the queue by.
	 *
	 * @returns A new {@link Queue} sorted in ascending order.
	 */
	ascending(by?: (a: T, b: T) => number): Queue<T>;

	/**
	 * Creates a shallow copy of the set, meaning that the set is cloned, but the
	 * items themselves are not cloned.
	 *
	 * @see https://infra.spec.whatwg.org/#list-clone
	 *
	 * @returns A new {@link Queue} instance containing the same items as the
	 * original.
	 */
	clone(): Queue<T>;

	/**
	 * Determines if the queue contains a given item.
	 *
	 * @see https://infra.spec.whatwg.org/#list-contain
	 *
	 * @param value - The item to locate in the queue.
	 *
	 * @returns A boolean which is `true` if the given `value` is in the queue,
	 * `false` otherwise.
	 */
	contains(value: T): boolean;

	/**
	 * Sorts the queue in descending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-descending-order
	 *
	 * @param by - A comparison function to sort the queue by.
	 *
	 * @returns A new {@link Queue} sorted in descending order.
	 */
	descending(by?: (a: T, b: T) => number): Queue<T>;

	/**
	 * Returns the range from 0 to the set's size, exclusive.
	 *
	 * @see https://infra.spec.whatwg.org/#list-get-the-indices
	 *
	 * @returns An {@link OrderedSet} of the number indices in the set.
	 */
	indices(): OrderedSet<number>;

	/**
	 * Determines if the set's size is `0`.
	 *
	 * @see https://infra.spec.whatwg.org/#list-is-empty
	 *
	 * @returns A boolean which is `true` if this set is empty, `false` otherwise.
	 */
	isEmpty(): boolean;

	/**
	 * Frees internal resources used by the {@link Queue}.
	 */
	[Symbol.dispose](): void;

	/**
	 * Override {@link ReadonlyArray} methods that return arrays to ensure they
	 * return queues.
	 *
	 * @remarks
	 * This is handled by the `get` trap in the {@link Queue} prototype proxy,
	 * which returns a higher-order function for every method and ensures that if
	 * the result is an array, it is converted to a {@link Queue}.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	concat(...items: ReadonlyArray<ConcatQueue<T>>): Queue<T>;
	concat(...items: ReadonlyArray<T | ConcatQueue<T>>): Queue<T>;
	filter<S extends T>(predicate: (value: T, index: number, array: Queue<T>) => value is S, thisArg?: unknown): Queue<S>;
	filter(predicate: (value: T, index: number, array: Queue<T>) => unknown, thisArg?: unknown): Queue<T>;
	flat<A, D extends number = 1>(this: A, depth?: D): Queue<FlatQueue<A, D>>;
	flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: Queue<T>) => U | ReadonlyArray<U>, thisArg?: This): Queue<U>;
	map<U>(callbackfn: (value: T, index: number, array: Queue<T>) => U, thisArg?: unknown): Queue<U>;
	slice(start?: number, end?: number): Queue<T>;
	toReversed(): Queue<T>;
	toSorted(compareFn?: (a: T, b: T) => number): Queue<T>;
	toSpliced(start: number, deleteCount: number, ...items: ReadonlyArray<T>): Queue<T>;
	toSpliced(start: number, deleteCount?: number): Queue<T>;
	with(index: number, value: T): Queue<T>;
}

/**
 * A queue is a list where items are added at the end and removed from the
 * front.
 *
 * @see https://infra.spec.whatwg.org/#queues
 *
 * @typeParam T - The type of items contained in the {@link Queue}.
 *
 * @remarks
 * Although `queues` are lists, `forEach()` must not be used with them; instead,
 * a combination of `while` and `dequeue()` is more appropriate.
 */
export interface Queue<T = unknown> extends Array<T> {
	/**
	 * Sorts the queue in ascending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-ascending-order
	 *
	 * @param by - A comparison function to sort the queue by.
	 *
	 * @returns A new {@link Queue} sorted in ascending order.
	 */
	ascending(by?: (a: T, b: T) => number): Queue<T>;

	/**
	 * Creates a shallow copy of the queue, meaning that the queue is cloned, but
	 * the items themselves are not cloned.
	 *
	 * @see https://infra.spec.whatwg.org/#list-clone
	 *
	 * @returns A new {@link Queue} instance containing the same items as the
	 * original.
	 */
	clone(): Queue<T>;

	/**
	 * Determines if the queue contains a given item.
	 *
	 * @see https://infra.spec.whatwg.org/#list-contain
	 *
	 * @param value - The item to locate in the queue.
	 *
	 * @returns A boolean which is `true` if the given `value` is in the queue,
	 * `false` otherwise.
	 */
	contains(value: T): boolean;

	/**
	 * Sorts the queue in descending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-descending-order
	 *
	 * @param by - A comparison function to sort the queue by.
	 *
	 * @returns A new {@link Queue} sorted in descending order.
	 */
	descending(by?: (a: T, b: T) => number): Queue<T>;

	/**
	 * Returns the item at the front of the queue without removing it.
	 *
	 * @see https://infra.spec.whatwg.org/#queue-dequeue
	 *
	 * @returns The first item in the {@link Queue}, or `undefined` if the queue is
	 * empty.
	 */
	dequeue(): T | undefined;

	/**
	 * Removes all items from the list.
	 *
	 * @see https://infra.spec.whatwg.org/#list-empty
	 *
	 * @returns The {@link List} instance after removing all items.
	 */
	empty(): this;

	/**
	 * Appends the given item to the end of the queue.
	 *
	 * @see https://infra.spec.whatwg.org/#queue-enqueue
	 *
	 * @param item - An item to be added to the queue.
	 *
	 * @returns The {@link Queue} instance with the given `item` added.
	 */
	enqueue(item: T): this;

	/**
	 * Appends every item in the given list to the end of the list.
	 *
	 * @see https://infra.spec.whatwg.org/#list-extend
	 *
	 * @param queue - A {@link ListLike} collection of items to be added to the queue.
	 *
	 * @returns The {@link Queue} instance with the given `items` added.
	 */
	extend(items: ListLike<T>): this;

	/**
	 * Returns the range from 0 to the queue's size, exclusive.
	 *
	 * @see https://infra.spec.whatwg.org/#list-get-the-indices
	 *
	 * @returns An {@link OrderedSet} of the number indices in the queue.
	 */
	indices(): OrderedSet<number>;

	/**
	 * Inserts an item at the given index in the queue.
	 *
	 * @see https://infra.spec.whatwg.org/#list-insert
	 *
	 * @param item - An item to be inserted into the queue.
	 * @param at - The index at which to insert the item.
	 *
	 * @returns The {@link ListLike} instance with the given `item` inserted.
	 */
	insert(item: T, at: number): this;

	/**
	 * Determines if the queue's size is `0`.
	 *
	 * @see https://infra.spec.whatwg.org/#list-is-empty
	 *
	 * @returns A boolean which is `true` if this queue is empty, `false`
	 * otherwise.
	 */
	isEmpty(): boolean;

	/**
	 * Replaces any items in the queue that match the given condition with the
	 * given replacement item.
	 *
	 * @see https://infra.spec.whatwg.org/#list-replace
	 *
	 * @param condition - A condition to match items in the queue.
	 * @param replacement - An item to replace the matching items.
	 *
	 * @returns The {@link Queue} instance with the matching items replaced.
	 */
	replace(condition: (value: T) => boolean, replacement: T): this;

	/**
	 * Frees internal resources used by the {@link Queue}.
	 */
	[Symbol.dispose](): void;

	/**
	 * Override {@link Array} methods that return arrays to ensure they return
	 * queues.
	 *
	 * @remarks
	 * This is handled by the `get` trap in the {@link Queue} prototype proxy,
	 * which returns a higher-order function for every method and ensures that if
	 * the result is an array, it is converted to a {@link Queue}.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	concat(...items: ReadonlyArray<ConcatQueue<T>>): Queue<T>;
	concat(...items: ReadonlyArray<T | ConcatQueue<T>>): Queue<T>;
	filter<S extends T>(predicate: (value: T, index: number, array: Queue<T>) => value is S, thisArg?: unknown): Queue<S>;
	filter(predicate: (value: T, index: number, array: Queue<T>) => unknown, thisArg?: unknown): Queue<T>;
	flat<A, D extends number = 1>(this: A, depth?: D): Queue<FlatQueue<A, D>>;
	flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: Queue<T>) => U | ReadonlyArray<U>, thisArg?: This): Queue<U>;
	map<U>(callbackfn: (value: T, index: number, array: Queue<T>) => U, thisArg?: unknown): Queue<U>;
	slice(start?: number, end?: number): Queue<T>;
	splice(start: number, deleteCount?: number): Queue<T>;
	splice(start: number, deleteCount: number, ...items: ReadonlyArray<T>): Queue<T>;
	toReversed(): Queue<T>;
	toSorted(compareFn?: (a: T, b: T) => number): Queue<T>;
	toSpliced(start: number, deleteCount: number, ...items: ReadonlyArray<T>): Queue<T>;
	toSpliced(start: number, deleteCount?: number): Queue<T>;
	with(index: number, value: T): Queue<T>;
}

/**
 * A constructor that creates a new {@link Queue} instance and includes
 * Array-like static methods.
 */
export interface QueueConstructor extends ArrayConstructor {
	new <T>(...args: ConstructorParameters<ArrayConstructor>): Queue<T>;
	<T>(...args: ConstructorParameters<ArrayConstructor>): Queue<T>;

	readonly prototype: Queue;
	readonly [Symbol.species]: QueueConstructor;

	/**
	 * Override static {@link Array} methods that return arrays to ensure they
	 * return queues.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	from<T>(iterable: Iterable<T> | ArrayLike<T>): Queue<T>;
	from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: unknown): Queue<U>;
	fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<Queue<T>>;
	fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: unknown): Promise<Queue<Awaited<U>>>;
	isQueue<T = unknown>(arg: unknown): arg is Queue<T>;
	of<T>(...items: ReadonlyArray<T>): Queue<T>;
}

/**
 * Creates a new {@link Queue} instance.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array#parameters
 *
 * @typeParam T - The type of items contained in the {@link Queue}.
 *
 * @param args - The items to populate the queue with or a length to create an
 * empty queue.
 *
 * @returns A new {@link Queue} instance.
 */
export const Queue = function<T>(
	this: Queue<T>,
	...args: ConstructorParameters<ArrayConstructor>
) {
	const instance = Array.apply(this, args);

	Object.setPrototypeOf(instance, Queue.prototype);

	return instance;
} as unknown as QueueConstructor;

/**
 * Checks that an `unknown` value is a finite {@link Queue} of items.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Queue}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a finite {@link Queue} of items.
 */
export const isQueue = <T>(value: unknown): value is Queue<T> =>
	value instanceof Queue;

/**
 * The prototype object for the {@link Queue} constructor as a `Proxy` to
 * override methods that return arrays to ensure they return queues.
 */
const __PROTO__ = new Proxy(Array.prototype, {
	get(_: typeof Array.prototype, key: string | symbol, instance: Queue) {
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

			if (Array.isArray(result) && !(result instanceof Queue)) {
				return Queue.from(result);
			}

			return result;
		};
	},
});

Object.defineProperties(Queue, {
	prototype: {
		value: Object.seal(Object.create(__PROTO__, {
			ascending: {
				value<T = unknown>(this: Queue<T>, by?: (a: T, b: T) => number) {
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
				value<T = unknown>(this: Queue<T>) {
					return Queue.from(this);
				},
				configurable: true,
				writable: true,
			},
			contains: {
				value<T>(this: Queue<T>, value: T) {
					return this.includes(value);
				},
				configurable: true,
				writable: true,
			},
			dequeue: {
				value<T = unknown>(this: Queue<T>) {
					return this.shift();
				},
				configurable: true,
				writable: true,
			},
			descending: {
				value<T = unknown>(this: Queue<T>, by?: (a: T, b: T) => number) {
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
				value<T = unknown>(this: Queue<T>) {
					Array.prototype.splice.call(this, 0, Infinity);

					return this;
				},
				configurable: true,
				writable: true,
			},
			enqueue: {
				value<T = unknown>(this: Queue<T>, item: T) {
					this.push(item);

					return this;
				},
				configurable: true,
				writable: true,
			},
			extend: {
				value<T = unknown>(this: Queue<T>, items: ListLike<T>) {
					this.push(...([...items] as ReadonlyArray<T>));

					return this;
				},
				configurable: true,
				writable: true,
			},
			indices: {
				value<T = unknown>(this: Queue<T>) {
					return Object.freeze(OrderedSet.range(0, this.length));
				},
				configurable: true,
				writable: true,
			},
			insert: {
				value<T = unknown>(this: Queue<T>, item: T, at: number) {
					this.splice(at, 0, item);

					return this;
				},
				configurable: true,
				writable: true,
			},
			isEmpty: {
				value<T = unknown>(this: Queue<T>) {
					return this.length === 0;
				},
				configurable: true,
				writable: true,
			},
			replace: {
				value<T = unknown>(this: Queue<T>, condition: (value: T) => boolean, replacement: T) {
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
				value: Queue,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value<T>(this: Queue<T>) {
					this.empty();
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'Queue',
				configurable: true,
			},
		})),
	},
	from: {
		value<T, U>(...args: Parameters<typeof Array.from<T, U>>) {
			return new Queue<U>().extend(Array.from<T, U>(...args));
		},
		configurable: true,
		writable: true,
	},
	fromAsync: {
		async value<T, U>(...args: Parameters<typeof Array.fromAsync<T, U>>) {
			return new Queue<Awaited<U>>().extend((await Array.fromAsync<T, U>(...args)));
		},
		configurable: true,
		writable: true,
	},
	isQueue: {
		value: isQueue,
		configurable: true,
		writable: true,
	},
	of: {
		value<T>(...args: Parameters<typeof Array.of<T>>) {
			return Queue.from<T>(Array.of<T>(...args));
		},
		configurable: true,
		writable: true,
	},
	[Symbol.species]: {
		get() {
			return Queue;
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
				prototype[Symbol.toStringTag] === 'Queue';
		},
	},
});

Object.seal(Queue);

export default Queue;
