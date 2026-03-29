import { jest } from '@jest/globals';
import List from './List';
import OrderedSet from '../OrderedSet';
import Stack from '../Stack';
import Queue from '../Queue';

describe('List', () => {
	let list: List | null = null;

	beforeAll(() => {
		list = new List();
	});

	afterAll(() => {
		jest.restoreAllMocks();

		list = null;
	});

	it('should have a size as a number of items the list contains', () => {
		expect(list).toHaveProperty('length', expect.any(Number));
	});

	it('should be able to add items by appending, inserting, or prepending', () => {
		expect(list).toHaveProperty('append', expect.any(Function));
		expect(list).toHaveProperty('insert', expect.any(Function));
		expect(list).toHaveProperty('prepend', expect.any(Function));
	});

	it('should be able to check if it contains an item', () => {
		expect(list).toHaveProperty('contains', expect.any(Function));
	});

	it('should be able to remove all of its items', () => {
		expect(list).toHaveProperty('empty', expect.any(Function));
	});

	it('should be able to extend another collection of items', () => {
		expect(list).toHaveProperty('extend', expect.any(Function));
	});

	it('should be able to provide a range of all indices', () => {
		expect(list).toHaveProperty('indices', expect.any(Function));
	});

	it('should be able to check if it is empty', () => {
		expect(list).toHaveProperty('isEmpty', expect.any(Function));
	});

	it('should be able to remove items', () => {
		expect(list).toHaveProperty('remove', expect.any(Function));
	});

	it('should be able to replace items', () => {
		expect(list).toHaveProperty('replace', expect.any(Function));
	});

	it('should be the result of invoking a constructor named List', () => {
		expect(Object.getPrototypeOf(list)).toHaveProperty('constructor', List);
		expect(Object.getPrototypeOf(list)).toBe(List.prototype);
	});

	it('should be disposable', () => {
		expect(Object.getPrototypeOf(list)).toHaveProperty([Symbol.dispose]);
	});

	it('should have a string tag of "List"', () => {
		expect(Object.getPrototypeOf(list)).toHaveProperty([Symbol.toStringTag]);
		expect(Object.prototype.toString.call(list)).toBe('[object List]');
	});

	it('should have Array-like static methods', () => {
		expect(List).toHaveProperty('from', expect.any(Function));
		expect(List).toHaveProperty('fromAsync', expect.any(Function));
		expect(List).toHaveProperty('isList', expect.any(Function));
		expect(List).toHaveProperty('of', expect.any(Function));
	});

	it('should return lists instead of arrays from built-in Array methods that return arrays', () => {
		expect(List.of<number>(1, 2, 4).concat(4, 5, 6)).toBeInstanceOf(List);
		expect(List.of<unknown>(1, 2, [4]).flat()).toBeInstanceOf(List);
		expect(List.of<number>(1, 2, 4).flatMap((item) => [item, item * 2])).toBeInstanceOf(List);
		expect(List.of<number>(1, 2, 4).map((item) => item * 2)).toBeInstanceOf(List);
		expect(List.of<number>(1, 2, 4).slice(1)).toBeInstanceOf(List);
		expect(List.of<number>(1, 2, 4).toReversed()).toBeInstanceOf(List);
		expect(List.of<number>(1, 2, 4).toSorted()).toBeInstanceOf(List);
		expect(List.of<number>(1, 2, 4).toSpliced(1, 1, 3)).toBeInstanceOf(List);
		expect(List.of<number>(1, 2, 4).with(1, 3)).toBeInstanceOf(List);
	});

	it('should be sealed', () => {
		expect(Object.isSealed(List)).toBe(true);
	});
});

describe('new List()', () => {
	it('should return an empty list given no arguments', () => {
		expect(new List()).toBeInstanceOf(List);
		expect(new List()).toHaveLength(0);
	});

	it('should return an empty list with a length equal to the argument given one argument that is a number', () => {
		expect(new List(5)).toBeInstanceOf(List);
		expect(new List(5)).toHaveLength(5);
		expect(new List(5)).not.toContain(5);
	});

	it('should return a list with one item given one argument that is not a number', () => {
		expect(new List('test')).toBeInstanceOf(List);
		expect(new List('test')).toHaveLength(1);
		expect(new List('test')).toContain('test');
	});

	it('should return a list with one item given one argument that is an array of items', () => {
		expect(new List(['a', 'b', 'c'])).toBeInstanceOf(List);
		expect(new List(['a', 'b', 'c'])).toHaveLength(1);
		expect(new List(['a', 'b', 'c'])).toContainEqual(['a', 'b', 'c']);
	});

	it('should return a list with multiple items given multiple arguments', () => {
		expect(new List('a', 'b', 'c')).toBeInstanceOf(List);
		expect(new List('a', 'b', 'c')).toHaveLength(3);
		expect(new List('a', 'b', 'c')).toContain('a');
		expect(new List('a', 'b', 'c')).toContain('b');
		expect(new List('a', 'b', 'c')).toContain('c');
	});

	it('should return a list with duplicate items given duplicate arguments', () => {
		expect(new List('a', 'b', 'c', 'a')).toBeInstanceOf(List);
		expect(new List('a', 'b', 'c', 'a')).toHaveLength(4);
		expect(new List('a', 'b', 'c', 'a')).toEqual(List.of('a', 'b', 'c', 'a'));
	});
});

describe('list[index]', () => {
	let emptyList: List | null = null;
	let frozenList: List | null = null;
	let list: List | null = null;

	beforeEach(() => {
		emptyList = new List();
		frozenList = Object.freeze(new List(1, 2, 3));
		list = new List(1, 2, 3);
	});

	afterEach(() => {
		emptyList = null;
		frozenList = null;
		list = null;
	});

	it('should return undefined when the list is empty given any index', () => {
		expect(emptyList).toEqual(List.of());
		expect(emptyList![0]).toBeUndefined();
		expect(emptyList![1]).toBeUndefined();
		expect(emptyList![-1]).toBeUndefined();
	});

	it('should return undefined when the list is not empty given an index greater than the size of the list', () => {
		expect(list).toEqual(List.of(1, 2, 3));
		expect(list![3]).toBeUndefined();
	});

	it('should return undefined when the list is not empty given an index less than zero', () => {
		expect(list).toEqual(List.of(1, 2, 3));
		expect(list![-1]).toBeUndefined();
	});

	it('should return the first item when the list is not empty given an index of zero', () => {
		expect(list).toEqual(List.of(1, 2, 3));
		expect(list![0]).toBe(1);
	});

	it('should return the correct item when the list is not empty given an index between one and the size of the list', () => {
		expect(list).toEqual(List.of(1, 2, 3));
		expect(list![1]).toBe(2);
		expect(list![2]).toBe(3);
	});

	it('should assign an item when the list is empty given an index greater than or equal to zero', () => {
		expect(emptyList).toEqual(List.of());
		expect((emptyList![1] = 4, emptyList)![1]).toBe(4);
	});

	it('should assign an item when the list is empty given an index less than zero', () => {
		expect(emptyList).toEqual(List.of());
		expect((emptyList![-1] = 4, emptyList)![-1]).toBe(4);
	});

	it('should assign an item when the list is not empty given an index of an existing item', () => {
		expect(list).toEqual(List.of(1, 2, 3));
		expect((list![1] = 4, list)).toEqual(List.of(1, 4, 3));
	});

	it('should assign a duplicate item when the list is not empty given an index of an existing item', () => {
		expect(list).toEqual(List.of(1, 2, 3));
		expect((list![1] = 1, list)).toEqual(List.of(1, 1, 3));
	});

	it('should assign a duplicate item when the list is not empty given an index greater than the size of the list', () => {
		expect(list).toEqual(List.of(1, 2, 3));
		expect((list![3] = 1, list)).toEqual(List.of(1, 2, 3, 1));
	});

	it('should not assign an item when the list is frozen given any index', () => {
		expect(frozenList).toEqual(List.of(1, 2, 3));
		expect(() => frozenList![3] = 1).toThrow(TypeError);
	});

	it('should delete an item when the list is not empty given an index of an existing item', () => {
		expect(list).toEqual(List.of(1, 2, 3));
		expect((delete list![1], list)).toEqual(List.of(1, undefined, 3));
	});

	it('should not delete an item when the list is not empty given an index greater than the size of the list', () => {
		expect((delete list![3], list)).toEqual(List.of(1, 2, 3));
	});

	it('should not delete an item when the list is empty given any index', () => {
		expect((delete emptyList![1], emptyList)).toEqual(List.of());
	});

	it('should not delete an item when the list is frozen given any index', () => {
		expect(frozenList).toEqual(List.of(1, 2, 3));
		expect(() => delete frozenList![1]).toThrow(TypeError);
	});
});

describe('List.prototype', () => {
	it('should be sealed', () => {
		expect(Object.isSealed(List.prototype)).toBe(true);
	});

	describe('append()', () => {
		let list: jest.MockedObject<List> | null = null;

		beforeEach(() => {
			list = jest.mocked(new List());
		});

		afterEach(() => {
			jest.restoreAllMocks();
			list = null;
		});

		it('should return the same list instance', () => {
			expect(list?.append('test')).toBe(list);
		});

		it('should increase the size of the list by 1', () => {
			expect(new List('a', 'b')).toHaveLength(2);
			expect(new List('a', 'b').append('c')).toHaveLength(3);
		});

		it('should add the given item to the end of the list when the list is empty', () => {
			expect(new List().append('test').at(-1)).toBe('test');
		});

		it('should add the given item to the end of the list when the list is not empty', () => {
			expect(new List('a', 'b').at(-1)).not.toBe('c');
			expect(new List('a', 'b').append('c').at(-1)).toBe('c');
		});

		it('should add the given item to the end of the list given a duplicate item', () => {
			expect(new List('a', 'b').append('a')).toHaveLength(3);
			expect(new List('a', 'b').append('a').at(-1)).toBe('a');
		});

		it('should add the given item to the end of the list given undefined', () => {
			expect(new List().append(undefined).at(-1)).toBeUndefined();
		});

		it('should add the given item to the end of the list given null', () => {
			expect(new List().append(null).at(-1)).toBeNull();
		});

		it('should not add more than one item to the end of the list given an array of items', () => {
			expect(new List(['a', 'b']).append(['c', 'd'])).toContainEqual(expect.arrayContaining(['c', 'd']));
			expect(new List(['a', 'b']).append(['c', 'd'])).not.toContain('c');
			expect(new List(['a', 'b']).append(['c', 'd'])).not.toContain('d');
		});
	});

	describe('clone()', () => {
		let list: jest.MockedObject<List> | null = null;

		beforeEach(() => {
			list = jest.mocked(new List(1, 2, 3));
		});

		afterEach(() => {
			jest.restoreAllMocks();
			list = null;
		});

		it('should return a new List instance', () => {
			expect(list?.clone()).toBeInstanceOf(List);
			expect(list?.clone()).not.toBe(list);
		});

		it('should contain the same items in the same order', () => {
			expect(new List(1, 2, 3).clone()).toEqual(new List(1, 2, 3));
		});

		it('should have the same length as the original list', () => {
			expect(list?.clone()).toHaveLength(list!.length);
		});

		it('should return a new empty list when the list is empty', () => {
			expect(new List().clone()).toEqual(new List());
		});

		it('should not modify the original list when the list is not empty', () => {
			expect(list?.clone()).toEqual(new List(1, 2, 3));
		});

		it('should clone the list when the list contains primitive values', () => {
			expect(new List(1, 'two', true).clone()).toEqual(new List(1, 'two', true));
		});

		it('should clone the list when the list contains object values', () => {
			expect(new List({ a: 1 }, [2], 'three').clone()).toEqual(new List({ a: 1 }, [2], 'three'));
		});

		it('should maintain item references for objects (shallow copy)', () => {
			expect(list?.append({ a: 1 }).clone()[0]).toBe(list![0]);
		});

		it('should return a new list that contains undefined when the list contains undefined', () => {
			expect(list?.append(undefined).clone()).toContain(undefined);
		});

		it('should return a new list that contains null when the list contains null', () => {
			expect(list?.append(null).clone()).toContain(null);
		});
	});

	describe('contains()', () => {
		it('should return true given a value which exists in list', () => {
			expect(new List('test').contains('test')).toBe(true);
		});

		it('should return false given a value which does not exist in list', () => {
			expect(new List('this').contains('that')).toBe(false);
		});

		it('should return false when the list is empty', () => {
			expect(new List().contains('test')).toBe(false);
			expect(new List().contains(undefined)).toBe(false);
			expect(new List().contains(null)).toBe(false);
		});

		it('should return true given undefined when the list contains undefined', () => {
			expect(new List(undefined).contains(undefined)).toBe(true);
		});

		it('should return true given null when the list contains null', () => {
			expect(new List(null).contains(null)).toBe(true);
		});

		it('should use strict equality comparison', () => {
			expect(new List({}).contains({})).toBe(false);
			expect(new List([]).contains([])).toBe(false);
		});
	});

	describe('empty()', () => {
		let list: jest.MockedObject<List> | null = null;

		beforeEach(() => {
			list = jest.mocked(new List(1, 2, 3, {}));
		});

		afterEach(() => {
			jest.restoreAllMocks();
			list = null;
		});

		it('should return the same list instance', () => {
			expect(list?.empty()).toBe(list);
		});

		it('should change the size of the list to 0', () => {
			expect(new List(1, 2, 3).empty()).toHaveLength(0);
			expect(list?.empty()).toHaveLength(0);
		});

		it('should remove all items from the list when the list contains one or more items', () => {
			expect(new List(1, 2, 3).empty()).not.toContain(1);
			expect(new List(1, 2, 3).empty()).not.toContain(2);
			expect(new List(1, 2, 3).empty()).not.toContain(3);
		});

		it('should do nothing when the list contains no items', () => {
			expect(new List()).toHaveLength(0);
			expect(new List().empty()).toHaveLength(0);
		});

		it('should not affect other lists when items are shared', () => {
			expect(list?.clone().empty()).toHaveLength(0);
			expect(list).toHaveLength(4);
		});
	});

	describe('extend()', () => {
		let list: jest.MockedObject<List> | null = null;

		beforeEach(() => {
			list = jest.mocked(new List(1, 2, {}));
		});

		afterEach(() => {
			jest.restoreAllMocks();
			list = null;
		});

		it('should add all items from the given list to the end of the list given a non-empty list', () => {
			expect(new List(1, 2)).not.toContain(3);
			expect(new List(1, 2)).not.toContain(4);
			expect(new List(1, 2).extend(new List(3, 4))).toContain(3);
			expect(new List(1, 2).extend(new List(3, 4))).toContain(4);
		});

		it('should increase the size of the list by the size of the given list', () => {
			expect(new List(1, 2)).toHaveLength(2);
			expect(new List(1, 2).extend(new List(3, 4))).toHaveLength(4);
		});

		it('should return the same list instance', () => {
			expect(list?.extend(new List(3, 4))).toBe(list);
		});

		it('should add all items from the given list given a non-empty list-like', () => {
			expect(new List(1, 2)).toHaveLength(2);
			expect(new List(1, 2).extend([3, 4])).toEqual(new List(1, 2, 3, 4));
			expect(new List(1, 2).extend(new Set([3, 4]))).toEqual(new List(1, 2, 3, 4));
			expect(new List(1, 2).extend(new OrderedSet(3, 4))).toEqual(new List(1, 2, 3, 4));
			expect(new List(1, 2).extend(new Stack(3, 4))).toEqual(new List(1, 2, 3, 4));
			expect(new List(1, 2).extend(new Queue(3, 4))).toEqual(new List(1, 2, 3, 4));
		});

		it('should maintain the order of items added from the given list', () => {
			expect(new List(1, 2).extend(new List(3, 4))).toEqual(new List(1, 2, 3, 4));
		});

		it('should add all items from the given list when the current list is empty', () => {
			expect(new List()).not.toEqual(new List(1, 2));
			expect(new List().extend(new List(1, 2))).toEqual(new List(1, 2));
		});

		it('should add all items from the given list given the same list when the current list is not empty', () => {
			expect(list).toHaveLength(3);
			expect(list?.extend(list)).toHaveLength(6);
		});

		it('should add all items from the given list given a list with duplicate items', () => {
			expect(new List(1, 2, 3).extend(new List(2, 3, 4))).toEqual(new List(1, 2, 3, 2, 3, 4));
		});

		it('should not modify the original list', () => {
			expect(new List(1, 2).extend(list!)).toHaveLength(5);
			expect(list).toHaveLength(3);
		});
	});

	describe('indices()', () => {
		it('should return the range of indices as an ordered set', () => {
			expect(new List('a', 'b', 'c').indices()).toBeInstanceOf(OrderedSet);
		});

		it('should return an empty ordered set when the list is empty', () => {
			expect(new List().indices()).toEqual(new OrderedSet());
		});

		it('should return an ordered set of numbers from 0 to length-1 when the list is not empty', () => {
			expect(new List('a', 'b', 'c').indices()).toEqual(new OrderedSet(0, 1, 2));
		});

		it('should return an ordered set with a length equal to the current size of the list', () => {
			expect(new List('a', 'b', 'c').indices()).toHaveLength(3);
		});

		it('should return an ordered set of indices in ascending order', () => {
			expect(new List('a', 'b', 'c').indices()).toEqual(new OrderedSet(0, 1, 2));
		});

		it('should return an immutable ordered set', () => {
			expect(() => new List('a', 'b', 'c').indices().append(3)).toThrow(TypeError);
		});
	});

	describe('insert()', () => {
		let list: jest.MockedObject<List> | null = null;

		beforeEach(() => {
			list = jest.mocked(new List(1, 2, {}));
		});

		afterEach(() => {
			jest.restoreAllMocks();
			list = null;
		});

		it('should return the same list instance', () => {
			expect(list?.insert(1, 0)).toBe(list);
		});

		it('should increase the size of the list by 1', () => {
			expect(new List('a', 'b').insert('c', 1)).toHaveLength(3);
		});

		it('should insert the given item before the specified index given an item and a non-zero index', () => {
			expect(new List('a', 'c').insert('b', 1)).toEqual(new List('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given an item and a zero index', () => {
			expect(new List('b', 'c').insert('a', 0)).toEqual(new List('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given an item and an index equal to length', () => {
			expect(new List('a', 'b').insert('c', 2)).toEqual(new List('a', 'b', 'c'));
		});

		it('should insert the given item before the specified index given duplicate items', () => {
			expect(new List('a', 'b', 'c').insert('b', 2)).toEqual(new List('a', 'b', 'b', 'c'));
		});

		it('should insert the given item before the specified index given undefined', () => {
			expect(new List('a', 'b').insert(undefined, 1)).toEqual(new List('a', undefined, 'b'));
		});

		it('should insert the given item before the specified index given null', () => {
			expect(new List('a', 'b').insert(null, 1)).toEqual(new List('a', null, 'b'));
		});

		it('should insert the given item before the specified index in an empty list when index is 0', () => {
			expect(new List().insert('a', 0)).toEqual(new List('a'));
		});

		it('should insert the given item before the specified index starting from the end of the list given a negative index', () => {
			expect(new List('a', 'b', 'c').insert('d', -1)).toEqual(new List('a', 'b', 'd', 'c'));
		});

		it('should insert the given item at the end of the list given an index larger than the size of the list', () => {
			expect(new List('a', 'b', 'c').insert('d', 4)).toEqual(new List('a', 'b', 'c', 'd'));
		});
	});

	describe('isEmpty()', () => {
		it('should return true when the list contains no items', () => {
			expect(new List().isEmpty()).toBe(true);
		});

		it('should return false when the list contains at least one item', () => {
			expect(new List(1).isEmpty()).toBe(false);
		});

		it('should return true after emptying a non-empty list', () => {
			expect(new List(1, 2, 3).empty().isEmpty()).toBe(true);
		});

		it('should return false after appending an item to an empty list', () => {
			expect(new List().append(1).isEmpty()).toBe(false);
		});
	});

	describe('prepend()', () => {
		let list: jest.MockedObject<List> | null = null;

		beforeEach(() => {
			list = jest.mocked(new List());
		});

		afterEach(() => {
			jest.restoreAllMocks();
			list = null;
		});

		it('should return the same list instance', () => {
			expect(list?.prepend('test')).toBe(list);
		});

		it('should increase the size of the list by 1', () => {
			expect(new List('b', 'c')).toHaveLength(2);
			expect(new List('b', 'c').prepend('a')).toHaveLength(3);
		});

		it('should add the given item to the beginning of the list when the list is empty', () => {
			expect(new List().prepend('test').at(0)).toBe('test');
		});

		it('should add the given item to the beginning of the list when the list is not empty', () => {
			expect(new List('b', 'c').at(0)).not.toBe('a');
			expect(new List('b', 'c').prepend('a').at(0)).toBe('a');
		});

		it('should add the given item to the beginning of the list given a duplicate item', () => {
			expect(new List('a', 'b').prepend('b')).toHaveLength(3);
			expect(new List('a', 'b').prepend('b').at(0)).toBe('b');
		});

		it('should shift existing items to the right', () => {
			expect(new List('b', 'c').prepend('a')).toEqual(new List('a', 'b', 'c'));
		});

		it('should add the given item to the beginning of the list given undefined', () => {
			expect(new List('b', 'c').prepend(undefined).at(0)).toBeUndefined();
		});

		it('should add the given item to the beginning of the list given null', () => {
			expect(new List('b', 'c').prepend(null).at(0)).toBeNull();
		});

		it('should not add more than one item to the beginning of the list given an array of items', () => {
			expect(new List(['c', 'd']).prepend(['a', 'b'])).toContainEqual(expect.arrayContaining(['a', 'b']));
			expect(new List(['c', 'd']).prepend(['a', 'b'])).not.toContain('a');
			expect(new List(['c', 'd']).prepend(['a', 'b'])).not.toContain('b');
		});
	});

	describe('remove()', () => {
		let list: jest.MockedObject<List> | null = null;
		let condition: jest.MockedFunction<(value: unknown) => boolean> | null = null;

		beforeEach(() => {
			list = jest.mocked(new List());
			condition = jest.fn();

			list.remove(condition);
		});

		afterEach(() => {
			jest.restoreAllMocks();
			list = null;
		});

		it('should return the same list instance', () => {
			expect(list?.remove(condition!)).toBe(list);
		});

		it('should decrease the size of the list by the number of removed items', () => {
			expect(new List('a', 'b', 'c')).toHaveLength(3);
			expect(new List('a', 'b', 'c').remove((item) => /[c]/.test(item as string))).toHaveLength(2);
			expect(new List('a', 'b', 'c').remove((item) => /[bc]/.test(item as string))).toHaveLength(1);
		});

		it('should remove all matching items given a matching condition', () => {
			expect(new List('a', 'b', 'c', 'b').remove((item) => /[b]/.test(item as string))).not.toContain('b');
		});

		it('should not remove non-matching items given a matching condition', () => {
			expect(new List('a', 'b', 'c', 'b').remove((item) => /[b]/.test(item as string))).toEqual(new List('a', 'c'));
		});

		it('should not remove any items given a non-matching condition', () => {
			expect(new List('a', 'b', 'c').remove((item) => /[d]/.test(item as string))).toEqual(new List('a', 'b', 'c'));
		});

		it('should remove every item given a condition matching every item', () => {
			expect(new List('a', 'b', 'c').remove((item) => /[abc]/.test(item as string))).toEqual(new List());
		});

		it('should remove duplicate items given a matching condition', () => {
			expect(new List('a', 'b', 'c', 'b').remove((item) => /[b]/.test(item as string))).toEqual(new List('a', 'c'));
			expect(new List('a', 'b', 'c', 'c').remove((item) => /[bc]/.test(item as string))).toEqual(new List('a'));
		});

		it('should maintain the order of non-matching items given a matching condition', () => {
			expect(new List('a', 'b', 'b', 'c', 'b', 'c').remove((item) => /[c]/.test(item as string)).at(0)).toBe('a');
			expect(new List('a', 'b', 'b', 'c', 'b', 'c').remove((item) => /[c]/.test(item as string)).at(1)).toBe('b');
			expect(new List('a', 'b', 'b', 'c', 'b', 'c').remove((item) => /[c]/.test(item as string)).at(2)).toBe('b');
			expect(new List('a', 'b', 'b', 'c', 'b', 'c').remove((item) => /[c]/.test(item as string)).at(3)).toBe('b');
		});

		it('should not call the given condition when the list is empty', () => {
			expect(condition).not.toHaveBeenCalled();
		});
	});

	describe('replace()', () => {
		let list: jest.MockedObject<List> | null = null;
		let condition: jest.MockedFunction<(value: unknown) => boolean> | null = null;
		let replacement: unknown = null;

		beforeEach(() => {
			list = jest.mocked(new List());
			condition = jest.fn();
			replacement = 'd';

			list.replace(condition, replacement);
		});

		afterEach(() => {
			jest.restoreAllMocks();
			list = null;
		});

		it('should return the same list instance', () => {
			expect(list?.replace(condition!, replacement)).toBe(list);
		});

		it('should not change the size of the list', () => {
			expect(new List('a', 'b', 'c')).toHaveLength(3);
			expect(new List('a', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd')).toHaveLength(3);
			expect(new List('a', 'b', 'c').replace((item) => /[bc]/.test(item as string), 'd')).toHaveLength(3);
		});

		it('should replace all matching items with the replacement given a matching condition', () => {
			expect(new List('a', 'b', 'c', 'b')).not.toContain('d');
			expect(new List('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).not.toContain('b');
			expect(new List('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).toContain('d');
		});

		it('should not replace non-matching items given a matching condition', () => {
			expect(new List('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).toEqual(new List('a', 'd', 'c', 'd'));
		});

		it('should not replace any items given a non-matching condition', () => {
			expect(new List('a', 'b', 'c').replace((item) => /[d]/.test(item as string), 'd')).toEqual(new List('a', 'b', 'c'));
		});

		it('should replace every item with the replacement given a condition matching every item', () => {
			expect(new List('a', 'b', 'c').replace((item) => /[abc]/.test(item as string), 'd')).toEqual(new List('d', 'd', 'd'));
		});

		it('should replace duplicate items with the replacement given a matching condition', () => {
			expect(new List('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'd')).toEqual(new List('a', 'd', 'c', 'd'));
			expect(new List('a', 'b', 'c', 'c').replace((item) => /[bc]/.test(item as string), 'd')).toEqual(new List('a', 'd', 'd', 'd'));
		});

		it('should replace matching items with undefined given a replacement which is undefined', () => {
			expect(new List('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), undefined)).toEqual(new List('a', undefined, 'c', undefined));
			expect(new List('a', 'b', 'c', 'c').replace((item) => /[bc]/.test(item as string), undefined)).toEqual(new List('a', undefined, undefined, undefined));
		});

		it('should replace matching items with null given a replacement which is null', () => {
			expect(new List('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), null)).toEqual(new List('a', null, 'c', null));
			expect(new List('a', 'b', 'c', 'c').replace((item) => /[bc]/.test(item as string), null)).toEqual(new List('a', null, null, null));
		});

		it('should replace matching items with the same replacement given a replacement which is the same', () => {
			expect(new List('a', 'b', 'c', 'b').replace((item) => /[b]/.test(item as string), 'b')).toEqual(new List('a', 'b', 'c', 'b'));
		});

		it('should maintain the order of non-matching items given a matching condition', () => {
			expect(new List('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(0)).toBe('a');
			expect(new List('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(1)).toBe('b');
			expect(new List('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(2)).toBe('b');
			expect(new List('a', 'b', 'b', 'c', 'b', 'c').replace((item) => /[c]/.test(item as string), 'd').at(4)).toBe('b');
		});

		it('should not call the given condition when the list is empty', () => {
			expect(condition).not.toHaveBeenCalled();
		});
	});
});

describe('List.from()', () => {
	let iterable: Iterable<number> | null = null;

	beforeAll(() => {
		iterable = (function* () {
			for (let i = 0; i < 3; i++) {
				yield i + 1;
			}
		})();
	});

	afterAll(() => {
		iterable = null;
	});

	it('should return a list given an array', () => {
		expect(List.from([1, 2, 3])).toBeInstanceOf(List);
		expect(List.from([1, 2, 3])).toEqual(new List(1, 2, 3));
	});

	it('should return a list given a set', () => {
		expect(List.from(new Set([1, 2, 3]))).toBeInstanceOf(List);
		expect(List.from(new Set([1, 2, 3]))).toEqual(new List(1, 2, 3));
	});

	it('should return a list given a map', () => {
		expect(List.from(new Map([[1, 1], [2, 2], [3, 3]]))).toBeInstanceOf(List);
		expect(List.from(new Map([[1, 1], [2, 2], [3, 3]]))).toEqual(new List([1, 1], [2, 2], [3, 3]));
	});

	it('should return a list given an iterable', () => {
		expect(List.from(new Set([1, 2, 3]).values())).toBeInstanceOf(List);
		expect(List.from(new Set([1, 2, 3]).values())).toEqual(new List(1, 2, 3));
	});

	it('should return a list given an ordered set', () => {
		expect(List.from(new OrderedSet(1, 2, 3))).toBeInstanceOf(List);
		expect(List.from(new OrderedSet(1, 2, 3))).toEqual(new List(1, 2, 3));
	});

	it('should return a list given a queue', () => {
		expect(List.from(new Queue(1, 2, 3))).toBeInstanceOf(List);
		expect(List.from(new Queue(1, 2, 3))).toEqual(new List(1, 2, 3));
	});

	it('should return a list given a stack', () => {
		expect(List.from(new Stack(1, 2, 3))).toBeInstanceOf(List);
		expect(List.from(new Stack(1, 2, 3))).toEqual(new List(1, 2, 3));
	});
});

describe('List.fromAsync()', () => {
	let asyncIterable: AsyncIterable<number> | null = null;

	beforeAll(() => {
		asyncIterable = (async function* () {
			for (let i = 0; i < 3; i++) {
				await new Promise((resolve) => setTimeout(resolve, 10 * i));
				yield i + 1;
			}
		})();
	});

	afterAll(() => {
		asyncIterable = null;
	});

	it('should return a Promise that resolves to a list given an array of promises', async () => {
		await expect(List.fromAsync([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])).resolves.toBeInstanceOf(List);
		await expect(List.fromAsync([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])).resolves.toEqual(new List(1, 2, 3));
	});

	it('should return a Promise that resolves to a list given a set of promises', async () => {
		await expect(List.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]))).resolves.toBeInstanceOf(List);
		await expect(List.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]))).resolves.toEqual(new List(1, 2, 3));
	});

	it('should return a Promise that resolves to a list given an async iterable', async () => {
		await expect(List.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).values())).resolves.toBeInstanceOf(List);
		await expect(List.fromAsync(new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).values())).resolves.toEqual(new List(1, 2, 3));
	});

	// it('should return a Promise that resolves to a list given an async iterable', async () => {
	// 	await expect(List.fromAsync(asyncIterable!)).resolves.toBeInstanceOf(List);
	// 	await expect(List.fromAsync(asyncIterable!)).resolves.toEqual(new List(1, 2, 3));
	// });

	it('should return a Promise that resolves to a list given an ordered set of promises', async () => {
		await expect(List.fromAsync(new OrderedSet(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(List);
		await expect(List.fromAsync(new OrderedSet(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(new List(1, 2, 3));
	});

	it('should return a Promise that resolves to a list given a queue of promises', async () => {
		await expect(List.fromAsync(new Queue(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(List);
		await expect(List.fromAsync(new Queue(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(new List(1, 2, 3));
	});

	it('should return a Promise that resolves to a list given a stack of promises', async () => {
		await expect(List.fromAsync(new Stack(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toBeInstanceOf(List);
		await expect(List.fromAsync(new Stack(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)))).resolves.toEqual(new List(1, 2, 3));
	});
});

describe('List.isList()', () => {
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
		expect(List.isList(new OrderedSet(1, 2, 3))).toBe(false);
	});

	it('should return false given a queue', () => {
		expect(List.isList(new Queue(1, 2, 3))).toBe(false);
	});

	it('should return false given a stack', () => {
		expect(List.isList(new Stack(1, 2, 3))).toBe(false);
	});
});

describe('List.of()', () => {
	it('should return a non-empty list given arguments', () => {
		expect(List.of(1, 2, 3)).toEqual(new List(1, 2, 3));
	});

	it('should return an empty list given no arguments', () => {
		expect(List.of()).toEqual(new List());
	});

	it('should return a list containing a single number given a single number', () => {
		expect(new List(7)).toHaveLength(7);
		expect(new List(7)).not.toContain(7);
		expect(List.of(7)).toHaveLength(1);
		expect(List.of(7)).toContain(7);
	});
});
