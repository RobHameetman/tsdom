import OrderedSet from '@/infra/OrderedSet';
import type { ListLike } from '@/infra/ListLike';

/**
 * An alias for stacks returned by {@link Array.concat()}.
 */
export interface ConcatStack<T = unknown> extends ConcatArray<T> {
	slice(start?: number, end?: number): Stack<T>;
	[Symbol.dispose](): void;
}

/**
 * An alias for stacks returned by {@link Array.flat()} and {@link Array.flatMap()}.
 */
export type FlatStack<L, D extends number> = FlatArray<L, D>;

/**
 * A stack is a list where items are added and removed from the end.
 *
 * @see https://infra.spec.whatwg.org/#stacks
 *
 * @typeParam T - The type of items contained in the {@link ReadonlyStack}.
 *
 * @remarks
 * Although stacks are lists, `forEach()` must not be used with them; instead, a
 * combination of `while` and `pop()` is more appropriate.
 */
export interface ReadonlyStack<T = unknown> extends ReadonlyArray<T> {
	/**
	 * Sorts the stack in ascending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-ascending-order
	 *
	 * @param by - A comparison function to sort the stack by.
	 *
	 * @returns A new {@link Stack} sorted in ascending order.
	 */
	ascending(by?: (a: T, b: T) => number): Stack<T>;

	/**
	 * Creates a shallow copy of the stack, meaning that the stack is cloned, but
	 * the items themselves are not cloned.
	 *
	 * @see https://infra.spec.whatwg.org/#list-clone
	 *
	 * @returns A new {@link Stack} instance containing the same items as the
	 * original.
	 */
	clone(): Stack<T>;

	/**
	 * Determines if the stack contains a given item.
	 *
	 * @see https://infra.spec.whatwg.org/#list-contain
	 *
	 * @param value - The item to locate in the stack.
	 *
	 * @returns A boolean which is `true` if the given `value` is in the stack,
	 * `false` otherwise.
	 */
	contains(value: T): boolean;

	/**
	 * Sorts the stack in descending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-descending-order
	 *
	 * @param by - A comparison function to sort the stack by.
	 *
	 * @returns A new {@link Stack} sorted in descending order.
	 */
	descending(by?: (a: T, b: T) => number): Stack<T>;

	/**
	 * Returns the range from 0 to the stack's size, exclusive.
	 *
	 * @see https://infra.spec.whatwg.org/#list-get-the-indices
	 *
	 * @returns An {@link OrderedSet} of the number indices in the stack.
	 */
	indices(): OrderedSet<number>;

	/**
	 * Determines if the stack's size is `0`.
	 *
	 * @see https://infra.spec.whatwg.org/#list-is-empty
	 *
	 * @returns A boolean which is `true` if this stack is empty, `false` otherwise.
	 */
	isEmpty(): boolean;

	/**
	 * Returns the item at the top of the stack without removing it.
	 *
	 * @see https://infra.spec.whatwg.org/#stack-peek
	 *
	 * @returns The last item in the {@link Stack}, or `undefined` if the stack is
	 * empty.
	 */
	peek(): T | undefined;

	/**
	 * Frees internal resources used by the {@link Stack}.
	 */
	[Symbol.dispose](): void;

	/**
	 * Override {@link Array} methods that return arrays to ensure they return
	 * stacks.
	 *
	 * @remarks
	 * This is handled by the `get` trap in the {@link Stack} prototype proxy,
	 * which returns a higher-order function for every method and ensures that if
	 * the result is an array, it is converted to a {@link Stack}.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	concat(...items: ReadonlyArray<ConcatStack<T>>): Stack<T>;
	concat(...items: ReadonlyArray<T | ConcatStack<T>>): Stack<T>;
	filter<S extends T>(predicate: (value: T, index: number, array: Stack<T>) => value is S, thisArg?: unknown): Stack<S>;
	filter(predicate: (value: T, index: number, array: Stack<T>) => unknown, thisArg?: unknown): Stack<T>;
	flat<A, D extends number = 1>(this: A, depth?: D): Stack<FlatStack<A, D>>;
	flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: Stack<T>) => U | ReadonlyArray<U>, thisArg?: This): Stack<U>;
	map<U>(callbackfn: (value: T, index: number, array: Stack<T>) => U, thisArg?: unknown): Stack<U>;
	slice(start?: number, end?: number): Stack<T>;
	toReversed(): Stack<T>;
	toSorted(compareFn?: (a: T, b: T) => number): Stack<T>;
	toSpliced(start: number, deleteCount: number, ...items: ReadonlyArray<T>): Stack<T>;
	toSpliced(start: number, deleteCount?: number): Stack<T>;
	with(index: number, value: T): Stack<T>;
}

/**
 * A stack is a list where items are added and removed from the end.
 *
 * @see https://infra.spec.whatwg.org/#stacks
 *
 * @typeParam T - The type of items contained in the {@link Stack}.
 *
 * @remarks
 * Although stacks are lists, `forEach()` must not be used with them; instead, a
 * combination of `while` and `pop()` is more appropriate.
 */
export interface Stack<T = unknown> extends Array<T> {
	/**
	 * Sorts the stack in ascending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-ascending-order
	 *
	 * @param by - A comparison function to sort the stack by.
	 *
	 * @returns A new {@link Stack} sorted in ascending order.
	 */
	ascending(by?: (a: T, b: T) => number): Stack<T>;

	/**
	 * Creates a shallow copy of the stack, meaning that the stack is cloned, but
	 * the items themselves are not cloned.
	 *
	 * @see https://infra.spec.whatwg.org/#list-clone
	 *
	 * @returns A new {@link Stack} instance containing the same items as the
	 * original.
	 */
	clone(): Stack<T>;

	/**
	 * Determines if the stack contains a given item.
	 *
	 * @see https://infra.spec.whatwg.org/#list-contain
	 *
	 * @param value - The item to locate in the stack.
	 *
	 * @returns A boolean which is `true` if the given `value` is in the stack,
	 * `false` otherwise.
	 */
	contains(value: T): boolean;

	/**
	 * Sorts the stack in descending order based on the given comparison function.
	 *
	 * @see https://infra.spec.whatwg.org/#list-sort-in-descending-order
	 *
	 * @param by - A comparison function to sort the stack by.
	 *
	 * @returns A new {@link Stack} sorted in descending order.
	 */
	descending(by?: (a: T, b: T) => number): Stack<T>;

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
	 * @param stack - A {@link ListLike} collection of items to be added to the stack.
	 *
	 * @returns The {@link Stack} instance with the given `items` added.
	 */
	extend(items: ListLike<T>): this;

	/**
	 * Returns the range from 0 to the stack's size, exclusive.
	 *
	 * @see https://infra.spec.whatwg.org/#list-get-the-indices
	 *
	 * @returns An {@link OrderedSet} of the number indices in the stack.
	 */
	indices(): OrderedSet<number>;

	/**
	 * Inserts an item at the given index in the stack.
	 *
	 * @see https://infra.spec.whatwg.org/#list-insert
	 *
	 * @param item - An item to be inserted into the stack.
	 * @param at - The index at which to insert the item.
	 *
	 * @returns The {@link ListLike} instance with the given `item` inserted.
	 */
	insert(item: T, at: number): this;

	/**
	 * Determines if the stack's size is `0`.
	 *
	 * @see https://infra.spec.whatwg.org/#list-is-empty
	 *
	 * @returns A boolean which is `true` if this stack is empty, `false` otherwise.
	 */
	isEmpty(): boolean;

	/**
	 * Returns the item at the top of the stack without removing it.
	 *
	 * @see https://infra.spec.whatwg.org/#stack-peek
	 *
	 * @returns The last item in the {@link Stack}, or `undefined` if the stack is
	 * empty.
	 */
	peek(): T | undefined;

	/**
	 * Replaces any items in the stack that match the given condition with the
	 * given replacement item.
	 *
	 * @see https://infra.spec.whatwg.org/#list-replace
	 *
	 * @param condition - A condition to match items in the stack.
	 * @param replacement - An item to replace the matching items.
	 *
	 * @returns The {@link Stack} instance with the matching items replaced.
	 */
	replace(condition: (value: T) => boolean, replacement: T): this;

	/**
	 * Frees internal resources used by the {@link Stack}.
	 */
	[Symbol.dispose](): void;

	/**
	 * Override {@link Array} methods that return arrays to ensure they return
	 * stacks.
	 *
	 * @remarks
	 * This is handled by the `get` trap in the {@link Stack} prototype proxy,
	 * which returns a higher-order function for every method and ensures that if
	 * the result is an array, it is converted to a {@link Stack}.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	concat(...items: ReadonlyArray<ConcatStack<T>>): Stack<T>;
	concat(...items: ReadonlyArray<T | ConcatStack<T>>): Stack<T>;
	filter<S extends T>(predicate: (value: T, index: number, array: Stack<T>) => value is S, thisArg?: unknown): Stack<S>;
	filter(predicate: (value: T, index: number, array: Stack<T>) => unknown, thisArg?: unknown): Stack<T>;
	flat<A, D extends number = 1>(this: A, depth?: D): Stack<FlatStack<A, D>>;
	flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: Stack<T>) => U | ReadonlyArray<U>, thisArg?: This): Stack<U>;
	map<U>(callbackfn: (value: T, index: number, array: Stack<T>) => U, thisArg?: unknown): Stack<U>;
	slice(start?: number, end?: number): Stack<T>;
	splice(start: number, deleteCount?: number): Stack<T>;
	splice(start: number, deleteCount: number, ...items: ReadonlyArray<T>): Stack<T>;
	toReversed(): Stack<T>;
	toSorted(compareFn?: (a: T, b: T) => number): Stack<T>;
	toSpliced(start: number, deleteCount: number, ...items: ReadonlyArray<T>): Stack<T>;
	toSpliced(start: number, deleteCount?: number): Stack<T>;
	with(index: number, value: T): Stack<T>;
}

/**
 * A constructor that creates a new {@link Stack} instance and includes
 * Array-like static methods.
 */
export interface StackConstructor {
	new <T>(...args: ConstructorParameters<ArrayConstructor>): Stack<T>;
	<T>(...args: ConstructorParameters<ArrayConstructor>): Stack<T>;

	readonly prototype: Stack;
	readonly [Symbol.species]: StackConstructor;

	/**
	 * Override static {@link Array} methods that return arrays to ensure they
	 * return stacks.
	 *
	 * @privateRemarks
	 * We have to use adjusted versions of the annotations as they are defined in
	 * their type definition files instead of inferring these signatures using
	 * `Parameters<>`.
	 */
	from<T>(iterable: Iterable<T> | ArrayLike<T>): Stack<T>;
	from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: unknown): Stack<U>;
	fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<Stack<T>>;
	fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: unknown): Promise<Stack<Awaited<U>>>;
	isStack<T = unknown>(arg: unknown): arg is Stack<T>;
	of<T>(...items: ReadonlyArray<T>): Stack<T>;
}

/**
 * Creates a new {@link Stack} instance.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array#parameters
 *
 * @typeParam T - The type of items contained in the {@link Stack}.
 *
 * @param args - The items to populate the stack with or a length to create an
 * empty stack.
 *
 * @returns A new {@link Stack} instance.
 */
export const Stack = function<T>(
	this: Stack<T>,
	...args: ConstructorParameters<ArrayConstructor>
) {
	const instance = Array.apply(this, args);

	Object.setPrototypeOf(instance, Stack.prototype);

	return instance;
} as unknown as StackConstructor;

/**
 * Checks that an `unknown` value is a finite {@link Stack} of items.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Stack}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a finite {@link Stack} of items.
 */
export const isStack = <T>(value: unknown): value is Stack<T> =>
	value instanceof Stack;

/**
 * The prototype object for the {@link Stack} constructor as a `Proxy` to
 * override methods that return arrays to ensure they return stacks.
 */
const __PROTO__ = new Proxy(Array.prototype, {
	get(_: typeof Array.prototype, key: string | symbol, instance: Stack) {
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

			if (Array.isArray(result) && !(result instanceof Stack)) {
				return Stack.from(result);
			}

			return result;
		};
	},
});

Object.defineProperties(Stack, {
	prototype: {
		value: Object.seal(Object.create(__PROTO__, {
			ascending: {
				value<T = unknown>(this: Stack<T>, by?: (a: T, b: T) => number) {
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
				value<T = unknown>(this: Stack<T>) {
					return Stack.from(this);
				},
				configurable: true,
				writable: true,
			},
			contains: {
				value<T>(this: Stack<T>, value: T) {
					return this.includes(value);
				},
				configurable: true,
				writable: true,
			},
			descending: {
				value<T = unknown>(this: Stack<T>, by?: (a: T, b: T) => number) {
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
				value<T = unknown>(this: Stack<T>) {
					Array.prototype.splice.call(this, 0, Infinity);

					return this;
				},
				configurable: true,
				writable: true,
			},
			extend: {
				value<T = unknown>(this: Stack<T>, items: ListLike<T>) {
					this.push(...([...items] as ReadonlyArray<T>));

					return this;
				},
				configurable: true,
				writable: true,
			},
			indices: {
				value<T = unknown>(this: Stack<T>) {
					return Object.freeze(OrderedSet.range(0, this.length));
				},
				configurable: true,
				writable: true,
			},
			insert: {
				value<T = unknown>(this: Stack<T>, item: T, at: number) {
					this.splice(at, 0, item);

					return this;
				},
				configurable: true,
				writable: true,
			},
			isEmpty: {
				value<T = unknown>(this: Stack<T>) {
					return this.length === 0;
				},
				configurable: true,
				writable: true,
			},
			peek: {
				value<T>(this: Stack<T>) {
					return this[this.length - 1] as T | undefined;
				},
				configurable: true,
				writable: true,
			},
			replace: {
				value<T = unknown>(this: Stack<T>, condition: (value: T) => boolean, replacement: T) {
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
				value: Stack,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value<T>(this: Stack<T>) {
					this.empty();
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'Stack',
				configurable: true,
			},
		})),
	},
	from: {
		value<T, U>(...args: Parameters<typeof Array.from<T, U>>) {
			return new Stack<U>().extend(Array.from<T, U>(...args));
		},
		configurable: true,
		writable: true,
	},
	fromAsync: {
		async value<T, U>(...args: Parameters<typeof Array.fromAsync<T, U>>) {
			return new Stack<Awaited<U>>().extend((await Array.fromAsync<T, U>(...args)));
		},
		configurable: true,
		writable: true,
	},
	isStack: {
		value: isStack,
		configurable: true,
		writable: true,
	},
	of: {
		value<T>(...args: Parameters<typeof Array.of<T>>) {
			return Stack.from<T>(Array.of<T>(...args));
		},
		configurable: true,
		writable: true,
	},
	[Symbol.species]: {
		get() {
			return Stack;
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
				prototype[Symbol.toStringTag] === 'Stack';
		},
	},
});

Object.seal(Stack);

export default Stack;
