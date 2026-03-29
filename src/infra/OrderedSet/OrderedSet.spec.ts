import { jest } from '@jest/globals';
import { OrderedSet } from './OrderedSet';
import { List } from '../List';
import { Queue } from '../Queue';
import { Stack } from '../Stack';

describe('OrderedSet', () => {
	let set: OrderedSet | null = null;

	beforeAll(() => {
		set = OrderedSet.of();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		set = null;
	});

	it('should have a size as a number of items the set contains', () => {
		expect(set).toHaveProperty('length', expect.any(Number));
	});

	it('should be able to add items by appending, inserting, or prepending', () => {
		expect(set).toHaveProperty('append', expect.any(Function));
		expect(set).toHaveProperty('insert', expect.any(Function));
		expect(set).toHaveProperty('prepend', expect.any(Function));
	});

	it('should be able to check if it contains an item', () => {
		expect(set).toHaveProperty('contains', expect.any(Function));
	});

	it('should be able to remove all of its items', () => {
		expect(set).toHaveProperty('empty', expect.any(Function));
	});

	it('should be able to extend another collection of items', () => {
		expect(set).toHaveProperty('extend', expect.any(Function));
	});

	it('should be able to provide a range of all indices', () => {
		expect(set).toHaveProperty('indices', expect.any(Function));
	});

	it('should be able to check if it is empty', () => {
		expect(set).toHaveProperty('isEmpty', expect.any(Function));
	});

	it('should be able to remove items', () => {
		expect(set).toHaveProperty('remove', expect.any(Function));
	});

	it('should be able to replace items', () => {
		expect(set).toHaveProperty('replace', expect.any(Function));
	});

	it('should be the result of invoking a constructor named OrderedSet', () => {
		expect(Object.getPrototypeOf(set)).toHaveProperty('constructor', OrderedSet);
		expect(Object.getPrototypeOf(set)).toBe(OrderedSet.prototype);
	});

	it('should be disposable', () => {
		expect(Object.getPrototypeOf(set)).toHaveProperty([Symbol.dispose]);
	});

	it('should have a string tag of "OrderedSet"', () => {
		expect(Object.getPrototypeOf(set)).toHaveProperty([Symbol.toStringTag]);
		expect(Object.prototype.toString.call(set)).toBe('[object OrderedSet]');
	});

	it('should have Array-like static methods', () => {
		expect(OrderedSet).toHaveProperty('from', expect.any(Function));
		expect(OrderedSet).toHaveProperty('fromAsync', expect.any(Function));
		expect(OrderedSet).toHaveProperty('isOrderedSet', expect.any(Function));
		expect(OrderedSet).toHaveProperty('of', expect.any(Function));
	});

	it('should return ordered sets instead of arrays from built-in Array methods that return arrays', () => {
		expect(OrderedSet.of<number>(1, 2, 4).concat(4, 5, 6)).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.of<unknown>(1, 2, [4]).flat()).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.of<number>(1, 2, 4).flatMap((item) => [item, item * 2])).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.of<number>(1, 2, 4).map((item) => item * 2)).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.of<number>(1, 2, 4).slice(1)).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.of<number>(1, 2, 4).toReversed()).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.of<number>(1, 2, 4).toSorted()).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.of<number>(1, 2, 4).toSpliced(1, 1, 3)).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.of<number>(1, 2, 4).with(1, 3)).toBeInstanceOf(OrderedSet);
	});

	it('should be sealed', () => {
		expect(Object.isSealed(OrderedSet)).toBe(true);
	});
});

describe('new OrderedSet()', () => {
	it('should return an empty ordered set given no arguments', () => {
		expect(new OrderedSet()).toBeInstanceOf(OrderedSet);
		expect(new OrderedSet()).toHaveLength(0);
	});

	it('should return an ordered set with one item given one argument that is a number', () => {
		expect(new OrderedSet(5)).toBeInstanceOf(OrderedSet);
		expect(new OrderedSet(5)).toHaveLength(1);
		expect(new OrderedSet(5)).toContain(5);
	});

	it('should return an ordered set with one item given one argument that is not a number', () => {
		expect(new OrderedSet('test')).toBeInstanceOf(OrderedSet);
		expect(new OrderedSet('test')).toHaveLength(1);
		expect(new OrderedSet('test')).toContain('test');
	});

	it('should return an ordered set with one item given one argument that is an array of items', () => {
		expect(new OrderedSet(['a', 'b', 'c'])).toBeInstanceOf(OrderedSet);
		expect(new OrderedSet(['a', 'b', 'c'])).toHaveLength(1);
		expect(new OrderedSet(['a', 'b', 'c'])).toContainEqual(['a', 'b', 'c']);
	});

	it('should return an ordered set with multiple items given multiple arguments', () => {
		expect(new OrderedSet('a', 'b', 'c')).toBeInstanceOf(OrderedSet);
		expect(new OrderedSet('a', 'b', 'c')).toHaveLength(3);
		expect(new OrderedSet('a', 'b', 'c')).toContain('a');
		expect(new OrderedSet('a', 'b', 'c')).toContain('b');
		expect(new OrderedSet('a', 'b', 'c')).toContain('c');
	});

	it('should return an ordered set with no duplicate items given duplicate arguments', () => {
		expect(new OrderedSet('a', 'b', 'c', 'a')).toBeInstanceOf(OrderedSet);
		expect(new OrderedSet('a', 'b', 'c', 'a')).toHaveLength(3);
		expect(new OrderedSet('a', 'b', 'c', 'a')).toEqual(OrderedSet.of('a', 'b', 'c'));
	});
});

describe('set[index]', () => {
	let emptySet: OrderedSet | null = null;
	let frozenSet: OrderedSet | null = null;
	let set: OrderedSet | null = null;

	beforeEach(() => {
		emptySet = new OrderedSet();
		frozenSet = Object.freeze(new OrderedSet(1, 2, 3));
		set = new OrderedSet(1, 2, 3);
	});

	afterEach(() => {
		emptySet = null;
		frozenSet = null;
		set = null;
	});

	it('should return undefined when the set is empty given any index', () => {
		expect(emptySet).toEqual(OrderedSet.of());
		expect(emptySet![0]).toBeUndefined();
		expect(emptySet![1]).toBeUndefined();
		expect(emptySet![-1]).toBeUndefined();
	});

	it('should return undefined when the set is not empty given an index greater than the size of the set', () => {
		expect(set).toEqual(OrderedSet.of(1, 2, 3));
		expect(set![3]).toBeUndefined();
	});

	it('should return undefined when the set is not empty given an index less than zero', () => {
		expect(set).toEqual(OrderedSet.of(1, 2, 3));
		expect(set![-1]).toBeUndefined();
	});

	it('should return the first item when the set is not empty given an index of zero', () => {
		expect(set).toEqual(OrderedSet.of(1, 2, 3));
		expect(set![0]).toBe(1);
	});

	it('should return the correct item when the set is not empty given an index between one and the size of the set', () => {
		expect(set).toEqual(OrderedSet.of(1, 2, 3));
		expect(set![1]).toBe(2);
		expect(set![2]).toBe(3);
	});

	it('should assign an item when the set is empty given an index greater than or equal to zero', () => {
		expect(emptySet).toEqual(OrderedSet.of());
		expect((emptySet![1] = 4, emptySet)![1]).toBe(4);
	});

	it('should assign an item when the set is empty given an index less than zero', () => {
		expect(emptySet).toEqual(OrderedSet.of());
		expect((emptySet![-1] = 4, emptySet)![-1]).toBe(4);
	});

	it('should assign an item when the set is not empty given an index of an existing item', () => {
		expect(set).toEqual(OrderedSet.of(1, 2, 3));
		expect((set![1] = 4, set)).toEqual(OrderedSet.of(1, 4, 3));
	});

	it('should not assign a duplicate item when the set is not empty given an index of an existing item', () => {
		expect(set).toEqual(OrderedSet.of(1, 2, 3));
		expect((set![1] = 1, set)).toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should not assign a duplicate item when the set is not empty given an index greater than the size of the set', () => {
		expect(set).toEqual(OrderedSet.of(1, 2, 3));
		expect((set![3] = 1, set)).toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should not assign an item when the set is frozen given any index', () => {
		expect(frozenSet).toEqual(OrderedSet.of(1, 2, 3));
		expect(() => frozenSet![3] = 1).toThrow(TypeError);
	});

	it('should delete an item when the set is not empty given an index of an existing item', () => {
		expect(set).toEqual(OrderedSet.of(1, 2, 3));
		expect((delete set![1], set)).toEqual(OrderedSet.of(1, 3));
	});

	it('should shorten the set when an item is deleted', () => {
		expect(set).not.toContain(undefined);
		expect(set).toEqual(OrderedSet.of(1, 2, 3));
		expect((delete set![1], set)).toHaveLength(2);
		expect(set).not.toContain(undefined);
	});

	it('should not delete an item when the set is not empty given an index greater than the size of the set', () => {
		expect((delete set![3], set)).toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should not delete an item when the set is empty given any index', () => {
		expect((delete emptySet![1], emptySet)).toEqual(OrderedSet.of());
	});

	it('should not delete an item when the set is frozen given any index', () => {
		expect(frozenSet).toEqual(OrderedSet.of(1, 2, 3));
		expect(() => delete frozenSet![1]).toThrow(TypeError);
	});
});

describe('OrderedSet.prototype', () => {
	it('should be sealed', () => {
		expect(Object.isSealed(OrderedSet.prototype)).toBe(true);
	});

	describe('append()', () => {
		let set: jest.MockedObject<OrderedSet> | null = null;

		beforeEach(() => {
			set = jest.mocked(OrderedSet.of());
		});

		afterEach(() => {
			jest.restoreAllMocks();
			set = null;
		});

		it('should return the same set instance', () => {
			expect(set?.append('test')).toBe(set);
		});

		it('should increase the size of the set by 1', () => {
			expect(OrderedSet.of('a', 'b')).toHaveLength(2);
			expect(OrderedSet.of('a', 'b').append('c')).toHaveLength(3);
		});

		it('should add an item to the end of the set when the set is empty', () => {
			expect(OrderedSet.of().append('test').at(-1)).toBe('test');
		});

		it('should add an item to the end of the set when the set is not empty', () => {
			expect(OrderedSet.of('a', 'b').at(-1)).not.toBe('c');
			expect(OrderedSet.of('a', 'b').append('c').at(-1)).toBe('c');
		});

		it('should not add an item to the end of the set given a duplicate item', () => {
			expect(OrderedSet.of('a', 'b').append('a')).toHaveLength(2);
			expect(OrderedSet.of('a', 'b').append('a').at(-1)).toBe('b');
		});

		it('should add an item to the end of the set given undefined', () => {
			expect(OrderedSet.of().append(undefined).at(-1)).toBeUndefined();
		});

		it('should add an item to the end of the set given null', () => {
			expect(OrderedSet.of().append(null).at(-1)).toBeNull();
		});

		it('should not add more than one item to the end of the set given an array of items', () => {
			expect(OrderedSet.of(['a', 'b']).append(['c', 'd'])).toContainEqual(expect.arrayContaining(['c', 'd']));
			expect(OrderedSet.of(['a', 'b']).append(['c', 'd'])).not.toContain('c');
			expect(OrderedSet.of(['a', 'b']).append(['c', 'd'])).not.toContain('d');
		});
	});

	describe('clone()', () => {
		let set: jest.MockedObject<OrderedSet> | null = null;

		beforeEach(() => {
			set = jest.mocked(OrderedSet.of(1, 2, 3));
		});

		afterEach(() => {
			jest.restoreAllMocks();
			set = null;
		});

		it('should return a OrderedSet.of instance', () => {
			expect(set?.clone()).toBeInstanceOf(OrderedSet);
			expect(set?.clone()).not.toBe(set);
		});

		it('should contain the same items in the same order', () => {
			expect(OrderedSet.of(1, 2, 3).clone()).toEqual(OrderedSet.of(1, 2, 3));
		});

		it('should have the same length as the original ordered set', () => {
			expect(set?.clone()).toHaveLength(set!.length);
		});

		it('should return a new empty ordered set when the ordered set is empty', () => {
			expect(OrderedSet.of().clone()).toEqual(OrderedSet.of());
		});

		it('should not modify the original ordered set when the ordered set is not empty', () => {
			expect(set?.clone()).toEqual(OrderedSet.of(1, 2, 3));
		});

		it('should clone the ordered set when the ordered set contains primitive values', () => {
			expect(OrderedSet.of<unknown>(1, 'two', true).clone()).toEqual(OrderedSet.of<unknown>(1, 'two', true));
		});

		it('should clone the ordered set when the ordered set contains object values', () => {
			expect(OrderedSet.of<unknown>({ a: 1 }, [2], 'three').clone()).toEqual(OrderedSet.of<unknown>({ a: 1 }, [2], 'three'));
		});

		it('should maintain item references for objects (shallow copy)', () => {
			expect((set?.append({ a: 1 }), set)?.clone().at(0)).toBe(set?.at(0));
		});

		it('should return a new ordered set that contains undefined when the ordered set contains undefined', () => {
			expect((set?.append(undefined), set)?.clone()).toContain(undefined);
		});

		it('should return a new ordered set that contains null when the ordered set contains null', () => {
			expect((set?.append(null), set)?.clone()).toContain(null);
		});
	});

	describe('contains()', () => {
		it('should return true given a value which exists in the set', () => {
			expect(OrderedSet.of('test').contains('test')).toBe(true);
		});

		it('should return false given a value which does not exist in the set', () => {
			expect(OrderedSet.of('this').contains('that')).toBe(false);
		});

		it('should return false when the set is empty', () => {
			expect(OrderedSet.of().contains('test')).toBe(false);
			expect(OrderedSet.of().contains(undefined)).toBe(false);
			expect(OrderedSet.of().contains(null)).toBe(false);
		});

		it('should return true given undefined when the set contains undefined', () => {
			expect(OrderedSet.of(undefined).contains(undefined)).toBe(true);
		});

		it('should return true given null when the set contains null', () => {
			expect(OrderedSet.of(null).contains(null)).toBe(true);
		});

		it('should use strict equality comparison', () => {
			expect(OrderedSet.of({}).contains({})).toBe(false);
			expect(OrderedSet.of([]).contains([])).toBe(false);
		});
	});

	describe('copyWithin()', () => {
		it('should preserve the original order given a slice of one item at the targets position', () => {
			expect(OrderedSet.of(1, 2, 3, 4, 5).copyWithin(2, 2, 3)).toEqual(OrderedSet.of(1, 2, 3, 4, 5));
		});

		it('should shorten the set given a slice that would duplicate items', () => {
			expect(OrderedSet.of(1, 2, 3, 4, 5).copyWithin(1, 3)).toEqual(OrderedSet.of(1, 4, 5));
		});

		it('should not copy the slice when the set is empty', () => {
			expect(OrderedSet.of().copyWithin(1, 3)).toEqual(OrderedSet.of());
		});
	});

	describe('difference()', () => {
		it('should return a new ordered set of items not in the given set given a set of overlapping items', () => {
			expect(OrderedSet.of(1, 2, 3).difference(OrderedSet.of(2, 3, 4))).toEqual(OrderedSet.of(1));
		});

		it('should return a new ordered set of the same items given a set of no overlapping items', () => {
			expect(OrderedSet.of(1, 2, 3).difference(OrderedSet.of(4, 5, 6))).toEqual(OrderedSet.of(1, 2, 3));
		});

		it('should return a new ordered set of items not in the given set given an empty set', () => {
			expect(OrderedSet.of(1, 2, 3).difference(OrderedSet.of())).toEqual(OrderedSet.of(1, 2, 3));
		});

		it('should return a new empty ordered set when the set is empty', () => {
			expect(OrderedSet.of().difference(OrderedSet.of(2, 3, 4))).toEqual(OrderedSet.of());
			expect(OrderedSet.of().difference(OrderedSet.of(4, 5, 6))).toEqual(OrderedSet.of());
			expect(OrderedSet.of().difference(OrderedSet.of())).toEqual(OrderedSet.of());
		});
	});

	describe('empty()', () => {
		let set: jest.MockedObject<OrderedSet> | null = null;

		beforeEach(() => {
			set = jest.mocked(OrderedSet.of<unknown>(1, 2, 3, {}));
		});

		afterEach(() => {
			jest.restoreAllMocks();
			set = null;
		});

		it('should return the same set instance', () => {
			expect(set?.empty()).toBe(set);
		});

		it('should change the size of the set to 0', () => {
			expect(OrderedSet.of(1, 2, 3).empty()).toHaveLength(0);
			expect(set?.empty()).toHaveLength(0);
		});

		it('should remove all items from the set when the set contains one or more items', () => {
			expect(OrderedSet.of(1, 2, 3).empty()).not.toContain(1);
			expect(OrderedSet.of(1, 2, 3).empty()).not.toContain(2);
			expect(OrderedSet.of(1, 2, 3).empty()).not.toContain(3);
		});

		it('should do nothing when the set contains no items', () => {
			expect(OrderedSet.of()).toHaveLength(0);
			expect(OrderedSet.of().empty()).toHaveLength(0);
		});

		it('should not affect other sets when items are shared', () => {
			expect(set?.clone().empty()).toHaveLength(0);
			expect(set).toHaveLength(4);
		});
	});

	describe('extend()', () => {
		let set: jest.MockedObject<OrderedSet> | null = null;

		beforeEach(() => {
			set = jest.mocked(new OrderedSet(1, 2, {}));
		});

		afterEach(() => {
			jest.restoreAllMocks();
			set = null;
		});

		it('should add all items to the end of the set given a non-empty set', () => {
			expect(OrderedSet.of(1, 2).extend(OrderedSet.of(3, 4)).at(-2)).toBe(3);
			expect(OrderedSet.of(1, 2).extend(OrderedSet.of(3, 4)).at(-1)).toBe(4);
		});

		it('should increase the size of the set by the size of the given set', () => {
			expect(OrderedSet.of(1, 2)).toHaveLength(2);
			expect(OrderedSet.of(1, 2).extend(OrderedSet.of(3, 4))).toHaveLength(4);
		});

		it('should return the same set instance', () => {
			expect(set?.extend(OrderedSet.of(3, 4))).toBe(set);
		});

		it('should add all items given a non-empty list-like without duplicate items', () => {
			expect(OrderedSet.of(1, 2).extend([3, 4])).toEqual(OrderedSet.of(1, 2, 3, 4));
			expect(OrderedSet.of(1, 2).extend(new Set([3, 4]))).toEqual(OrderedSet.of(1, 2, 3, 4));
			expect(OrderedSet.of(1, 2).extend(new List(3, 4))).toEqual(OrderedSet.of(1, 2, 3, 4));
			expect(OrderedSet.of(1, 2).extend(OrderedSet.of(3, 4))).toEqual(OrderedSet.of(1, 2, 3, 4));
			expect(OrderedSet.of(1, 2).extend(new Stack(3, 4))).toEqual(OrderedSet.of(1, 2, 3, 4));
			expect(OrderedSet.of(1, 2).extend(new Queue(3, 4))).toEqual(OrderedSet.of(1, 2, 3, 4));
		});

		it('should not add duplicate items given a non-empty list-like with duplicate items', () => {
			expect(OrderedSet.of(1, 2, 3).extend([3, 4])).toEqual(OrderedSet.of(1, 2, 3, 4));
			expect(OrderedSet.of(1, 2, 3).extend(new Set([3, 4]))).toEqual(OrderedSet.of(1, 2, 3, 4));
			expect(OrderedSet.of(1, 2, 3).extend(new List(3, 4))).toEqual(OrderedSet.of(1, 2, 3, 4));
			expect(OrderedSet.of(1, 2, 3).extend(OrderedSet.of(3, 4))).toEqual(OrderedSet.of(1, 2, 3, 4));
			expect(OrderedSet.of(1, 2, 3).extend(new Stack(3, 4))).toEqual(OrderedSet.of(1, 2, 3, 4));
			expect(OrderedSet.of(1, 2, 3).extend(new Queue(3, 4))).toEqual(OrderedSet.of(1, 2, 3, 4));
		});

		it('should maintain the order of items added from the given set', () => {
			expect(OrderedSet.of(1, 2).extend(OrderedSet.of(3, 4))).toEqual(OrderedSet.of(1, 2, 3, 4));
		});

		it('should add all items when the set is empty given a non-empty set', () => {
			expect(OrderedSet.of()).not.toEqual(OrderedSet.of(1, 2));
			expect(OrderedSet.of().extend(OrderedSet.of(1, 2))).toEqual(OrderedSet.of(1, 2));
		});

		it('should add no items given the same set when the set is not empty', () => {
			expect(set).toHaveLength(3);
			expect(set?.extend(set)).toHaveLength(3);
		});

		it('should not modify the given list', () => {
			expect(OrderedSet.of<unknown>(1, 2).extend(set!)).toHaveLength(3);
			expect(set).toHaveLength(3);
		});
	});

	describe('equals()', () => {
		let set: jest.MockedObject<OrderedSet> | null = null;
		let equalSet: jest.MockedObject<OrderedSet> | null = null;
		let subset: jest.MockedObject<OrderedSet> | null = null;
		let superset: jest.MockedObject<OrderedSet> | null = null;

		beforeEach(() => {
			set = jest.mocked(OrderedSet.of(1, 2, 3));
			equalSet = jest.mocked(OrderedSet.of(1, 2, 3));
			subset = jest.mocked(OrderedSet.of(1, 2));
			superset = jest.mocked(OrderedSet.of(1, 2, 3, 4));
		});

		afterEach(() => {
			jest.restoreAllMocks();
			set = null;
			equalSet = null;
			subset = null;
			superset = null;
		});

		it('should return true given a set of which this set is a subset and a superset', () => {
			expect(OrderedSet.of(1, 2, 3).isSubsetOf(OrderedSet.of(1, 2, 3))).toBe(true);
			expect(OrderedSet.of(1, 2, 3).isSupersetOf(OrderedSet.of(1, 2, 3))).toBe(true);
			expect(OrderedSet.of(1, 2, 3).equals(OrderedSet.of(1, 2, 3))).toBe(true);
		});

		it('should return false given a set of which this set is a subset but not a superset', () => {
			expect(OrderedSet.of(1, 2, 3).isSubsetOf(OrderedSet.of(1, 2, 3, 4))).toBe(true);
			expect(OrderedSet.of(1, 2, 3).isSupersetOf(OrderedSet.of(1, 2, 3, 4))).toBe(false);
			expect(OrderedSet.of(1, 2, 3).equals(OrderedSet.of(1, 2, 3, 4))).toBe(false);
		});

		it('should return false given a set of which this set is a superset but not a subset', () => {
			expect(OrderedSet.of(1, 2, 3).isSupersetOf(OrderedSet.of(1, 2))).toBe(true);
			expect(OrderedSet.of(1, 2, 3).isSubsetOf(OrderedSet.of(1, 2))).toBe(false);
			expect(OrderedSet.of(1, 2, 3).equals(OrderedSet.of(1, 2))).toBe(false);
		});
	});

	describe('fill()', () => {
		it('should preserve the original order given a the last item at the set starting from the last position', () => {
			expect(OrderedSet.of(1, 2, 3, 4, 5).fill(5, 4)).toEqual(OrderedSet.of(1, 2, 3, 4, 5));
		});

		it('should shorten the set given an index before the last position', () => {
			expect(OrderedSet.of(1, 2, 3, 4, 5).fill(5, 2)).toEqual(OrderedSet.of(1, 2, 5));
		});

		it('should not fill the set when the set is empty', () => {
			expect(OrderedSet.of().fill(1, 3)).toEqual(OrderedSet.of());
			expect(OrderedSet.of().fill(6)).toEqual(OrderedSet.of());
		});
	});

	describe('indices()', () => {
		it('should return the range of indices as an ordered set', () => {
			expect(OrderedSet.of('a', 'b', 'c').indices()).toBeInstanceOf(OrderedSet);
		});

		it('should return an empty ordered set when the set is empty', () => {
			expect(OrderedSet.of().indices()).toEqual(OrderedSet.of());
		});

		it('should return an ordered set of numbers from 0 to length-1 when the list is not empty', () => {
			expect(OrderedSet.of('a', 'b', 'c').indices()).toEqual(OrderedSet.of(0, 1, 2));
		});

		it('should return an ordered set with a length equal to the current size of the set', () => {
			expect(OrderedSet.of('a', 'b', 'c').indices()).toHaveLength(3);
		});

		it('should return an ordered set of indices in ascending order', () => {
			expect(OrderedSet.of('a', 'b', 'c').indices()).toEqual(OrderedSet.of(0, 1, 2));
		});

		it('should return an immutable ordered set', () => {
			expect(() => OrderedSet.of('a', 'b', 'c').indices().append(3)).toThrow(TypeError);
		});
	});

	describe('insert()', () => {
		let set: jest.MockedObject<OrderedSet> | null = null;

		beforeEach(() => {
			set = jest.mocked(OrderedSet.of(1, 2, 3));
		});

		afterEach(() => {
			jest.restoreAllMocks();
			set = null;
		});

		it('should return the same set instance', () => {
			expect(set?.insert(1, 0)).toBe(set);
		});

		it('should increase the size of the set by 1 given a unique item', () => {
			expect(OrderedSet.of('a', 'b').insert('c', 1)).toHaveLength(3);
		});

		it('should insert the given item before the specified index given a unique item and a non-zero index', () => {
			expect(OrderedSet.of('a', 'c').insert('b', 1)).toEqual(OrderedSet.of('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given a unique item and a zero index', () => {
			expect(OrderedSet.of('b', 'c').insert('a', 0)).toEqual(OrderedSet.of('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given a unique item and an index equal to length', () => {
			expect(OrderedSet.of('a', 'b').insert('c', 2)).toEqual(OrderedSet.of('a', 'b', 'c'));
		});

		it('should not insert the given item before the specified index given a duplicate item', () => {
			expect(OrderedSet.of('a', 'b', 'c').insert('b', 2)).toEqual(OrderedSet.of('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given undefined', () => {
			expect(OrderedSet.of<unknown>('a', 'b').insert(undefined, 1)).toEqual(OrderedSet.of('a', undefined, 'b'));
		});

		it('should insert the given item before the specified index given null', () => {
			expect(OrderedSet.of<unknown>('a', 'b').insert(null, 1)).toEqual(OrderedSet.of('a', null, 'b'));
		});

		it('should insert the given item before the specified index in an empty set when index is 0', () => {
			expect(OrderedSet.of().insert('a', 0)).toEqual(OrderedSet.of('a'));
		});

		it('should insert the given item before the specified index starting from the end of the set given a negative index', () => {
			expect(OrderedSet.of('a', 'b', 'c').insert('d', -1)).toEqual(OrderedSet.of('a', 'b', 'd', 'c'));
		});

		it('should insert the given item at the end of the set given an index larger than the size of the set', () => {
			expect(OrderedSet.of('a', 'b', 'c').insert('d', 4)).toEqual(OrderedSet.of('a', 'b', 'c', 'd'));
		});
	});

	describe('intersection()', () => {
		it('should return a new ordered set of items in both sets given a set of overlapping items', () => {
			expect(OrderedSet.of(1, 2, 3).intersection(OrderedSet.of(2, 3, 4))).toEqual(OrderedSet.of(2, 3));
		});

		it('should return a new empty ordered set given a set of no overlapping items', () => {
			expect(OrderedSet.of(1, 2, 3).intersection(OrderedSet.of(4, 5, 6))).toEqual(OrderedSet.of());
		});

		it('should return a new empty ordered set given an empty set', () => {
			expect(OrderedSet.of(1, 2, 3).intersection(OrderedSet.of())).toEqual(OrderedSet.of());
		});

		it('should return a new empty ordered set when the set is empty', () => {
			expect(OrderedSet.of().intersection(OrderedSet.of(2, 3, 4))).toEqual(OrderedSet.of());
			expect(OrderedSet.of().intersection(OrderedSet.of(4, 5, 6))).toEqual(OrderedSet.of());
			expect(OrderedSet.of().intersection(OrderedSet.of())).toEqual(OrderedSet.of());
		});
	});

	describe('isEmpty()', () => {
		it('should return true when the set contains no items', () => {
			expect(OrderedSet.of().isEmpty()).toBe(true);
		});

		it('should return false when the set contains at least one item', () => {
			expect(OrderedSet.of(1).isEmpty()).toBe(false);
		});

		it('should return true after emptying a non-empty set', () => {
			expect(OrderedSet.of(1, 2, 3).empty().isEmpty()).toBe(true);
		});

		it('should return false after appending an item to an empty set', () => {
			expect(OrderedSet.of().append(1).isEmpty()).toBe(false);
		});
	});

	describe('isSubsetOf()', () => {
		it('should return true given a set from which some but not all items are contained in this set', () => {
			expect(OrderedSet.of(1, 2).isSubsetOf(OrderedSet.of(1, 2, 3))).toBe(true);
		});

		it('should return false given a set which contains some but not all items from this set', () => {
			expect(OrderedSet.of(1, 2, 3).isSubsetOf(OrderedSet.of(1, 2))).toBe(false);
		});

		it('should return true given an equal set', () => {
			expect(OrderedSet.of(1, 2, 3).isSubsetOf(OrderedSet.of(1, 2, 3))).toBe(true);
		});
	});

	describe('isSupersetOf()', () => {
		it('should return true given a set which contains some but not all items from this set', () => {
			expect(OrderedSet.of(1, 2, 3).isSupersetOf(OrderedSet.of(1, 2))).toBe(true);
		});

		it('should return false given a set from which some but not all items are contained in this set', () => {
			expect(OrderedSet.of(1, 2).isSupersetOf(OrderedSet.of(1, 2, 3))).toBe(false);
		});

		it('should return true given an equal set', () => {
			expect(OrderedSet.of(1, 2, 3).isSupersetOf(OrderedSet.of(1, 2, 3))).toBe(true);
		});
	});

	describe('pop()', () => {
		let set: jest.MockedObject<OrderedSet> | null = null;
		let length: number | null = null;
		let tail: string | null = null;

		beforeEach(() => {
			set = jest.mocked(new OrderedSet('a', 'b', 'c'));
			tail = set.at(-1) as string;
			length = set.length;
		});

		afterEach(() => {
			set = null;
			length = null;
			tail = null;
		});

		it('should return the last item in the set after removing it', () => {
			expect(set?.pop()).toBe(tail);
			expect(set).not.toContain(tail);
		});

		it('should decrease the size of the set by 1', () => {
			expect(set).toHaveLength(length!);
			expect((set?.pop(), set)).toHaveLength(length! - 1);
		});

		it('should return nothing when the set is empty', () => {
			expect(new OrderedSet().pop()).toBeUndefined();
		});
	});

	describe('prepend()', () => {
		let set: jest.MockedObject<OrderedSet> | null = null;

		beforeEach(() => {
			set = jest.mocked(new OrderedSet());
		});

		afterEach(() => {
			jest.restoreAllMocks();
			set = null;
		});

		it('should return the same set instance', () => {
			expect(set?.prepend('test')).toBe(set);
		});

		it('should increase the size of the set by 1', () => {
			expect(new OrderedSet('b', 'c')).toHaveLength(2);
			expect(new OrderedSet('b', 'c').prepend('a')).toHaveLength(3);
		});

		it('should add the given item to the beginning of the set when the set is empty', () => {
			expect(new OrderedSet().prepend('test').at(0)).toBe('test');
		});

		it('should add the given item to the beginning of the set when the set is not empty', () => {
			expect(new OrderedSet('b', 'c').at(0)).not.toBe('a');
			expect(new OrderedSet('b', 'c').prepend('a').at(0)).toBe('a');
		});

		it('should not add the given item to the beginning of the set given a duplicate item', () => {
			expect(new OrderedSet('a', 'b').prepend('b')).toHaveLength(2);
			expect(new OrderedSet('a', 'b').prepend('b').at(0)).not.toBe('b');
		});

		it('should shift existing items to the right', () => {
			expect(new OrderedSet('b', 'c').prepend('a')).toEqual(new OrderedSet('a', 'b', 'c'));
		});

		it('should add the given item to the beginning of the set given undefined', () => {
			expect(new OrderedSet('b', 'c').prepend(undefined).at(0)).toBeUndefined();
		});

		it('should add the given item to the beginning of the set given null', () => {
			expect(new OrderedSet('b', 'c').prepend(null).at(0)).toBeNull();
		});

		it('should not add more than one item to the beginning of the set given an array of items', () => {
			expect(new OrderedSet(['c', 'd']).prepend(['a', 'b'])).toContainEqual(expect.arrayContaining(['a', 'b']));
			expect(new OrderedSet(['c', 'd']).prepend(['a', 'b'])).not.toContain('a');
			expect(new OrderedSet(['c', 'd']).prepend(['a', 'b'])).not.toContain('b');
		});
	});

	describe('push()', () => {
		let emptySet: jest.MockedObject<OrderedSet> | null = null;
		let set: jest.MockedObject<OrderedSet> | null = null;
		let length: number | null = null;
		let tail: string | null = null;

		beforeEach(() => {
			emptySet = jest.mocked(new OrderedSet());
			set = jest.mocked(new OrderedSet('a', 'b'));
			length = set.length;
			tail = set.at(-1) as string;
		});

		afterEach(() => {
			emptySet = null;
			set = null;
			length = null;
			tail = null;
		});

		it('should return the new length of the set', () => {
			expect(set?.push('test')).toBe(length! + 1);
		});

		it('should increase the size of the set by the number of items pushed', () => {
			expect(set).toHaveLength(length!);
			expect((set?.push('c', 'd'), set)).toHaveLength(length! + 2);
		});

		it('should add the given item to the end of the set when the set is empty given one item', () => {
			expect((emptySet?.push('a'), emptySet)?.at(-1)).toBe('a');
		});

		it('should add the given items to the end of the set when the set is empty given multiple items', () => {
			expect((emptySet?.push('a', 'b'), emptySet)?.at(-1)).toBe('b');
		});

		it('should add the given item to the end of the set when the set is not empty given one item', () => {
			expect(set?.at(-1)).not.toBe('c');
			expect((set?.push('c'), set)?.at(-1)).toBe('c');
		});

		it('should add the given items to the end of the set when the set is not empty given multiple items', () => {
			expect(set?.at(-1)).not.toBe('d');
			expect((set?.push('c', 'd'), set)?.at(-1)).toBe('d');
		});

		it('should not add the given item to the end of the set given a duplicate item', () => {
			expect((set?.push('a'), set)).toHaveLength(2);
			expect((set?.push('a'), set)?.at(-1)).not.toBe('a');
		});

		it('should add the given item to the end of the set given undefined', () => {
			expect((set?.push(undefined), set?.at(-1))).toBeUndefined();
		});

		it('should add the given item to the end of the set given null', () => {
			expect((set?.push(null), set?.at(-1))).toBeNull();
		});

		it('should not add more than one item to the end of the set given an array of items', () => {
			expect((set?.push(['c', 'd']), set)).toContainEqual(expect.arrayContaining(['c', 'd']));
			expect(set).not.toContain('c');
			expect(set).not.toContain('d');
		});
	});

	describe('replace()', () => {
		let set: jest.MockedObject<OrderedSet> | null = null;
		let condition: jest.MockedFunction<(value: unknown) => boolean> | null = null;
		let replacement: unknown = null;

		beforeEach(() => {
			set = jest.mocked(new OrderedSet());
			condition = jest.fn();
			replacement = 'd';

			set.replace(condition, replacement);
		});

		afterEach(() => {
			jest.restoreAllMocks();
			set = null;
		});

		it('should return the same set instance', () => {
			expect(set?.replace(condition!, replacement)).toBe(set);
		});

		it('should not change the size of the set', () => {
			expect(new OrderedSet('a', 'b', 'c')).toHaveLength(3);
			expect(new OrderedSet('a', 'b', 'c').replace('c', 'd')).toHaveLength(3);
			expect(new OrderedSet('a', 'b', 'c').replace('a', 'd')).toHaveLength(3);
		});

		it('should not replace an item with a replacement given a matching item', () => {
			expect(new OrderedSet('a', 'b', 'c').replace('b', 'd')).toEqual(new OrderedSet('a', 'd', 'c'));
		});

		it('should not replace any item given a non-matching item', () => {
			expect(new OrderedSet('a', 'b', 'c').replace('d', 'e')).toEqual(new OrderedSet('a', 'b', 'c'));
		});

		it('should replace duplicate items with the replacement given a duplicate replacement', () => {
			expect(new OrderedSet('a', 'b', 'c').replace('c', 'b')).toEqual(new OrderedSet('a', 'b', 'c'));
		});

		it('should replace the matching item with undefined given a replacement which is undefined', () => {
			expect(new OrderedSet('a', 'b', 'c', 'b').replace('b', undefined)).toEqual(new OrderedSet('a', undefined, 'c'));
		});

		it('should replace the matching item with null given a replacement which is null', () => {
			expect(new OrderedSet('a', 'b', 'c').replace('b', null)).toEqual(new OrderedSet('a', null, 'c'));
		});

		it('should replace matching items with the same replacement given a replacement which is the same', () => {
			expect(new OrderedSet('a', 'b', 'c').replace('b', 'b')).toEqual(new OrderedSet('a', 'b', 'c'));
		});

		it('should maintain the order of non-matching items given a matching condition', () => {
			expect(new OrderedSet('a', 'b', 'c').replace('b', 'd').at(0)).toBe('a');
			expect(new OrderedSet('a', 'b', 'c').replace('b', 'd').at(1)).toBe('d');
			expect(new OrderedSet('a', 'b', 'c').replace('b', 'd').at(2)).toBe('c');
		});

		it('should not call the given condition when the set is empty', () => {
			expect(condition).not.toHaveBeenCalled();
		});
	});

	describe('remove()', () => {
		let set: jest.MockedObject<OrderedSet> | null = null;
		let condition: jest.MockedFunction<(value: unknown) => boolean> | null = null;

		beforeEach(() => {
			set = jest.mocked(OrderedSet.of());
			condition = jest.fn(() => false);

			set.remove(condition);
		});

		afterEach(() => {
			jest.restoreAllMocks();
			set = null;
		});

		it('should return the same set instance', () => {
			expect(set?.remove(condition!)).toBe(set);
		});

		it('should decrease the size of the set by the number of removed items', () => {
			expect(OrderedSet.of('a', 'b', 'c')).toHaveLength(3);
			expect(OrderedSet.of('a', 'b', 'c').remove((item) => /[c]/.test(item as string))).toHaveLength(2);
			expect(OrderedSet.of('a', 'b', 'c').remove((item) => /[bc]/.test(item as string))).toHaveLength(1);
		});

		it('should remove all matching items given a matching condition', () => {
			expect(OrderedSet.of('a', 'b', 'c').remove((item) => /[b]/.test(item as string))).toEqual(OrderedSet.of('a', 'c'));
			expect(OrderedSet.of('a', 'b', 'c').remove((item) => /[b]/.test(item as string))).not.toContain('b');
		});

		it('should not remove non-matching items given a matching condition', () => {
			expect(OrderedSet.of('a', 'b', 'c').remove((item) => /[b]/.test(item as string))).toEqual(OrderedSet.of('a', 'c'));
		});

		it('should not remove any items given a non-matching condition', () => {
			expect(OrderedSet.of('a', 'b', 'c').remove((item) => /[d]/.test(item as string))).toEqual(OrderedSet.of('a', 'b', 'c'));
		});

		it('should remove every item given a condition matching every item', () => {
			expect(OrderedSet.of('a', 'b', 'c').remove((item) => /[abc]/.test(item as string))).toEqual(OrderedSet.of());
		});

		it('should maintain the order of non-matching items given a matching condition', () => {
			expect(OrderedSet.of('a', 'b', 'c', 'd').remove((item) => /[c]/.test(item as string)).at(0)).toBe('a');
			expect(OrderedSet.of('a', 'b', 'c', 'd').remove((item) => /[c]/.test(item as string)).at(1)).toBe('b');
			expect(OrderedSet.of('a', 'b', 'c', 'd').remove((item) => /[c]/.test(item as string)).at(2)).toBe('d');
		});

		it('should not call the given condition when the set is empty', () => {
			expect(condition).not.toHaveBeenCalled();
		});
	});

	describe('reverse()', () => {
		let set: jest.MockedObject<OrderedSet> | null = null;

		beforeEach(() => {
			set = jest.mocked(new OrderedSet(1, 2, 3));
		});

		afterEach(() => {
			jest.restoreAllMocks();
			set = null;
		});

		it('should return the same set instance', () => {
			expect(set?.reverse()).toBe(set);
		});

		it('should reverse order of elements in place', () => {
			expect(OrderedSet.of(1, 2, 3).reverse()).toEqual(OrderedSet.of(3, 2, 1));
		});

		it('should not change the size of the list', () => {
			expect(OrderedSet.of(1, 2, 3)).toHaveLength(3);
			expect(OrderedSet.of(1, 2, 3).reverse()).toHaveLength(3);
		});
	});

	describe('shift()', () => {
		let emptySet: jest.MockedObject<OrderedSet> | null = null;
		let set: jest.MockedObject<OrderedSet> | null = null;
		let firstItem: number | null = null;

		beforeEach(() => {
			emptySet = jest.mocked(new OrderedSet());
			set = jest.mocked(new OrderedSet(1, 2, 3));
			firstItem = set.at(0) as number;
		});

		afterEach(() => {
			emptySet = null;
			set = null;
			firstItem = null;
		});

		it('should remove and return first element in the set when the set is not empty', () => {
			expect(set?.shift()).toBe(firstItem);
			expect(set).not.toContain(firstItem);
		});

    it('should return undefined when set is empty', () => {
			expect(emptySet?.shift()).toBeUndefined();
		});

    it('should decrease length by 1 when the set is not empty', () => {
			expect(set).toHaveLength(3);
			expect((set?.shift(), set)).toHaveLength(2);
		});
	});

	describe('sort()', () => {
		let compare: jest.MockedFunction<(a: unknown, b: unknown) => number> | null = null;
		let emptySet: jest.MockedObject<OrderedSet> | null = null;
		let set: jest.MockedObject<OrderedSet> | null = null;

		beforeEach(() => {
			compare = jest.fn(<T = unknown>(a: T, b: T) => {
				if (a < b) {
					return -1;
				}

				if (a > b) {
					return 1;
				}

				return 0;
			});

			emptySet = jest.mocked(new OrderedSet());
			set = jest.mocked(new OrderedSet(3, 1, 2));
		});

		afterEach(() => {
			jest.resetAllMocks();
			compare = null;
			emptySet = null;
			set = null;
		});

		it('should return the same set instance', () => {
			expect(set?.sort(compare!)).toBe(set);
		});

		it('should sort items according to compare function', () => {
			expect(set?.sort(compare!)).toEqual(OrderedSet.of(1, 2, 3));
		});

		it('should not decrease the size of the set when the set is not empty', () => {
			expect(set).toHaveLength(3);
			expect(set?.sort(compare!)).toHaveLength(3);
		});

		it('should not sort items when the set is empty', () => {
			expect(emptySet).toHaveLength(0);
			expect(emptySet?.sort(compare!)).toHaveLength(0);
			expect(compare).not.toHaveBeenCalled();
		});
	});

	describe('splice()', () => {
		describe('when the set is not empty', () => {
			let set: jest.MockedObject<OrderedSet> | null = null;

			beforeEach(() => {
				set = jest.mocked(new OrderedSet(3, 1, 2));
			});

			afterEach(() => {
				jest.resetAllMocks();
				set = null;
			});

			it('should return an ordered set of removed items given a delete count greater than zero', () => {
				expect(set?.splice(0, 2)).toEqual(OrderedSet.of(3, 1));
			});

			it('should return an empty ordered set given a delete count of zero', () => {
				expect(set?.splice(0, 0)).toEqual(OrderedSet.of());
			});

			it('should remove elements at specified index given a delete count greater than zero', () => {
				expect(set).toHaveLength(3);
				expect((set?.splice(0, 2), set)).toEqual(OrderedSet.of(2));
			});

			it('should insert new elements at specified index given items to insert and a delete count of zero', () => {
				expect((set?.splice(1, 0, 4, 5), set)).toEqual(OrderedSet.of(3, 4, 5, 1, 2));
			});

			it('should insert new elements at specified index given items to insert and a delete count greater than zero', () => {
				expect((set?.splice(1, 1, 4, 5), set)).toEqual(OrderedSet.of(3, 4, 5, 2));
			});

			it('should not insert duplicate items given existing items to insert and a delete count of zero', () => {
				expect((set?.splice(1, 0, 2, 3), set)).toEqual(OrderedSet.of(3, 1, 2));
			});

			it('should not insert duplicate items given existing items to insert and a delete count greater than zero', () => {
				expect((set?.splice(1, 1, 2, 3), set)).toEqual(OrderedSet.of(3, 2));
			});

			it('should not insert duplicate items given duplicate existing items to insert and a delete count of zero', () => {
				expect((set?.splice(1, 0, 2, 3, 2, 2, 3), set)).toEqual(OrderedSet.of(3, 1, 2));
			});

			it('should not insert duplicate items given duplicate existing items to insert and a delete count greater than zero', () => {
				expect((set?.splice(1, 1, 2, 3, 2, 2, 3), set)).toEqual(OrderedSet.of(3, 2));
			});

			it('should not insert duplicate items given duplicate non-existing items to insert and a delete count of zero', () => {
				expect((set?.splice(1, 0, 4, 5, 6, 4, 4, 6), set)).toEqual(OrderedSet.of(3, 4, 5, 6, 1, 2));
			});

			it('should not insert duplicate items given duplicate non-existing items to insert and a delete count greater than zero', () => {
				expect((set?.splice(1, 1, 4, 5, 6, 4, 4, 6), set)).toEqual(OrderedSet.of(3, 4, 5, 6, 2));
			});

			it('should reduce the length by the number of items deleted given a delete count greater than zero and no items to insert', () => {
				expect(set).toHaveLength(3);
				expect((set?.splice(0, 2), set)).toHaveLength(1);
			});

			it('should remove all items given a delete count greater than the size of the set and no items to insert', () => {
				expect(set).toHaveLength(3);
				expect((set?.splice(0, 4), set)).toHaveLength(0);
			});

			it('should remove the last item in the set given a delete count of 1 and a start index of -1', () => {
				expect((set?.splice(0, 2), set)?.at(-1)).toBe(2);
			});
		});

		describe('when the set is empty', () => {
			let set: jest.MockedObject<OrderedSet> | null = null;

			beforeEach(() => {
				set = jest.mocked(new OrderedSet());
			});

			afterEach(() => {
				jest.resetAllMocks();
				set = null;
			});

			it('should return an empty ordered set given a delete count greater than zero', () => {
				expect(set?.splice(0, 2)).toEqual(OrderedSet.of());
			});

			it('should return an empty ordered set given a delete count of zero', () => {
				expect(set?.splice(0, 0)).toEqual(OrderedSet.of());
			});

			it('should do nothing given a delete count greater than zero and no items to insert', () => {
				expect((set?.splice(0, 2), set)).toEqual(OrderedSet.of());
			});

			it('should insert new elements at specified index given items to insert and a delete count of zero', () => {
				expect((set?.splice(1, 0, 4, 5), set)).toEqual(OrderedSet.of(4, 5));
			});

			it('should insert new elements at specified index given items to insert and a delete count greater than zero', () => {
				expect((set?.splice(1, 1, 4, 5), set)).toEqual(OrderedSet.of(4, 5));
			});

			it('should not insert duplicate items given duplicate non-existing items to insert and a delete count of zero', () => {
				expect((set?.splice(1, 0, 2, 2, 1, 2), set)).toEqual(OrderedSet.of(2, 1));
			});

			it('should not insert duplicate items given duplicate non-existing items to insert and a delete count greater than zero', () => {
				expect((set?.splice(1, 1, 2, 3, 2, 2, 1), set)).toEqual(OrderedSet.of(2, 3, 1));
			});

			it('should not reduce the size below zero', () => {
				expect(set).toHaveLength(0);
				expect((set?.splice(0, 2), set)).toHaveLength(0);
			});
		});
	});

	describe('union()', () => {
		it('should return a new ordered set of items in both sets given a set of overlapping items', () => {
			expect(OrderedSet.of(1, 2, 3).union(OrderedSet.of(2, 3, 4))).toEqual(OrderedSet.of(1, 2, 3, 4));
		});

		it('should return a new ordered set of items in both sets given a set of no overlapping items', () => {
			expect(OrderedSet.of(1, 2, 3).union(OrderedSet.of(4, 5, 6))).toEqual(OrderedSet.of(1, 2, 3, 4, 5, 6));
		});

		it('should return a new ordered set of the same items when the set is not empty given an empty set', () => {
			expect(OrderedSet.of(1, 2, 3).union(OrderedSet.of())).toEqual(OrderedSet.of(1, 2, 3));
		});

		it('should return a new ordered set of the given items when the set is not empty given a non-empty set', () => {
			expect(OrderedSet.of().union(OrderedSet.of(4, 5, 6))).toEqual(OrderedSet.of(4, 5, 6));
		});

		it('should return a new empty ordered set when the set is empty given an empty set', () => {
			expect(OrderedSet.of().union(OrderedSet.of())).toEqual(OrderedSet.of());
		});
	});

	describe('unshift()', () => {
		let length: number | null = null;
		let set: jest.MockedObject<OrderedSet> | null = null;

		beforeEach(() => {
			set = jest.mocked(new OrderedSet());
			({ length } = set);
		});

		afterEach(() => {
			jest.resetAllMocks();
			length = null;
			set = null;
		});

		it('should add items to beginning of set', () => {
			expect((set?.unshift(1), set)?.at(0)).toBe(1);
			expect((set?.unshift(2), set)?.at(0)).toBe(2);
			expect((set?.unshift(3, 4), set)?.at(0)).toBe(3);
		});

    it('should return the new size of the set', () => {
			expect(set?.unshift(1)).toBe(length! + 1);
			expect(set?.unshift(2, 4)).toBe(length! + 3);
		});

    it('should increase the size of the set by the number of given items given no duplicate items', () => {
			expect((set?.unshift(1), set)).toHaveLength(length! + 1);
			expect((set?.unshift(2, 4), set)).toHaveLength(length! + 3);
		});

    it('should increase the size of the set by the number of non-duplicate items given duplicate items', () => {
			expect((set?.unshift(1), set)).toHaveLength(length! + 1);
			expect((set?.unshift(1, 4, 4), set)).toHaveLength(length! + 2);
		});

    it('should not insert duplicate items given existing items', () => {
			expect((set?.unshift(1), set)).toHaveLength(length! + 1);
			expect((set?.unshift(1), set)).toHaveLength(length! + 1);
		});

    it('should not insert duplicate items given duplicate existing items', () => {
			expect((set?.unshift(1, 2, 3), set)).toHaveLength(length! + 3);
			expect((set?.unshift(1, 1, 2, 2, 3, 3), set)).toHaveLength(length! + 3);
		});

    it('should not insert duplicate items given duplicate non-existing items', () => {
			expect((set?.unshift(1, 2, 3), set)).toHaveLength(length! + 3);
			expect((set?.unshift(4, 4, 5, 5, 6, 6), set)).toHaveLength(length! + 6);
		});
	});
});

describe('OrderedSet.from()', () => {
	it('should return an ordered set given an array', () => {
		expect(OrderedSet.from([1, 2, 3])).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.from([1, 2, 3])).toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return an ordered set given a set', () => {
		expect(OrderedSet.from(new Set([1, 2, 3]))).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.from(new Set([1, 2, 3]))).toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return an ordered set given a map', () => {
		expect(OrderedSet.from(new Map([[1, 1], [2, 2], [3, 3]]))).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.from(new Map([[1, 1], [2, 2], [3, 3]]))).toEqual(OrderedSet.of([1, 1], [2, 2], [3, 3]));
	});

	it('should return an ordered set given an iterable', () => {
		expect(OrderedSet.from(new Set([1, 2, 3]).values())).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.from(new Set([1, 2, 3]).values())).toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return an ordered set given a list', () => {
		expect(OrderedSet.from(new List(1, 2, 3))).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.from(new List(1, 2, 3))).toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return an ordered set given an ordered set', () => {
		expect(OrderedSet.from(new OrderedSet(1, 2, 3))).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.from(new OrderedSet(1, 2, 3))).toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return an ordered set given a queue', () => {
		expect(OrderedSet.from(new Queue(1, 2, 3))).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.from(new Queue(1, 2, 3))).toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return an ordered set given a stack', () => {
		expect(OrderedSet.from(new Stack(1, 2, 3))).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.from(new Stack(1, 2, 3))).toEqual(OrderedSet.of(1, 2, 3));
	});
});

describe('OrderedSet.fromAsync()', () => {
	it('should return a Promise that resolves to an ordered set given an array of promises', async () => {
		await expect(OrderedSet.fromAsync([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])).resolves.toBeInstanceOf(OrderedSet);
		await expect(OrderedSet.fromAsync([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])).resolves.toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return a Promise that resolves to an ordered set given a set of promises', async () => {
		await expect(OrderedSet.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]))).resolves.toBeInstanceOf(OrderedSet);
		await expect(OrderedSet.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]))).resolves.toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return a Promise that resolves to an ordered set given an async iterable', async () => {
		await expect(OrderedSet.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).values())).resolves.toBeInstanceOf(OrderedSet);
		await expect(OrderedSet.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).values())).resolves.toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return a Promise that resolves to an ordered set given a list of promises', async () => {
		await expect(OrderedSet.fromAsync(new List(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(OrderedSet);
		await expect(OrderedSet.fromAsync(new List(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return a Promise that resolves to an ordered set given an ordered set of promises', async () => {
		await expect(OrderedSet.fromAsync(OrderedSet.of(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(OrderedSet);
		await expect(OrderedSet.fromAsync(OrderedSet.of(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return a Promise that resolves to an ordered set given a queue of promises', async () => {
		await expect(OrderedSet.fromAsync(new Queue(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(OrderedSet);
		await expect(OrderedSet.fromAsync(new Queue(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return a Promise that resolves to an ordered set given a stack of promises', async () => {
		await expect(OrderedSet.fromAsync(new Stack(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(OrderedSet);
		await expect(OrderedSet.fromAsync(new Stack(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(OrderedSet.of(1, 2, 3));
	});
});

describe('OrderedSet.isOrderedSet()', () => {
	it('should return true given a list', () => {
		expect(List.isList(new List(1, 2, 3))).toBe(true);
	});

	it('should return false given an array', () => {
		expect(List.isList([1, 2, 3])).toBe(false);
	});

	it('should return false given a set', () => {
		expect(List.isList(new Set([1, 2, 3]))).toBe(false);
	});

	it('should return false given a map', () => {
		expect(List.isList(new Map([[1, 2], [3, 4]]))).toBe(false);
	});

	it('should return false given an ordered set', () => {
		expect(List.isList(OrderedSet.of(1, 2, 3))).toBe(false);
	});

	it('should return false given a queue', () => {
		expect(List.isList(new Queue(1, 2, 3))).toBe(false);
	});

	it('should return false given a stack', () => {
		expect(List.isList(new Stack(1, 2, 3))).toBe(false);
	});
});

describe('OrderedSet.of()', () => {
	it('should return a non-empty set given arguments', () => {
		expect(OrderedSet.of(1, 2, 3)).toEqual(OrderedSet.of(1, 2, 3));
	});

	it('should return an empty set given no arguments', () => {
		expect(OrderedSet.of()).toEqual(OrderedSet.of());
	});

	it('should return a set containing a single number given a single number', () => {
		expect(OrderedSet.of(7)).toHaveLength(1);
		expect(OrderedSet.of(7)).toContain(7);
	});
});

describe('OrderedSet.parse()', () => {
	it('should return an ordered set', () => {
		expect(OrderedSet.parse('a b c')).toBeInstanceOf(OrderedSet);
	});

	it('should return a parsed set given a string with space (U+0020) characters', () => {
		expect(OrderedSet.parse('a b c')).toEqual(OrderedSet.of('a', 'b', 'c'));
	});

	it('should return a parsed set given a string with tab (U+0009) characters', () => {
		expect(OrderedSet.parse('a\tb\tc')).toEqual(OrderedSet.of('a', 'b', 'c'));
	});

	it('should return a parsed set given a string with newline (U+000A) characters', () => {
		expect(OrderedSet.parse('a\nb\nc')).toEqual(OrderedSet.of('a', 'b', 'c'));
	});

	it('should return a parsed set given a string with carriage return (U+000D) characters', () => {
		expect(OrderedSet.parse('a\rb\rc')).toEqual(OrderedSet.of('a', 'b', 'c'));
	});

	it('should return a parsed set given a string with form feed (U+000C) characters', () => {
		expect(OrderedSet.parse('a\fb\fc')).toEqual(OrderedSet.of('a', 'b', 'c'));
	});

	it('should return a parsed set given a string with multiple consecutive ASCII whitespace characters', () => {
		expect(OrderedSet.parse('a  b   c')).toEqual(OrderedSet.of('a', 'b', 'c'));
	});
	
	it('should return an unparsed set given a string with tokens separated by unicode whitespace characters (U+2003)', () => {
		expect(OrderedSet.parse('a\u2003b\u2003c')).toEqual(OrderedSet.of('a\u2003b\u2003c'));
	});

	it('should return an unparsed set given a string of tokens with no ASCII whitespace', () => {
		expect(OrderedSet.parse('abc')).toEqual(OrderedSet.of('abc'));
	});

	it('should return a parsed set given a very long string', () => {
		expect(OrderedSet.parse('a '.repeat(1000))).toEqual(OrderedSet.of('a'));
	});

	it('should return a parsed set given a string with leading ASCII whitespace', () => {
		expect(OrderedSet.parse('  a b c')).toEqual(OrderedSet.of('a', 'b', 'c'));
	});

	it('should return a parsed set given a string with trailing ASCII whitespace', () => {
		expect(OrderedSet.parse('a b c  ')).toEqual(OrderedSet.of('a', 'b', 'c'));
	});

	it('should return a parsed set given a string with mixed ASCII whitespace characters', () => {
		expect(OrderedSet.parse('a\tb \nc  ')).toEqual(OrderedSet.of('a', 'b', 'c'));
	});

	it('should return a parsed set without duplicate tokens given a string with duplicate tokens', () => {
		expect(OrderedSet.parse('a b a c')).toEqual(OrderedSet.of('a', 'b', 'c'));
	});

	it('should return a parsed set in the same order given a string with tokens', () => {
		expect(OrderedSet.parse('a b c a')).toEqual(OrderedSet.of('a', 'b', 'c'));
		expect(OrderedSet.parse('c b a')).toEqual(OrderedSet.of('c', 'b', 'a'));
		expect(OrderedSet.parse('b c a')).toEqual(OrderedSet.of('b', 'c', 'a'));
	});

	it('should return a parsed set containing non-ASCII tokens given a string with non-ASCII characters', () => {
		expect(OrderedSet.parse('a b c д е ж')).toEqual(OrderedSet.of('a', 'b', 'c', 'д', 'е', 'ж'));
	});

	it('should return a parsed set containing tokens with punctuation given tokens with punctuation', () => {
		expect(OrderedSet.parse('a b c, д е ж!')).toEqual(OrderedSet.of('a', 'b', 'c,', 'д', 'е', 'ж!'));
	});

	it('should return an empty set given an empty string', () => {
		expect(OrderedSet.parse('')).toEqual(OrderedSet.of());
	});

	it('should return an empty set given a string that contains only whitespace', () => {
		expect(OrderedSet.parse('   ')).toEqual(OrderedSet.of());
	});

	it('should be idempotent given a string of serialized tokens', () => {
		expect(OrderedSet.parse(OrderedSet.serialize(OrderedSet.parse('a b c')))).toEqual(OrderedSet.of('a', 'b', 'c'));
	});
});

describe('OrderedSet.range()', () => {
	it('should return an ordered set', () => {
		expect(OrderedSet.range(1, 10, true)).toBeInstanceOf(OrderedSet);
		expect(OrderedSet.range(1, 10, false)).toBeInstanceOf(OrderedSet);
	});

	it('should not include any duplicates', () => {
		expect(OrderedSet.range(1, 5, true)).toEqual(OrderedSet.of(1, 2, 3, 4, 5));
		expect(OrderedSet.range(1, 5)).toEqual(OrderedSet.of(1, 2, 3, 4));
	});

	it('should return a range in ascending order', () => {
		expect(OrderedSet.range(1, 5, true)).toEqual(OrderedSet.of(1, 2, 3, 4, 5).ascending());
		expect(OrderedSet.range(1, 5)).toEqual(OrderedSet.of(1, 2, 3, 4).ascending());
	});

	it('should return an empty ordered set when m < n', () => {
		expect(OrderedSet.range(5, 3, true)).toEqual(OrderedSet.of());
		expect(OrderedSet.range(0, -3)).toEqual(OrderedSet.of());
	});

	describe('when inclusive is true', () => {
		it('should return a range from n up to and including m given a value of m that is greater than n', () => {
			expect(OrderedSet.range(1, 5, true)).toEqual(OrderedSet.of(1, 2, 3, 4, 5));
		});

    it('should return an ordered set with a single item given equal values for n and m', () => {
			expect(OrderedSet.range(3, 3, true)).toEqual(OrderedSet.of(3));
		});

    it('should return a range from n up to and including m given negative values for n and m', () => {
			expect(OrderedSet.range(-5, -1, true)).toEqual(OrderedSet.of(-5, -4, -3, -2, -1));
		});

    it('should return a range from n up to and including m given mixed positive and negative integers', () => {
			expect(OrderedSet.range(-2, 2, true)).toEqual(OrderedSet.of(-2, -1, 0, 1, 2));
		});

    it('should return a range from zero up to and including m given a value of m that is greater than zero', () => {
			expect(OrderedSet.range(0, 5, true)).toEqual(OrderedSet.of(0, 1, 2, 3, 4, 5));
		});

    it('should return a range from n up to and including zero given a value of n that is less than zero', () => {
			expect(OrderedSet.range(-5, 0, true)).toEqual(OrderedSet.of(-5, -4, -3, -2, -1, 0));
		});

    it('should return a range from n up to and including m when the range is large', () => {
			expect(OrderedSet.range(1, 1000, true)).toEqual(OrderedSet.of(...Array.from({ length: 1000 }, (_, i) => i + 1)));
		});

    it('should round to next integer for n given a decimal value of n', () => {
			expect(OrderedSet.range(1.5, 5, true)).toEqual(OrderedSet.of(2, 3, 4, 5));
		});

    it('should round to last integer for m given a decimal value of m', () => {
			expect(OrderedSet.range(1, 5.9, true)).toEqual(OrderedSet.of(1, 2, 3, 4, 5));
		});

    it('should return a range from zero up to and including m given NaN for n', () => {
			expect(OrderedSet.range(NaN, 4, true)).toEqual(OrderedSet.of(0, 1, 2, 3, 4));
		});

    it('should return a range from n up to and including zero given NaN for m', () => {
			expect(OrderedSet.range(-3, NaN, true)).toEqual(OrderedSet.of(-3, -2, -1, 0));
		});
	});

	describe('when inclusive is false', () => {
		it('should return a range from n up to m given a value of m that is greater than n', () => {
			expect(OrderedSet.range(1, 5)).toEqual(OrderedSet.of(1, 2, 3, 4));
		});

    it('should return an empty ordered set given equal values for n and m', () => {
			expect(OrderedSet.range(3, 3)).toEqual(OrderedSet.of());
		});

    it('should return a range from n up to m given negative values for n and m', () => {
			expect(OrderedSet.range(-5, -1)).toEqual(OrderedSet.of(-5, -4, -3, -2));
		});

    it('should return a range from n up to m given mixed positive and negative integers', () => {
			expect(OrderedSet.range(-2, 2)).toEqual(OrderedSet.of(-2, -1, 0, 1));
		});

    it('should return a range from zero up to m given a value of m that is greater than zero', () => {
			expect(OrderedSet.range(0, 5)).toEqual(OrderedSet.of(0, 1, 2, 3, 4));
		});

    it('should return a range from n up to zero given a value of n that is less than zero', () => {
			expect(OrderedSet.range(-5, 0)).toEqual(OrderedSet.of(-5, -4, -3, -2, -1));
		});

    it('should return a range from n up to m when the range is large', () => {
			expect(OrderedSet.range(1, 1000)).toEqual(OrderedSet.of(...Array.from({ length: 999 }, (_, i) => i + 1)));
		});

    it('should round to next integer for n given a decimal value of n', () => {
			expect(OrderedSet.range(1.5, 5)).toEqual(OrderedSet.of(2, 3, 4));
		});

    it('should round to last integer for m given a decimal value of m', () => {
			expect(OrderedSet.range(1, 5.9)).toEqual(OrderedSet.of(1, 2, 3, 4));
		});

    it('should return a range from zero up to m given NaN for n', () => {
			expect(OrderedSet.range(NaN, 4)).toEqual(OrderedSet.of(0, 1, 2, 3));
		});

    it('should return a range from n up to zero given NaN for m', () => {
			expect(OrderedSet.range(-3, NaN)).toEqual(OrderedSet.of(-3, -2, -1));
		});
	});
});

describe('OrderedSet.serialize()', () => {
	it('should return a string', () => {
		/**
		 * @privateRemarks
		 * This cannot be tested with `toBeInstanceOf(String)` as that would require
		 * boxing the string primitive with String(), which is not the intended
		 * behavior.
		 */
		expect(typeof OrderedSet.serialize(OrderedSet.of('a', 'b', 'c'))).toBe('string');
	});

	it('should concatenate set items with " " (U+0020) by default', () => {
		expect(OrderedSet.serialize(OrderedSet.of('a', 'b', 'c'))).toBe('a b c');
	});

	it('should return an empty string given an empty set', () => {
		expect(OrderedSet.serialize(OrderedSet.of())).toBe('');
	});

	it('should return a non-delimited string given a set containing a single item', () => {
		expect(OrderedSet.serialize(OrderedSet.of('a'))).toBe('a');
	});

	it('should return a space-delimited string given a set containing multiple items', () => {
		expect(OrderedSet.serialize(OrderedSet.of('a', 'b', 'c'))).toBe('a b c');
	});

	it('should preserve whitespace given a set containing items with whitespaces', () => {
		expect(OrderedSet.serialize(OrderedSet.of('a b', 'c d'))).toBe('a b c d');
		expect(OrderedSet.serialize(OrderedSet.of(' a', 'b'))).toBe(' a b');
		expect(OrderedSet.serialize(OrderedSet.of('a ', 'b'))).toBe('a  b');
		expect(OrderedSet.serialize(OrderedSet.of('', ' '))).toBe('  ');
	});

	it('should preserve tab characters given a set containing items with tab characters', () => {
		expect(OrderedSet.serialize(OrderedSet.of('a\tb', 'c\td'))).toBe('a\tb c\td');
	});

	it('should preserve newline characters given a set containing items with newline characters', () => {
		expect(OrderedSet.serialize(OrderedSet.of('a\nb', 'c\nd'))).toBe('a\nb c\nd');
	});

	it('should return a space-delimited string given a set containing non-string items', () => {
		expect(OrderedSet.serialize(OrderedSet.of(1, 2, 3))).toBe('1 2 3');
		expect(OrderedSet.serialize(OrderedSet.of(1n, 2n, 3n))).toBe('1 2 3');
		expect(OrderedSet.serialize(OrderedSet.of(true, false))).toBe('true false');
	});

	it('should return a space-delimited string given a set containing symbols', () => {
		expect(OrderedSet.serialize(OrderedSet.of(Symbol('this'), Symbol('that')))).toBe('Symbol(this) Symbol(that)');
	});

	it('should return a space-delimited string with the word "null" given a set containing null', () => {
		expect(OrderedSet.serialize(OrderedSet.of(null))).toBe('null');
		expect(OrderedSet.serialize(OrderedSet.of<unknown>('a', 'b', null))).toBe('a b null');
		expect(OrderedSet.serialize(OrderedSet.of<unknown>('a', null, 'b'))).toBe('a null b');
	});

	it('should return a space-delimited string with the word "undefined" given a set containing undefined', () => {
		expect(OrderedSet.serialize(OrderedSet.of(undefined))).toBe('undefined');
		expect(OrderedSet.serialize(OrderedSet.of<unknown>('a', 'b', undefined))).toBe('a b undefined');
		expect(OrderedSet.serialize(OrderedSet.of<unknown>('a', undefined, 'b'))).toBe('a undefined b');
	});

	it('should return a space-delimited string with stringified objects given a set containing objects', () => {
		expect(OrderedSet.serialize(OrderedSet.of({ a: 1 }, { b: 2 }))).toBe('{"a":1} {"b":2}');
	});

	it('should return a space-delimited string with stringified arrays given a set containing arrays', () => {
		expect(OrderedSet.serialize(OrderedSet.of([1, 2], [3, 4]))).toBe('[1,2] [3,4]');
		expect(OrderedSet.serialize(OrderedSet.of(['a', 'b'], ['c', 'd']))).toBe('["a","b"] ["c","d"]');
	});

	it('should return a space-delimited string in the same order given a non-empty set', () => {
		expect(OrderedSet.serialize(OrderedSet.of('a', 'b', 'c'))).toBe('a b c');
		expect(OrderedSet.serialize(OrderedSet.of('b', 'a', 'c'))).toBe('b a c');
		expect(OrderedSet.serialize(OrderedSet.of('c', 'a', 'b'))).toBe('c a b');
		expect(OrderedSet.serialize(OrderedSet.of('c', 'b', 'a'))).toBe('c b a');
	});

	it('should return an empty string given a set containing only empty strings', () => {
		expect(OrderedSet.serialize(OrderedSet.of('', ''))).toBe('');
	});

	it('should be idempotent given a parsed set of strings', () => {
		expect(OrderedSet.serialize(OrderedSet.parse(OrderedSet.serialize(OrderedSet.of('a', 'b', 'c'))))).toEqual('a b c');
	});
});
