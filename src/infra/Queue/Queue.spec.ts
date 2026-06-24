import { rs, type Mocked } from '@rstest/core';
import Queue from './Queue';
import List from '../List';
import OrderedSet from '../OrderedSet';
import Stack from '../Stack';

describe('Queue', () => {
	let queue: Queue | null = null;

	beforeAll(() => {
		queue = new Queue();
	});

	afterAll(() => {
		rs.restoreAllMocks();

		queue = null;
	});

	it('should have a size as a number of items the queue contains', () => {
		expect(queue).toHaveProperty('length', expect.any(Number));
	});

	it('should be able to add items by enqueuing or inserting instead of appending or prepending', () => {
		expect(queue).toHaveProperty('enqueue', expect.any(Function));
		expect(queue).toHaveProperty('insert', expect.any(Function));
		expect(queue).not.toHaveProperty('append');
		expect(queue).not.toHaveProperty('prepend');
	});

	it('should be able to check if it contains a given value as an item', () => {
		expect(queue).toHaveProperty('contains', expect.any(Function));
	});

	it('should be able to remove items by dequeueing instead of removing', () => {
		expect(queue).toHaveProperty('dequeue', expect.any(Function));
		expect(queue).not.toHaveProperty('remove');
	});

	it('should be able to remove all of its items', () => {
		expect(queue).toHaveProperty('empty', expect.any(Function));
	});

	it('should be able to extend another collection of items', () => {
		expect(queue).toHaveProperty('extend', expect.any(Function));
	});

	it('should be able to get a range of all indices', () => {
		expect(queue).toHaveProperty('indices', expect.any(Function));
	});

	it('should be able to check if it is empty', () => {
		expect(queue).toHaveProperty('isEmpty', expect.any(Function));
	});

	it('should be able to replace items', () => {
		expect(queue).toHaveProperty('replace', expect.any(Function));
	});

	it('should be the result of invoking a constructor named Queue', () => {
		expect(Object.getPrototypeOf(queue)).toHaveProperty('constructor', Queue);
		expect(Object.getPrototypeOf(queue)).toBe(Queue.prototype);
	});

	it('should be disposable', () => {
		expect(Object.getPrototypeOf(queue)).toHaveProperty([Symbol.dispose]);
	});

	it('should have a string tag of "Queue"', () => {
		expect(Object.getPrototypeOf(queue)).toHaveProperty([Symbol.toStringTag]);
		expect(Object.prototype.toString.call(queue)).toBe('[object Queue]');
	});

	it('should have Array-like static methods', () => {
		expect(Queue).toHaveProperty('from', expect.any(Function));
		expect(Queue).toHaveProperty('fromAsync', expect.any(Function));
		expect(Queue).toHaveProperty('isQueue', expect.any(Function));
		expect(Queue).toHaveProperty('of', expect.any(Function));
	});

	it('should return queues instead of arrays from built-in Array methods that return arrays', () => {
		expect(Queue.of<number>(1, 2, 4).concat(4, 5, 6)).toBeInstanceOf(Queue);
		expect(Queue.of<unknown>(1, 2, [4]).flat()).toBeInstanceOf(Queue);
		expect(Queue.of<number>(1, 2, 4).flatMap((item) => [item, item * 2])).toBeInstanceOf(Queue);
		expect(Queue.of<number>(1, 2, 4).map((item) => item * 2)).toBeInstanceOf(Queue);
		expect(Queue.of<number>(1, 2, 4).slice(1)).toBeInstanceOf(Queue);
		expect(Queue.of<number>(1, 2, 4).toReversed()).toBeInstanceOf(Queue);
		expect(Queue.of<number>(1, 2, 4).toSorted()).toBeInstanceOf(Queue);
		expect(Queue.of<number>(1, 2, 4).toSpliced(1, 1, 3)).toBeInstanceOf(Queue);
		expect(Queue.of<number>(1, 2, 4).with(1, 3)).toBeInstanceOf(Queue);
	});

	it('should be sealed', () => {
		expect(Object.isSealed(Queue)).toBe(true);
	});
});

describe('new Queue()', () => {
	it('should return an empty queue given no arguments', () => {
		expect(new Queue()).toBeInstanceOf(Queue);
		expect(new Queue()).toHaveLength(0);
	});

	it('should return an empty queue with a length equal to the argument given one argument that is a number', () => {
		expect(new Queue(5)).toBeInstanceOf(Queue);
		expect(new Queue(5)).toHaveLength(5);
		expect(new Queue(5)).not.toContain(5);
	});

	it('should return a queue with one item given one argument that is not a number', () => {
		expect(new Queue('test')).toBeInstanceOf(Queue);
		expect(new Queue('test')).toHaveLength(1);
		expect(new Queue('test')).toContain('test');
	});

	it('should return a queue with one item given one argument that is an array of items', () => {
		expect(new Queue(['a', 'b', 'c'])).toBeInstanceOf(Queue);
		expect(new Queue(['a', 'b', 'c'])).toHaveLength(1);
		expect(new Queue(['a', 'b', 'c'])).toContainEqual(['a', 'b', 'c']);
	});

	it('should return a queue with multiple items given multiple arguments', () => {
		expect(new Queue('a', 'b', 'c')).toBeInstanceOf(Queue);
		expect(new Queue('a', 'b', 'c')).toHaveLength(3);
		expect(new Queue('a', 'b', 'c')).toContain('a');
		expect(new Queue('a', 'b', 'c')).toContain('b');
		expect(new Queue('a', 'b', 'c')).toContain('c');
	});

	it('should return a queue with duplicate items given duplicate arguments', () => {
		expect(new Queue('a', 'b', 'c', 'a')).toBeInstanceOf(Queue);
		expect(new Queue('a', 'b', 'c', 'a')).toHaveLength(4);
		expect(new Queue('a', 'b', 'c', 'a')).toEqual(Queue.of('a', 'b', 'c', 'a'));
	});
});

describe('queue[index]', () => {
	let emptyQueue: Queue | null = null;
	let frozenQueue: Queue | null = null;
	let queue: Queue | null = null;

	beforeEach(() => {
		emptyQueue = new Queue();
		frozenQueue = Object.freeze(new Queue(1, 2, 3));
		queue = new Queue(1, 2, 3);
	});

	afterEach(() => {
		emptyQueue = null;
		frozenQueue = null;
		queue = null;
	});

	it('should return undefined when the queue is empty given any index', () => {
		expect(emptyQueue).toEqual(Queue.of());
		expect(emptyQueue![0]).toBeUndefined();
		expect(emptyQueue![1]).toBeUndefined();
		expect(emptyQueue![-1]).toBeUndefined();
	});

	it('should return undefined when the queue is not empty given an index greater than the size of the queue', () => {
		expect(queue).toEqual(Queue.of(1, 2, 3));
		expect(queue![3]).toBeUndefined();
	});

	it('should return undefined when the queue is not empty given an index less than zero', () => {
		expect(queue).toEqual(Queue.of(1, 2, 3));
		expect(queue![-1]).toBeUndefined();
	});

	it('should return the first item when the queue is not empty given an index of zero', () => {
		expect(queue).toEqual(Queue.of(1, 2, 3));
		expect(queue![0]).toBe(1);
	});

	it('should return the correct item when the queue is not empty given an index between one and the size of the queue', () => {
		expect(queue).toEqual(Queue.of(1, 2, 3));
		expect(queue![1]).toBe(2);
		expect(queue![2]).toBe(3);
	});

	it('should assign an item when the queue is empty given an index greater than or equal to zero', () => {
		expect(emptyQueue).toEqual(Queue.of());
		expect((emptyQueue![1] = 4, emptyQueue)![1]).toBe(4);
	});

	it('should assign an item when the queue is empty given an index less than zero', () => {
		expect(emptyQueue).toEqual(Queue.of());
		expect((emptyQueue![-1] = 4, emptyQueue)![-1]).toBe(4);
	});

	it('should assign an item when the queue is not empty given an index of an existing item', () => {
		expect(queue).toEqual(Queue.of(1, 2, 3));
		expect((queue![1] = 4, queue)).toEqual(Queue.of(1, 4, 3));
	});

	it('should assign a duplicate item when the queue is not empty given an index of an existing item', () => {
		expect(queue).toEqual(Queue.of(1, 2, 3));
		expect((queue![1] = 1, queue)).toEqual(Queue.of(1, 1, 3));
	});

	it('should assign a duplicate item when the queue is not empty given an index greater than the size of the queue', () => {
		expect(queue).toEqual(Queue.of(1, 2, 3));
		expect((queue![3] = 1, queue)).toEqual(Queue.of(1, 2, 3, 1));
	});
	
	it('should not assign an item when the queue is frozen given any index', () => {
		expect(frozenQueue).toEqual(Queue.of(1, 2, 3));
		expect(() => frozenQueue![3] = 1).toThrow(TypeError);
	});
	
	it('should delete an item when the queue is not empty given an index of an existing item', () => {
		expect(queue).toEqual(Queue.of(1, 2, 3));
		expect((delete queue![1], queue)).toEqual(Queue.of(1, undefined, 3));
	});

	it('should not delete an item when the queue is not empty given an index greater than the size of the queue', () => {
		expect((delete queue![3], queue)).toEqual(Queue.of(1, 2, 3));
	});

	it('should not delete an item when the queue is empty given any index', () => {
		expect((delete emptyQueue![1], emptyQueue)).toEqual(Queue.of());
	});

	it('should not delete an item when the queue is frozen given any index', () => {
		expect(frozenQueue).toEqual(Queue.of(1, 2, 3));
		expect(() => delete frozenQueue![1]).toThrow(TypeError);
	});
});

describe('Queue.prototype', () => {
	it('should be sealed', () => {
		expect(Object.isSealed(Queue.prototype)).toBe(true);
	});

	describe('clone()', () => {
		let queue: Mocked<Queue> | null = null;

		beforeEach(() => {
			queue = rs.mocked(new Queue(1, 2, 3));
		});

		afterEach(() => {
			rs.restoreAllMocks();
			queue = null;
		});

		it('should return a new Queue instance', () => {
			expect(queue?.clone()).toBeInstanceOf(Queue);
			expect(queue?.clone()).not.toBe(queue);
		});

		it('should contain the same items in the same order', () => {
			expect(new Queue(1, 2, 3).clone()).toEqual(new Queue(1, 2, 3));
		});

		it('should have the same length as the original queue', () => {
			expect(queue?.clone()).toHaveLength(queue!.length);
		});

		it('should return a new empty queue when the queue is empty', () => {
			expect(new Queue().clone()).toEqual(new Queue());
		});

		it('should not modify the original queue when the queue is not empty', () => {
			expect(queue?.clone()).toEqual(new Queue(1, 2, 3));
		});

		it('should clone the queue when the queue contains primitive values', () => {
			expect(new Queue(1, 'two', true).clone()).toEqual(new Queue(1, 'two', true));
		});

		it('should clone the queue when the queue contains object values', () => {
			expect(new Queue({ a: 1 }, [2], 'three').clone()).toEqual(new Queue({ a: 1 }, [2], 'three'));
		});

		it('should maintain item references for objects (shallow copy)', () => {
			expect(queue?.enqueue({ a: 1 }).clone()[0]).toBe(queue![0]);
		});

		it('should return a new queue that contains undefined when the queue contains undefined', () => {
			expect(queue?.enqueue(undefined).clone()).toContain(undefined);
		});

		it('should return a new queue that contains null when the queue contains null', () => {
			expect(queue?.enqueue(null).clone()).toContain(null);
		});
	});

	describe('contains()', () => {
		it('should return true given a value which exists in queue', () => {
			expect(new Queue('test').contains('test')).toBe(true);
		});

		it('should return false given a value which does not exist in queue', () => {
			expect(new Queue('this').contains('that')).toBe(false);
		});

		it('should return false when the queue is empty', () => {
			expect(new Queue().contains('test')).toBe(false);
			expect(new Queue().contains(undefined)).toBe(false);
			expect(new Queue().contains(null)).toBe(false);
		});

		it('should return true given undefined when the queue contains undefined', () => {
			expect(new Queue(undefined).contains(undefined)).toBe(true);
		});

		it('should return true given null when the queue contains null', () => {
			expect(new Queue(null).contains(null)).toBe(true);
		});

		it('should use strict equality comparison', () => {
			expect(new Queue({}).contains({})).toBe(false);
			expect(new Queue([]).contains([])).toBe(false);
		});
	});

	describe('dequeue()', () => {
		let queue: Mocked<Queue> | null = null;
		let head: string | null = null;
		let length: number | null = null;

		beforeEach(() => {
			queue = rs.mocked(new Queue('a', 'b', 'c'));
			head = queue.at(0) as string;
			length = queue.length;
		});

		afterEach(() => {
			queue = null;
			head = null;
			length = null;
		});

		it('should return the first item in the queue after removing it', () => {
			expect(queue?.dequeue()).toBe(head);
			expect(queue).not.toContain(head);
		});

		it('should decrease the size of the queue by 1', () => {
			expect(queue).toHaveLength(length!);
			expect((queue?.dequeue(), queue)).toHaveLength(length! - 1);
		});

		it('should return nothing when the queue is empty', () => {
			expect(new Queue().dequeue()).toBeUndefined();
		});
	});

	describe('empty()', () => {
		let queue: Mocked<Queue> | null = null;

		beforeEach(() => {
			queue = rs.mocked(new Queue(1, 2, 3, {}));
		});

		afterEach(() => {
			rs.restoreAllMocks();
			queue = null;
		});

		it('should return the same queue instance', () => {
			expect(queue?.empty()).toBe(queue);
		});

		it('should change the size of the queue to 0', () => {
			expect(new Queue(1, 2, 3).empty()).toHaveLength(0);
			expect(queue?.empty()).toHaveLength(0);
		});

		it('should remove all items from the queue when the queue contains one or more items', () => {
			expect(new Queue(1, 2, 3).empty()).not.toContain(1);
			expect(new Queue(1, 2, 3).empty()).not.toContain(2);
			expect(new Queue(1, 2, 3).empty()).not.toContain(3);
		});

		it('should do nothing when the queue contains no items', () => {
			expect(new Queue()).toHaveLength(0);
			expect(new Queue().empty()).toHaveLength(0);
		});

		it('should not affect other queues when items are shared', () => {
			expect(queue?.clone().empty()).toHaveLength(0);
			expect(queue).toHaveLength(4);
		});
	});

	describe('enqueue()', () => {
		let queue: Mocked<Queue> | null = null;

		beforeEach(() => {
			queue = rs.mocked(new Queue());
		});

		afterEach(() => {
			rs.restoreAllMocks();
			queue = null;
		});

		it('should return the same queue instance', () => {
			expect(queue?.enqueue('test')).toBe(queue);
		});

		it('should increase the size of the queue by 1', () => {
			expect(new Queue('a', 'b')).toHaveLength(2);
			expect(new Queue('a', 'b').enqueue('c')).toHaveLength(3);
		});

		it('should add the given item to the end of the queue when the queue is empty', () => {
			expect(new Queue().enqueue('test').at(-1)).toBe('test');
		});

		it('should add the given item to the end of the queue when the queue is not empty', () => {
			expect(new Queue('a', 'b').at(-1)).not.toBe('c');
			expect(new Queue('a', 'b').enqueue('c').at(-1)).toBe('c');
		});

		it('should add the given item to the end of the queue given a duplicate item', () => {
			expect(new Queue('a', 'b').enqueue('a')).toHaveLength(3);
			expect(new Queue('a', 'b').enqueue('a').at(-1)).toBe('a');
		});

		it('should add the given item to the end of the queue given undefined', () => {
			expect(new Queue().enqueue(undefined).at(-1)).toBeUndefined();
		});

		it('should add the given item to the end of the queue given null', () => {
			expect(new Queue().enqueue(null).at(-1)).toBeNull();
		});

		it('should not add more than one item to the end of the queue given an array of items', () => {
			expect(new Queue(['a', 'b']).enqueue(['c', 'd'])).toContainEqual(expect.arrayContaining(['c', 'd']));
			expect(new Queue(['a', 'b']).enqueue(['c', 'd'])).not.toContain('c');
			expect(new Queue(['a', 'b']).enqueue(['c', 'd'])).not.toContain('d');
		});
	});

	describe('extend()', () => {
		let queue: Mocked<Queue> | null = null;

		beforeEach(() => {
			queue = rs.mocked(new Queue(1, 2, {}));
		});

		afterEach(() => {
			rs.restoreAllMocks();
			queue = null;
		});

		it('should add all items from the given queue to the end of the queue given a non-empty queue', () => {
			expect(new Queue(1, 2)).not.toContain(3);
			expect(new Queue(1, 2)).not.toContain(4);
			expect(new Queue(1, 2).extend(new Queue(3, 4))).toContain(3);
			expect(new Queue(1, 2).extend(new Queue(3, 4))).toContain(4);
		});

		it('should increase the size of the queue by the size of the given queue', () => {
			expect(new Queue(1, 2)).toHaveLength(2);
			expect(new Queue(1, 2).extend(new Queue(3, 4))).toHaveLength(4);
		});

		it('should return the same queue instance', () => {
			expect(queue?.extend(new Queue(3, 4))).toBe(queue);
		});

		it('should add all items from the given queue given a non-empty list-like', () => {
			expect(new Queue(1, 2)).toHaveLength(2);
			expect(new Queue(1, 2).extend([3, 4])).toEqual(new Queue(1, 2, 3, 4));
			expect(new Queue(1, 2).extend(new Set([3, 4]))).toEqual(new Queue(1, 2, 3, 4));
			expect(new Queue(1, 2).extend(new List(3, 4))).toEqual(new Queue(1, 2, 3, 4));
			expect(new Queue(1, 2).extend(new OrderedSet(3, 4))).toEqual(new Queue(1, 2, 3, 4));
			expect(new Queue(1, 2).extend(new Stack(3, 4))).toEqual(new Queue(1, 2, 3, 4));
		});

		it('should maintain the order of items added from the given queue', () => {
			expect(new Queue(1, 2).extend(new Queue(3, 4))).toEqual(new Queue(1, 2, 3, 4));
		});

		it('should add all items from the given queue when the current queue is empty', () => {
			expect(new Queue()).not.toEqual(new Queue(1, 2));
			expect(new Queue().extend(new Queue(1, 2))).toEqual(new Queue(1, 2));
		});

		it('should add all items from the given queue given the same queue when the current queue is not empty', () => {
			expect(queue).toHaveLength(3);
			expect(queue?.extend(queue)).toHaveLength(6);
		});

		it('should add all items from the given queue given a queue with duplicate items', () => {
			expect(new Queue(1, 2, 3).extend(new Queue(2, 3, 4))).toEqual(new Queue(1, 2, 3, 2, 3, 4));
		});

		it('should not modify the original queue', () => {
			expect(new Queue(1, 2).extend(queue!)).toHaveLength(5);
			expect(queue).toHaveLength(3);
		});
	});

	describe('indices()', () => {
		it('should return the range of indices as an ordered set', () => {
			expect(new Queue('a', 'b', 'c').indices()).toBeInstanceOf(OrderedSet);
		});

		it('should return an empty ordered set when the queue is empty', () => {
			expect(new Queue().indices()).toEqual(new OrderedSet());
		});

		it('should return an ordered set of numbers from 0 to length-1 when the queue is not empty', () => {
			expect(new Queue('a', 'b', 'c').indices()).toEqual(new OrderedSet(0, 1, 2));
		});

		it('should return an ordered set with a length equal to the current size of the queue', () => {
			expect(new Queue('a', 'b', 'c').indices()).toHaveLength(3);
		});

		it('should return an ordered set of indices in ascending order', () => {
			expect(new Queue('a', 'b', 'c').indices()).toEqual(new OrderedSet(0, 1, 2));
		});

		it('should return an immutable ordered set', () => {
			expect(() => new Queue('a', 'b', 'c').indices().append(3)).toThrow(TypeError);
		});
	});

	describe('insert()', () => {
		let queue: Mocked<Queue> | null = null;

		beforeEach(() => {
			queue = rs.mocked(new Queue(1, 2, {}));
		});

		afterEach(() => {
			rs.restoreAllMocks();
			queue = null;
		});

		it('should return the same queue instance', () => {
			expect(queue?.insert(1, 0)).toBe(queue);
		});

		it('should increase the size of the queue by 1', () => {
			expect(new Queue('a', 'b').insert('c', 1)).toHaveLength(3);
		});

		it('should insert the given item before the specified index given an item and a non-zero index', () => {
			expect(new Queue('a', 'c').insert('b', 1)).toEqual(new Queue('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given an item and a zero index', () => {
			expect(new Queue('b', 'c').insert('a', 0)).toEqual(new Queue('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given an item and an index equal to length', () => {
			expect(new Queue('a', 'b').insert('c', 2)).toEqual(new Queue('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given duplicate items', () => {
			expect(new Queue('a', 'b', 'c').insert('b', 2)).toEqual(new Queue('a', 'b', 'b', 'c'));
		});

		it('should insert the given item before the specified index given undefined', () => {
			expect(new Queue('a', 'b').insert(undefined, 1)).toEqual(new Queue('a', undefined, 'b'));
		});

		it('should insert the given item before the specified index given null', () => {
			expect(new Queue('a', 'b').insert(null, 1)).toEqual(new Queue('a', null, 'b'));
		});

		it('should insert the given item before the specified index in an empty queue when index is 0', () => {
			expect(new Queue().insert('a', 0)).toEqual(new Queue('a'));
		});

		it('should insert the given item before the specified index starting from the end of the queue given a negative index', () => {
			expect(new Queue('a', 'b', 'c').insert('d', -1)).toEqual(new Queue('a', 'b', 'd', 'c'));
		});

		it('should insert the given item at the end of the queue given an index larger than the size of the queue', () => {
			expect(new Queue('a', 'b', 'c').insert('d', 4)).toEqual(new Queue('a', 'b', 'c', 'd'));
		});
	});

	describe('isEmpty()', () => {
		it('should return true when the queue contains no items', () => {
			expect(new Queue().isEmpty()).toBe(true);
		});

		it('should return false when the queue contains at least one item', () => {
			expect(new Queue(1).isEmpty()).toBe(false);
		});

		it('should return true after emptying a non-empty queue', () => {
			expect(new Queue(1, 2, 3).empty().isEmpty()).toBe(true);
		});

		it('should return false after enqueuing an item to an empty queue', () => {
			expect(new Queue().enqueue(1).isEmpty()).toBe(false);
		});
	});

	describe('replace()', () => {
		let queue: Mocked<Queue> | null = null;
		let condition: Mocked<(value: unknown) => boolean> | null = null;
		let replacement: unknown = null;

		beforeEach(() => {
			queue = rs.mocked(new Queue());
			condition = rs.fn();
			replacement = 'd';

			queue.replace(condition, replacement);
		});

		afterEach(() => {
			rs.restoreAllMocks();
			queue = null;
		});

		it('should return the same queue instance', () => {
			expect(queue?.replace(condition!, replacement)).toBe(queue);
		});

		it('should not change the size of the queue', () => {
			expect(new Queue('a', 'b', 'c')).toHaveLength(3);
			expect(new Queue('a', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd')).toHaveLength(3);
			expect(new Queue('a', 'b', 'c').replace((item) => /[bc]/.test(item as string), 'd')).toHaveLength(3);
		});

		it('should replace all matching items with the replacement given a matching condition', () => {
			expect(new Queue('a', 'b', 'c', 'b')).not.toContain('d');
			expect(new Queue('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).not.toContain('b');
			expect(new Queue('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).toContain('d');
		});

		it('should not replace non-matching items given a matching condition', () => {
			expect(new Queue('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).toEqual(new Queue('a', 'd', 'c', 'd'));
		});

		it('should not replace any items given a non-matching condition', () => {
			expect(new Queue('a', 'b', 'c').replace((item) => /[d]/.test(item as string), 'd')).toEqual(new Queue('a', 'b', 'c'));
		});

		it('should replace every item with the replacement given a condition matching every item', () => {
			expect(new Queue('a', 'b', 'c').replace((item) => /[abc]/.test(item as string), 'd')).toEqual(new Queue('d', 'd', 'd'));
		});

		it('should replace duplicate items with the replacement given a matching condition', () => {
			expect(new Queue('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).toEqual(new Queue('a', 'd', 'c', 'd'));
			expect(new Queue('a', 'b', 'c', 'c').replace((item) => /[bc]/.test(item as string), 'd')).toEqual(new Queue('a', 'd', 'd', 'd'));
		});

		it('should replace matching items with undefined given a replacement which is undefined', () => {
			expect(new Queue('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), undefined)).toEqual(new Queue('a', undefined, 'c', undefined));
			expect(new Queue('a', 'b', 'c', 'c').replace((item) => /[bc]/.test(item as string), undefined)).toEqual(new Queue('a', undefined, undefined, undefined));
		});

		it('should replace matching items with null given a replacement which is null', () => {
			expect(new Queue('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), null)).toEqual(new Queue('a', null, 'c', null));
			expect(new Queue('a', 'b', 'c', 'c').replace((item) => /[bc]/.test(item as string), null)).toEqual(new Queue('a', null, null, null));
		});

		it('should replace matching items with the same replacement given a replacement which is the same', () => {
			expect(new Queue('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'b')).toEqual(new Queue('a', 'b', 'c', 'b'));
		});

		it('should maintain the order of non-matching items given a matching condition', () => {
			expect(new Queue('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(0)).toBe('a');
			expect(new Queue('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(1)).toBe('b');
			expect(new Queue('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(2)).toBe('b');
			expect(new Queue('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(4)).toBe('b');
		});

		it('should not call the given condition when the list is empty', () => {
			expect(condition).not.toHaveBeenCalled();
		});
	});
});

describe('Queue.from()', () => {
	it('should return a queue given an array', () => {
		expect(Queue.from([1, 2, 3])).toBeInstanceOf(Queue);
		expect(Queue.from([1, 2, 3])).toEqual(new Queue(1, 2, 3));
	});

	it('should return a queue given a set', () => {
		expect(Queue.from(new Set([1, 2, 3]))).toBeInstanceOf(Queue);
		expect(Queue.from(new Set([1, 2, 3]))).toEqual(new Queue(1, 2, 3));
	});

	it('should return a queue given a map', () => {
		expect(Queue.from(new Map([[1, 1], [2, 2], [3, 3]]))).toBeInstanceOf(Queue);
		expect(Queue.from(new Map([[1, 1], [2, 2], [3, 3]]))).toEqual(new Queue([1, 1], [2, 2], [3, 3]));
	});

	it('should return a queue given an iterable', () => {
		expect(Queue.from(new Set([1, 2, 3]).values())).toBeInstanceOf(Queue);
		expect(Queue.from(new Set([1, 2, 3]).values())).toEqual(new Queue(1, 2, 3));
	});

	it('should return a queue given an ordered set', () => {
		expect(Queue.from(new OrderedSet(1, 2, 3))).toBeInstanceOf(Queue);
		expect(Queue.from(new OrderedSet(1, 2, 3))).toEqual(new Queue(1, 2, 3));
	});

	it('should return a queue given a queue', () => {
		expect(Queue.from(new Queue(1, 2, 3))).toBeInstanceOf(Queue);
		expect(Queue.from(new Queue(1, 2, 3))).toEqual(new Queue(1, 2, 3));
	});

	it('should return a queue given a stack', () => {
		expect(Queue.from(new Stack(1, 2, 3))).toBeInstanceOf(Queue);
		expect(Queue.from(new Stack(1, 2, 3))).toEqual(new Queue(1, 2, 3));
	});
});

describe('Queue.fromAsync()', () => {
	it('should return a Promise that resolves to a queue given an array of promises', async () => {
		await expect(Queue.fromAsync([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])).resolves.toBeInstanceOf(Queue);
		await expect(Queue.fromAsync([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])).resolves.toEqual(new Queue(1, 2, 3));
	});

	it('should return a Promise that resolves to a queue given a set of promises', async () => {
		await expect(Queue.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]))).resolves.toBeInstanceOf(Queue);
		await expect(Queue.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]))).resolves.toEqual(new Queue(1, 2, 3));
	});

	it('should return a Promise that resolves to a queue given an async iterable', async () => {
		await expect(Queue.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).values())).resolves.toBeInstanceOf(Queue);
		await expect(Queue.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).values())).resolves.toEqual(new Queue(1, 2, 3));
	});

	it('should return a Promise that resolves to a queue given an ordered set of promises', async () => {
		await expect(Queue.fromAsync(new OrderedSet(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(Queue);
		await expect(Queue.fromAsync(new OrderedSet(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(new Queue(1, 2, 3));
	});

	it('should return a Promise that resolves to a queue given a queue of promises', async () => {
		await expect(Queue.fromAsync(new Queue(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(Queue);
		await expect(Queue.fromAsync(new Queue(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(new Queue(1, 2, 3));
	});

	it('should return a Promise that resolves to a queue given a stack of promises', async () => {
		await expect(Queue.fromAsync(new Stack(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(Queue);
		await expect(Queue.fromAsync(new Stack(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(new Queue(1, 2, 3));
	});
});

describe('Queue.isQueue()', () => {
	it('should return true given a queue', () => {
		expect(Queue.isQueue(new Queue(1, 2, 3))).toBe(true);
	});

	it('should return false given an array', () => {
		expect(Queue.isQueue([1, 2, 3])).toBe(false);
	});

	it('should return false given a set', () => {
		expect(Queue.isQueue(new Set([1, 2, 3]))).toBe(false);
	});

	it('should return false given a map', () => {
		expect(Queue.isQueue(new Map([[1, 2], [3, 4]]))).toBe(false);
	});

	it('should return false given a list', () => {
		expect(Queue.isQueue(new List(1, 2, 3))).toBe(false);
	});

	it('should return false given an ordered set', () => {
		expect(Queue.isQueue(new OrderedSet(1, 2, 3))).toBe(false);
	});

	it('should return false given a stack', () => {
		expect(Queue.isQueue(new Stack(1, 2, 3))).toBe(false);
	});
});

describe('Queue.of()', () => {
	it('should return a non-empty queue given arguments', () => {
		expect(Queue.of(1, 2, 3)).toEqual(new Queue(1, 2, 3));
	});

	it('should return an empty queue given no arguments', () => {
		expect(Queue.of()).toEqual(new Queue());
	});

	it('should return a queue containing a single number given a single number', () => {
		expect(new Queue(7)).toHaveLength(7);
		expect(new Queue(7)).not.toContain(7);
		expect(Queue.of(7)).toHaveLength(1);
		expect(Queue.of(7)).toContain(7);
	});
});
