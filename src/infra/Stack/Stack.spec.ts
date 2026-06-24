import { rs, type Mocked } from '@rstest/core';
import { List } from '../List';
import { Queue } from '../Queue';
import { Stack } from './Stack';
import { OrderedSet } from '../OrderedSet';

describe('Stack', () => {
	let stack: Stack | null = null;

	beforeAll(() => {
		stack = new Stack();
	});

	afterAll(() => {
		rs.restoreAllMocks();

		stack = null;
	});

	it('should have a size as a number of items the stack contains', () => {
		expect(stack).toHaveProperty('length', expect.any(Number));
	});

	it('should be able to add items by pushing or inserting instead of appending or prepending', () => {
		expect(stack).toHaveProperty('push', expect.any(Function));
		expect(stack).toHaveProperty('insert', expect.any(Function));
		expect(stack).not.toHaveProperty('append');
		expect(stack).not.toHaveProperty('prepend');
	});

	it('should be able to check if it contains a given value as an item', () => {
		expect(stack).toHaveProperty('contains', expect.any(Function));
	});

	it('should be able to check its last item', () => {
		expect(stack).toHaveProperty('peek', expect.any(Function));
	});

	it('should be able to remove items by popping instead of removing', () => {
		expect(stack).toHaveProperty('pop', expect.any(Function));
		expect(stack).not.toHaveProperty('remove');
	});

	it('should be able to remove all of its items', () => {
		expect(stack).toHaveProperty('empty', expect.any(Function));
	});

	it('should be able to extend another collection of items', () => {
		expect(stack).toHaveProperty('extend', expect.any(Function));
	});

	it('should be able to get a range of all indices', () => {
		expect(stack).toHaveProperty('indices', expect.any(Function));
	});

	it('should be able to check if it is empty', () => {
		expect(stack).toHaveProperty('isEmpty', expect.any(Function));
	});

	it('should be able to replace items', () => {
		expect(stack).toHaveProperty('replace', expect.any(Function));
	});

	it('should be the result of invoking a constructor named Stack', () => {
		expect(Object.getPrototypeOf(stack)).toHaveProperty('constructor', Stack);
		expect(Object.getPrototypeOf(stack)).toBe(Stack.prototype);
	});

	it('should be disposable', () => {
		expect(Object.getPrototypeOf(stack)).toHaveProperty([Symbol.dispose]);
	});

	it('should have a string tag of "Stack"', () => {
		expect(Object.getPrototypeOf(stack)).toHaveProperty([Symbol.toStringTag]);
		expect(Object.prototype.toString.call(stack)).toBe('[object Stack]');
	});

	it('should have Array-like static methods', () => {
		expect(Stack).toHaveProperty('from', expect.any(Function));
		expect(Stack).toHaveProperty('fromAsync', expect.any(Function));
		expect(Stack).toHaveProperty('isStack', expect.any(Function));
		expect(Stack).toHaveProperty('of', expect.any(Function));
	});

	it('should return stacks instead of arrays from built-in Array methods that return arrays', () => {
		expect(Stack.of<number>(1, 2, 4).concat(4, 5, 6)).toBeInstanceOf(Stack);
		expect(Stack.of<unknown>(1, 2, [4]).flat()).toBeInstanceOf(Stack);
		expect(Stack.of<number>(1, 2, 4).flatMap((item) => [item, item * 2])).toBeInstanceOf(Stack);
		expect(Stack.of<number>(1, 2, 4).map((item) => item * 2)).toBeInstanceOf(Stack);
		expect(Stack.of<number>(1, 2, 4).slice(1)).toBeInstanceOf(Stack);
		expect(Stack.of<number>(1, 2, 4).toReversed()).toBeInstanceOf(Stack);
		expect(Stack.of<number>(1, 2, 4).toSorted()).toBeInstanceOf(Stack);
		expect(Stack.of<number>(1, 2, 4).toSpliced(1, 1, 3)).toBeInstanceOf(Stack);
		expect(Stack.of<number>(1, 2, 4).with(1, 3)).toBeInstanceOf(Stack);
	});

	it('should be sealed', () => {
		expect(Object.isSealed(Stack)).toBe(true);
	});
});

describe('new Stack()', () => {
	it('should return an empty stack given no arguments', () => {
		expect(new Stack()).toBeInstanceOf(Stack);
		expect(new Stack()).toHaveLength(0);
	});

	it('should return an empty stack with a length equal to the argument given one argument that is a number', () => {
		expect(new Stack(5)).toBeInstanceOf(Stack);
		expect(new Stack(5)).toHaveLength(5);
		expect(new Stack(5)).not.toContain(5);
	});

	it('should return a stack with one item given one argument that is not a number', () => {
		expect(new Stack('test')).toBeInstanceOf(Stack);
		expect(new Stack('test')).toHaveLength(1);
		expect(new Stack('test')).toContain('test');
	});

	it('should return a stack with one item given one argument that is an array of items', () => {
		expect(new Stack(['a', 'b', 'c'])).toBeInstanceOf(Stack);
		expect(new Stack(['a', 'b', 'c'])).toHaveLength(1);
		expect(new Stack(['a', 'b', 'c'])).toContainEqual(['a', 'b', 'c']);
	});

	it('should return a stack with multiple items given multiple arguments', () => {
		expect(new Stack('a', 'b', 'c')).toBeInstanceOf(Stack);
		expect(new Stack('a', 'b', 'c')).toHaveLength(3);
		expect(new Stack('a', 'b', 'c')).toContain('a');
		expect(new Stack('a', 'b', 'c')).toContain('b');
		expect(new Stack('a', 'b', 'c')).toContain('c');
	});

	it('should return a stack with duplicate items given duplicate arguments', () => {
		expect(new Stack('a', 'b', 'c', 'a')).toBeInstanceOf(Stack);
		expect(new Stack('a', 'b', 'c', 'a')).toHaveLength(4);
		expect(new Stack('a', 'b', 'c', 'a')).toEqual(Stack.of('a', 'b', 'c', 'a'));
	});
});

describe('stack[index]', () => {
	let emptyStack: Stack | null = null;
	let frozenStack: Stack | null = null;
	let stack: Stack | null = null;

	beforeEach(() => {
		emptyStack = new Stack();
		frozenStack = Object.freeze(new Stack(1, 2, 3));
		stack = new Stack(1, 2, 3);
	});

	afterEach(() => {
		emptyStack = null;
		frozenStack = null;
		stack = null;
	});

	it('should return undefined when the stack is empty given any index', () => {
		expect(emptyStack).toEqual(Stack.of());
		expect(emptyStack![0]).toBeUndefined();
		expect(emptyStack![1]).toBeUndefined();
		expect(emptyStack![-1]).toBeUndefined();
	});

	it('should return undefined when the stack is not empty given an index greater than the size of the stack', () => {
		expect(stack).toEqual(Stack.of(1, 2, 3));
		expect(stack![3]).toBeUndefined();
	});

	it('should return undefined when the stack is not empty given an index less than zero', () => {
		expect(stack).toEqual(Stack.of(1, 2, 3));
		expect(stack![-1]).toBeUndefined();
	});

	it('should return the first item when the stack is not empty given an index of zero', () => {
		expect(stack).toEqual(Stack.of(1, 2, 3));
		expect(stack![0]).toBe(1);
	});

	it('should return the correct item when the stack is not empty given an index between one and the size of the stack', () => {
		expect(stack).toEqual(Stack.of(1, 2, 3));
		expect(stack![1]).toBe(2);
		expect(stack![2]).toBe(3);
	});

	it('should assign an item when the stack is empty given an index greater than or equal to zero', () => {
		expect(emptyStack).toEqual(Stack.of());
		expect((emptyStack![1] = 4, emptyStack)![1]).toBe(4);
	});

	it('should assign an item when the stack is empty given an index less than zero', () => {
		expect(emptyStack).toEqual(Stack.of());
		expect((emptyStack![-1] = 4, emptyStack)![-1]).toBe(4);
	});

	it('should assign an item when the stack is not empty given an index of an existing item', () => {
		expect(stack).toEqual(Stack.of(1, 2, 3));
		expect((stack![1] = 4, stack)).toEqual(Stack.of(1, 4, 3));
	});

	it('should assign a duplicate item when the stack is not empty given an index of an existing item', () => {
		expect(stack).toEqual(Stack.of(1, 2, 3));
		expect((stack![1] = 1, stack)).toEqual(Stack.of(1, 1, 3));
	});

	it('should assign a duplicate item when the stack is not empty given an index greater than the size of the stack', () => {
		expect(stack).toEqual(Stack.of(1, 2, 3));
		expect((stack![3] = 1, stack)).toEqual(Stack.of(1, 2, 3, 1));
	});

	it('should not assign an item when the stack is frozen given any index', () => {
		expect(frozenStack).toEqual(Stack.of(1, 2, 3));
		expect(() => frozenStack![3] = 1).toThrow(TypeError);
	});

	it('should delete an item when the stack is not empty given an index of an existing item', () => {
		expect(stack).toEqual(Stack.of(1, 2, 3));
		expect((delete stack![1], stack)).toEqual(Stack.of(1, undefined, 3));
	});

	it('should not delete an item when the stack is not empty given an index greater than the size of the stack', () => {
		expect((delete stack![3], stack)).toEqual(Stack.of(1, 2, 3));
	});

	it('should not delete an item when the stack is empty given any index', () => {
		expect((delete emptyStack![1], emptyStack)).toEqual(Stack.of());
	});

	it('should not delete an item when the stack is frozen given any index', () => {
		expect(frozenStack).toEqual(Stack.of(1, 2, 3));
		expect(() => delete frozenStack![1]).toThrow(TypeError);
	});
});

describe('Stack.prototype', () => {
	it('should be sealed', () => {
		expect(Object.isSealed(Stack.prototype)).toBe(true);
	});

	describe('clone()', () => {
		let stack: Mocked<Stack> | null = null;

		beforeEach(() => {
			stack = rs.mocked(new Stack(1, 2, 3));
		});

		afterEach(() => {
			rs.restoreAllMocks();
			stack = null;
		});

		it('should return a new Stack instance', () => {
			expect(stack?.clone()).toBeInstanceOf(Stack);
			expect(stack?.clone()).not.toBe(stack);
		});

		it('should contain the same items in the same order', () => {
			expect(new Stack(1, 2, 3).clone()).toEqual(new Stack(1, 2, 3));
		});

		it('should have the same length as the original stack', () => {
			expect(stack?.clone()).toHaveLength(stack!.length);
		});

		it('should return a new empty stack when the stack is empty', () => {
			expect(new Stack().clone()).toEqual(new Stack());
		});

		it('should not modify the original stack when the stack is not empty', () => {
			expect(stack?.clone()).toEqual(new Stack(1, 2, 3));
		});

		it('should clone the stack when the stack contains primitive values', () => {
			expect(new Stack(1, 'two', true).clone()).toEqual(new Stack(1, 'two', true));
		});

		it('should clone the stack when the stack contains object values', () => {
			expect(new Stack({ a: 1 }, [2], 'three').clone()).toEqual(new Stack({ a: 1 }, [2], 'three'));
		});

		it('should maintain item references for objects (shallow copy)', () => {
			expect((stack?.push({ a: 1 }), stack)?.clone().at(0)).toBe(stack?.at(0));
		});

		it('should return a new stack that contains undefined when the stack contains undefined', () => {
			expect((stack?.push(undefined), stack)?.clone()).toContain(undefined);
		});

		it('should return a new stack that contains null when the stack contains null', () => {
			expect((stack?.push(null), stack)?.clone()).toContain(null);
		});
	});

	describe('contains()', () => {
		it('should return true given a value which exists in stack', () => {
			expect(new Stack('test').contains('test')).toBe(true);
		});

		it('should return false given a value which does not exist in stack', () => {
			expect(new Stack('this').contains('that')).toBe(false);
		});

		it('should return false when the stack is empty', () => {
			expect(new Stack().contains('test')).toBe(false);
			expect(new Stack().contains(undefined)).toBe(false);
			expect(new Stack().contains(null)).toBe(false);
		});

		it('should return true given undefined when the stack contains undefined', () => {
			expect(new Stack(undefined).contains(undefined)).toBe(true);
		});

		it('should return true given null when the stack contains null', () => {
			expect(new Stack(null).contains(null)).toBe(true);
		});

		it('should use strict equality comparison', () => {
			expect(new Stack({}).contains({})).toBe(false);
			expect(new Stack([]).contains([])).toBe(false);
		});
	});

	describe('empty()', () => {
		let stack: Mocked<Stack> | null = null;

		beforeEach(() => {
			stack = rs.mocked(new Stack(1, 2, 3, {}));
		});

		afterEach(() => {
			rs.restoreAllMocks();
			stack = null;
		});

		it('should return the same stack instance', () => {
			expect(stack?.empty()).toBe(stack);
		});

		it('should change the size of the stack to 0', () => {
			expect(new Stack(1, 2, 3).empty()).toHaveLength(0);
			expect(stack?.empty()).toHaveLength(0);
		});

		it('should remove all items from the stack when the stack contains one or more items', () => {
			expect(new Stack(1, 2, 3).empty()).not.toContain(1);
			expect(new Stack(1, 2, 3).empty()).not.toContain(2);
			expect(new Stack(1, 2, 3).empty()).not.toContain(3);
		});

		it('should do nothing when the stack contains no items', () => {
			expect(new Stack()).toHaveLength(0);
			expect(new Stack()).toHaveLength(0);
		});

		it('should not affect other stacks when items are shared', () => {
			expect(stack?.clone().empty()).toHaveLength(0);
			expect(stack).toHaveLength(4);
		});
	});

	describe('extend()', () => {
		let stack: Mocked<Stack> | null = null;

		beforeEach(() => {
			stack = rs.mocked(new Stack(1, 2, {}));
		});

		afterEach(() => {
			rs.restoreAllMocks();
			stack = null;
		});

		it('should add all items from the given stack to the end of the stack given a non-empty stack', () => {
			expect(new Stack(1, 2)).not.toContain(3);
			expect(new Stack(1, 2)).not.toContain(4);
			expect(new Stack(1, 2).extend(new Stack(3, 4))).toContain(3);
			expect(new Stack(1, 2).extend(new Stack(3, 4))).toContain(4);
		});

		it('should increase the size of the stack by the size of the given stack', () => {
			expect(new Stack(1, 2)).toHaveLength(2);
			expect(new Stack(1, 2).extend(new Stack(3, 4))).toHaveLength(4);
		});

		it('should return the same stack instance', () => {
			expect(stack?.extend(new Stack(3, 4))).toBe(stack);
		});

		it('should add all items from the given stack given a non-empty list-like', () => {
			expect(new Stack(1, 2)).toHaveLength(2);
			expect(new Stack(1, 2).extend([3, 4])).toEqual(new Stack(1, 2, 3, 4));
			expect(new Stack(1, 2).extend(new Set([3, 4]))).toEqual(new Stack(1, 2, 3, 4));
			expect(new Stack(1, 2).extend(new List(3, 4))).toEqual(new Stack(1, 2, 3, 4));
			expect(new Stack(1, 2).extend(new OrderedSet(3, 4))).toEqual(new Stack(1, 2, 3, 4));
			expect(new Stack(1, 2).extend(new Queue(3, 4))).toEqual(new Stack(1, 2, 3, 4));
		});

		it('should maintain the order of items added from the given stack', () => {
			expect(new Stack(1, 2).extend(new Stack(3, 4))).toEqual(new Stack(1, 2, 3, 4));
		});

		it('should add all items from the given stack when the current stack is empty', () => {
			expect(new Stack()).not.toEqual(new Stack(1, 2));
			expect(new Stack().extend(new Stack(1, 2))).toEqual(new Stack(1, 2));
		});

		it('should add all items from the given stack given the same stack when the current stack is not empty', () => {
			expect(stack).toHaveLength(3);
			expect(stack?.extend(stack)).toHaveLength(6);
		});

		it('should add all items from the given stack given a stack with duplicate items', () => {
			expect(new Stack(1, 2, 3).extend(new Stack(2, 3, 4))).toEqual(new Stack(1, 2, 3, 2, 3, 4));
		});

		it('should not modify the original stack', () => {
			expect(new Stack(1, 2).extend(stack!)).toHaveLength(5);
			expect(stack).toHaveLength(3);
		});
	});

	describe('indices()', () => {
		it('should return the range of indices as an ordered set', () => {
			expect(new Stack('a', 'b', 'c').indices()).toBeInstanceOf(OrderedSet);
		});

		it('should return an empty ordered set when the stack is empty', () => {
			expect(new Stack().indices()).toEqual(new OrderedSet());
		});

		it('should return an ordered set of numbers from 0 to length-1 when the stack is not empty', () => {
			expect(new Stack('a', 'b', 'c').indices()).toEqual(new OrderedSet(0, 1, 2));
		});

		it('should return an ordered set with a length equal to the current size of the stack', () => {
			expect(new Stack('a', 'b', 'c').indices()).toHaveLength(3);
		});

		it('should return an ordered set of indices in ascending order', () => {
			expect(new Stack('a', 'b', 'c').indices()).toEqual(new OrderedSet(0, 1, 2));
		});

		it('should return an immutable ordered set', () => {
			expect(() => new Stack('a', 'b', 'c').indices().append(3)).toThrow(TypeError);
		});
	});

	describe('insert()', () => {
		let stack: Mocked<Stack> | null = null;

		beforeEach(() => {
			stack = rs.mocked(new Stack(1, 2, {}));
		});

		afterEach(() => {
			rs.restoreAllMocks();
			stack = null;
		});

		it('should return the same stack instance', () => {
			expect(stack?.insert(1, 0)).toBe(stack);
		});

		it('should increase the size of the stack by 1', () => {
			expect(new Stack('a', 'b').insert('c', 1)).toHaveLength(3);
		});

		it('should insert the given item before the specified index given an item and a non-zero index', () => {
			expect(new Stack('a', 'c').insert('b', 1)).toEqual(new Stack('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given an item and a zero index', () => {
			expect(new Stack('b', 'c').insert('a', 0)).toEqual(new Stack('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given an item and an index equal to length', () => {
			expect(new Stack('a', 'b').insert('c', 2)).toEqual(new Stack('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given duplicate items', () => {
			expect(new Stack('a', 'b', 'c').insert('b', 2)).toEqual(new Stack('a', 'b', 'b', 'c'));
		});

		it('should insert the given item before the specified index given undefined', () => {
			expect(new Stack('a', 'b').insert(undefined, 1)).toEqual(new Stack('a', undefined, 'b'));
		});

		it('should insert the given item before the specified index given null', () => {
			expect(new Stack('a', 'b').insert(null, 1)).toEqual(new Stack('a', null, 'b'));
		});

		it('should insert the given item before the specified index in an empty stack when index is 0', () => {
			expect(new Stack().insert('a', 0)).toEqual(new Stack('a'));
		});

		it('should insert the given item before the specified index starting from the end of the stack given a negative index', () => {
			expect(new Stack('a', 'b', 'c').insert('d', -1)).toEqual(new Stack('a', 'b', 'd', 'c'));
		});

		it('should insert the given item at the end of the stack given an index larger than the size of the stack', () => {
			expect(new Stack('a', 'b', 'c').insert('d', 4)).toEqual(new Stack('a', 'b', 'c', 'd'));
		});
	});

	describe('isEmpty()', () => {
		let stack: Mocked<Stack> | null = null;

		beforeEach(() => {
			stack = rs.mocked(new Stack());
		});

		afterEach(() => {
			rs.restoreAllMocks();
			stack = null;
		});

		it('should return true when the stack contains no items', () => {
			expect(new Stack().isEmpty()).toBe(true);
		});

		it('should return false when the stack contains at least one item', () => {
			expect(new Stack(1).isEmpty()).toBe(false);
		});

		it('should return true after emptying a non-empty stack', () => {
			expect(new Stack(1, 2, 3).empty().isEmpty()).toBe(true);
		});

		it('should return false after pushing an item to an empty stack', () => {
			expect((stack?.push(1), stack)?.isEmpty()).toBe(false);
		});
	});

	describe('peek()', () => {
		let stack: Mocked<Stack> | null = null;
		let length: number | null = null;
		let tail: string | null = null;

		beforeEach(() => {
			stack = rs.mocked(new Stack('a', 'b', 'c'));
			tail = stack.at(stack.length - 1) as string;
			length = stack.length;
		});

		afterEach(() => {
			stack = null;
			length = null;
			tail = null;
		});

		it('should return the last item in the stack without removing it', () => {
			expect(stack?.peek()).toBe(tail);
			expect(stack).toContain(tail);
		});

		it('should not decrease the size of the stack', () => {
			expect(stack).toHaveLength(length!);
			expect((stack?.peek(), stack)).toHaveLength(length!);
		});

		it('should return nothing when the stack is empty', () => {
			expect(new Stack().peek()).toBeUndefined();
		});
	});

	describe('pop()', () => {
		let stack: Mocked<Stack> | null = null;
		let length: number | null = null;
		let tail: string | null = null;

		beforeEach(() => {
			stack = rs.mocked(new Stack('a', 'b', 'c'));
			tail = stack.at(stack.length - 1) as string;
			length = stack.length;
		});

		afterEach(() => {
			stack = null;
			length = null;
			tail = null;
		});

		it('should return the last item in the stack after removing it', () => {
			expect(stack?.pop()).toBe(tail);
			expect(stack).not.toContain(tail);
		});

		it('should decrease the size of the stack by 1', () => {
			expect(stack).toHaveLength(length!);
			expect((stack?.pop(), stack)).toHaveLength(length! - 1);
		});

		it('should return nothing when the stack is empty', () => {
			expect(new Stack().pop()).toBeUndefined();
		});
	});

	describe('push()', () => {
		let emptyStack: Mocked<Stack> | null = null;
		let stack: Mocked<Stack> | null = null;
		let length: number | null = null;
		let tail: string | null = null;

		beforeEach(() => {
			emptyStack = rs.mocked(new Stack());
			stack = rs.mocked(new Stack('a', 'b'));
			length = stack.length;
			tail = stack.at(-1) as string;
		});

		afterEach(() => {
			emptyStack = null;
			stack = null;
			length = null;
			tail = null;
		});

		it('should return the new length of the stack', () => {
			expect(stack?.push('test')).toBe(length! + 1);
		});

		it('should increase the size of the stack by the number of items pushed', () => {
			expect(stack).toHaveLength(length!);
			expect((stack?.push('c', 'd'), stack)).toHaveLength(length! + 2);
		});

		it('should add the given item to the end of the stack when the stack is empty given one item', () => {
			expect((emptyStack?.push('a'), emptyStack)?.at(-1)).toBe('a');
		});

		it('should add the given items to the end of the stack when the stack is empty given multiple items', () => {
			expect((emptyStack?.push('a', 'b'), emptyStack)?.at(-1)).toBe('b');
		});

		it('should add the given item to the end of the stack when the stack is not empty given one item', () => {
			expect(stack?.at(-1)).not.toBe('c');
			expect((stack?.push('c'), stack)?.at(-1)).toBe('c');
		});

		it('should add the given items to the end of the stack when the stack is not empty given multiple items', () => {
			expect(stack?.at(-1)).not.toBe('d');
			expect((stack?.push('c', 'd'), stack)?.at(-1)).toBe('d');
		});

		it('should add the given item to the end of the stack given a duplicate item', () => {
			expect((stack?.push('a'), stack)).toHaveLength(3);
			expect((stack?.push('a'), stack)?.at(-1)).toBe('a');
		});

		it('should add the given item to the end of the stack given undefined', () => {
			expect((stack?.push(undefined), stack?.at(-1))).toBeUndefined();
		});

		it('should add the given item to the end of the stack given null', () => {
			expect((stack?.push(null), stack?.at(-1))).toBeNull();
		});

		it('should not add more than one item to the end of the stack given an array of items', () => {
			expect((stack?.push(['c', 'd']), stack)).toContainEqual(expect.arrayContaining(['c', 'd']));
			expect(stack).not.toContain('c');
			expect(stack).not.toContain('d');
		});
	});

	describe('replace()', () => {
		let stack: Mocked<Stack> | null = null;
		let condition: Mocked<(value: unknown) => boolean> | null = null;
		let replacement: unknown = null;

		beforeEach(() => {
			stack = rs.mocked(new Stack());
			condition = rs.fn();
			replacement = 'd';

			stack.replace(condition, replacement);
		});

		afterEach(() => {
			rs.restoreAllMocks();
			stack = null;
		});

		it('should return the same stack instance', () => {
			expect(stack?.replace(condition!, replacement)).toBe(stack);
		});

		it('should not change the size of the stack', () => {
			expect(new Stack('a', 'b', 'c')).toHaveLength(3);
			expect(new Stack('a', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd')).toHaveLength(3);
			expect(new Stack('a', 'b', 'c').replace((item) => /[bc]/.test(item as string), 'd')).toHaveLength(3);
		});

		it('should replace all matching items with the replacement given a matching condition', () => {
			expect(new Stack('a', 'b', 'c', 'b')).not.toContain('d');
			expect(new Stack('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).not.toContain('b');
			expect(new Stack('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).toContain('d');
		});

		it('should not replace non-matching items given a matching condition', () => {
			expect(new Stack('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).toEqual(new Stack('a', 'd', 'c', 'd'));
		});

		it('should not replace any items given a non-matching condition', () => {
			expect(new Stack('a', 'b', 'c').replace((item) => /[d]/.test(item as string), 'd')).toEqual(new Stack('a', 'b', 'c'));
		});

		it('should replace every item with the replacement given a condition matching every item', () => {
			expect(new Stack('a', 'b', 'c').replace((item) => /[abc]/.test(item as string), 'd')).toEqual(new Stack('d', 'd', 'd'));
		});

		it('should replace duplicate items with the replacement given a matching condition', () => {
			expect(new Stack('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).toEqual(new Stack('a', 'd', 'c', 'd'));
			expect(new Stack('a', 'b', 'c', 'c').replace((item) => /[bc]/.test(item as string), 'd')).toEqual(new Stack('a', 'd', 'd', 'd'));
		});

		it('should replace matching items with undefined given a replacement which is undefined', () => {
			expect(new Stack('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), undefined)).toEqual(new Stack('a', undefined, 'c', undefined));
			expect(new Stack('a', 'b', 'c', 'c').replace((item) => /[bc]/.test(item as string), undefined)).toEqual(new Stack('a', undefined, undefined, undefined));
		});

		it('should replace matching items with null given a replacement which is null', () => {
			expect(new Stack('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), null)).toEqual(new Stack('a', null, 'c', null));
			expect(new Stack('a', 'b', 'c', 'c').replace((item) => /[bc]/.test(item as string), null)).toEqual(new Stack('a', null, null, null));
		});

		it('should replace matching items with the same replacement given a replacement which is the same', () => {
			expect(new Stack('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'b')).toEqual(new Stack('a', 'b', 'c', 'b'));
		});

		it('should maintain the order of non-matching items given a matching condition', () => {
			expect(new Stack('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(0)).toBe('a');
			expect(new Stack('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(1)).toBe('b');
			expect(new Stack('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(2)).toBe('b');
			expect(new Stack('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(4)).toBe('b');
		});

		it('should not call the given condition when the list is empty', () => {
			expect(condition).not.toHaveBeenCalled();
		});
	});
});

describe('Stack.from()', () => {
	it('should return a stack given an array', () => {
		expect(Stack.from([1, 2, 3])).toBeInstanceOf(Stack);
		expect(Stack.from([1, 2, 3])).toEqual(new Stack(1, 2, 3));
	});

	it('should return a stack given a set', () => {
		expect(Stack.from(new Set([1, 2, 3]))).toBeInstanceOf(Stack);
		expect(Stack.from(new Set([1, 2, 3]))).toEqual(new Stack(1, 2, 3));
	});

	it('should return a stack given a map', () => {
		expect(Stack.from(new Map([[1, 1], [2, 2], [3, 3]]))).toBeInstanceOf(Stack);
		expect(Stack.from(new Map([[1, 1], [2, 2], [3, 3]]))).toEqual(new Stack([1, 1], [2, 2], [3, 3]));
	});

	it('should return a stack given an iterable', () => {
		expect(Stack.from(new Set([1, 2, 3]).values())).toBeInstanceOf(Stack);
		expect(Stack.from(new Set([1, 2, 3]).values())).toEqual(new Stack(1, 2, 3));
	});

	it('should return a stack given an ordered set', () => {
		expect(Stack.from(new OrderedSet(1, 2, 3))).toBeInstanceOf(Stack);
		expect(Stack.from(new OrderedSet(1, 2, 3))).toEqual(new Stack(1, 2, 3));
	});

	it('should return a stack given a Stack', () => {
		expect(Stack.from(new Stack(1, 2, 3))).toBeInstanceOf(Stack);
		expect(Stack.from(new Stack(1, 2, 3))).toEqual(new Stack(1, 2, 3));
	});

	it('should return a stack given a stack', () => {
		expect(Stack.from(new Stack(1, 2, 3))).toBeInstanceOf(Stack);
		expect(Stack.from(new Stack(1, 2, 3))).toEqual(new Stack(1, 2, 3));
	});
});

describe('Stack.fromAsync()', () => {
	it('should return a Promise that resolves to a stack given an array of promises', async () => {
		await expect(Stack.fromAsync([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])).resolves.toBeInstanceOf(Stack);
		await expect(Stack.fromAsync([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])).resolves.toEqual(new Stack(1, 2, 3));
	});

	it('should return a Promise that resolves to a stack given a set of promises', async () => {
		await expect(Stack.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]))).resolves.toBeInstanceOf(Stack);
		await expect(Stack.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]))).resolves.toEqual(new Stack(1, 2, 3));
	});

	it('should return a Promise that resolves to a stack given an async iterable', async () => {
		await expect(Stack.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).values())).resolves.toBeInstanceOf(Stack);
		await expect(Stack.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).values())).resolves.toEqual(new Stack(1, 2, 3));
	});

	it('should return a Promise that resolves to a stack given an ordered set of promises', async () => {
		await expect(Stack.fromAsync(new OrderedSet(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(Stack);
		await expect(Stack.fromAsync(new OrderedSet(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(new Stack(1, 2, 3));
	});

	it('should return a Promise that resolves to a stack given a queue of promises', async () => {
		await expect(Stack.fromAsync(new Queue(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(Stack);
		await expect(Stack.fromAsync(new Queue(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(new Stack(1, 2, 3));
	});

	it('should return a Promise that resolves to a stack given a stack of promises', async () => {
		await expect(Stack.fromAsync(new Stack(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(Stack);
		await expect(Stack.fromAsync(new Stack(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(new Stack(1, 2, 3));
	});
});

describe('Stack.isStack()', () => {
	it('should return true given a stack', () => {
		expect(Stack.isStack(new Stack(1, 2, 3))).toBe(true);
	});

	it('should return false given an array', () => {
		expect(Stack.isStack([1, 2, 3])).toBe(false);
	});

	it('should return false given a set', () => {
		expect(Stack.isStack(new Set([1, 2, 3]))).toBe(false);
	});

	it('should return false given a map', () => {
		expect(Stack.isStack(new Map([[1, 2], [3, 4]]))).toBe(false);
	});

	it('should return false given a list', () => {
		expect(Stack.isStack(new List(1, 2, 3))).toBe(false);
	});

	it('should return false given an ordered set', () => {
		expect(Stack.isStack(new OrderedSet(1, 2, 3))).toBe(false);
	});

	it('should return false given a queue', () => {
		expect(Stack.isStack(new Queue(1, 2, 3))).toBe(false);
	});
});

describe('Stack.of()', () => {
	it('should return a non-empty stack given arguments', () => {
		expect(Stack.of(1, 2, 3)).toEqual(new Stack(1, 2, 3));
	});

	it('should return an empty stack given no arguments', () => {
		expect(Stack.of()).toEqual(new Stack());
	});

	it('should return a stack containing a single number given a single number', () => {
		expect(new Stack(7)).toHaveLength(7);
		expect(new Stack(7)).not.toContain(7);
		expect(Stack.of(7)).toHaveLength(1);
		expect(Stack.of(7)).toContain(7);
	});
});
