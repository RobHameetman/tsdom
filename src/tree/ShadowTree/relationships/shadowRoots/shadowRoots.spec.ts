import { jest } from '@jest/globals';
import type { Tree } from '../../Tree';
import mockTree from '../../__test__/mockTree';
import roots, { addToRoots, rootsOf } from './roots';

// export const getSpy = () => {
// 	return jest.spyOn(WeakMap.prototype, 'get');
// };

// export const getMock = (value: object) => {
// 	WeakMap.prototype.get = jest.fn(() => value);
// };

describe('addToRoots()', () => {
	let tree: Tree | null = null;
	let otherTree: Tree | null = null;
	let uncachedTree: Tree | null = null;
	let createRoots: jest.Mock | null = null;
	let treeToUse: jest.Mock | null = null;
	let rootToAdd: object | null = null;
	let rootsToAdd: Array<object> | null = null;
	let firstRoot: object | null = null;
	let secondRoot: object | null = null;
	let thirdRoot: object | null = null;
	let fourthRoot: object | null = null;
	let rootInOtherTree: object | null = null;

	beforeAll(() => {
		tree = mockTree();
		otherTree = mockTree();
		uncachedTree = mockTree();

		roots.set(tree as Tree, []);
		roots.set(otherTree as Tree, []);

		treeToUse = jest.fn()
			.mockReturnValueOnce(tree as Tree)
			.mockReturnValueOnce(tree as Tree)
			.mockReturnValueOnce(tree as Tree)
			.mockReturnValueOnce(tree as Tree)
			.mockReturnValueOnce(tree as Tree)
			.mockReturnValueOnce(tree as Tree)
			.mockReturnValueOnce(otherTree as Tree)
			.mockReturnValue(tree as Tree);

		firstRoot = { id: 1 };
		secondRoot = { id: 2 };
		thirdRoot = { id: 3 };
		fourthRoot = { id: 4 };
		rootInOtherTree = { id: 'other' };

		createRoots = jest.fn()
			.mockReturnValueOnce([])
			.mockReturnValueOnce([firstRoot])
			.mockReturnValueOnce([secondRoot])
			.mockReturnValueOnce([thirdRoot, fourthRoot])
			.mockReturnValueOnce([fourthRoot])
			.mockReturnValueOnce([])
			.mockReturnValueOnce([rootInOtherTree])
			.mockReturnValueOnce([{ id: 5 }])
			.mockReturnValue([]);
	});

	beforeEach(() => {
		/* @ts-expect-error - 'createRoots' is possibly 'null'. */
		rootsToAdd = createRoots() as Array<object>;

		/* @ts-expect-error - 'treeToUse' is possibly 'null'. */
		const currentTree = treeToUse();

		if (rootsToAdd.length === 1) {
			addToRoots(currentTree as Tree, rootsToAdd[0]);
		} else {
			rootsToAdd.forEach((root) => {
				addToRoots(currentTree as Tree, root);
			});
		}
	});

	afterEach(() => {
		jest.clearAllMocks();

		rootToAdd = null;
		rootsToAdd = null;
	});

	afterAll(() => {
		createRoots = null;
		treeToUse = null;

		roots.delete(tree as Tree);
		roots.delete(otherTree as Tree);

		tree = null;
		otherTree = null;
		uncachedTree = null;

		firstRoot = null;
		secondRoot = null;
		thirdRoot = null;
		fourthRoot = null;
	});

	it('should be a void function', () => {
		expect(addToRoots({} as Tree, {})).not.toBeDefined();
	});

  it('should add a root to the tree when tree has no existing roots', () => {
		expect(roots.get(tree as Tree)).toHaveLength(1);
	});

  it('should add a root to the tree when tree has existing roots', () => {
		expect(roots.get(tree as Tree)).toHaveLength(2);
	});

  it('should add multiple roots when called sequentially', () => {
		expect(roots.get(tree as Tree)).toHaveLength(4);
	});

  it('should handle adding duplicate roots without duplication', () => {
		expect(roots.get(tree as Tree)).toHaveLength(4);
	});

  it('should maintain roots order when adding new roots', () => {
		expect(roots.get(tree as Tree)).toEqual([firstRoot, secondRoot, thirdRoot, fourthRoot]);
	});

  it('should update cached roots when switching between different trees', () => {
		expect(roots.get(otherTree as Tree)).toEqual([rootInOtherTree]);
	});

  it('should do nothing if the current tree does not have roots cached', () => {
		expect(roots.get(uncachedTree as Tree)).not.toBeDefined();
	});
});

describe('removeFromRoots()', () => {
	let root: object | null = null;

	beforeEach(() => {
		root = {};
	});

	afterEach(() => {
		root = null;
	});

  it.todo('should remove specified root from tree when root exists');
  it.todo('should not modify roots when removing non-existent root');
  it.todo('should handle removing the last root from tree');
  it.todo('should maintain order of remaining roots after removal');
  it.todo('should update cached roots when switching between different trees');
  it.todo('should not modify roots when current roots are undefined');
  it.todo('should remove all occurrences when duplicate roots exist');
  it.todo('should handle removing roots from empty tree without error');
  it.todo('should preserve roots immutability during removal operations');
  it.todo('should work correctly after multiple add/remove operations');
});

describe('rootsOf()', () => {
	let root: object | null = null;

	beforeEach(() => {
		root = {};
	});

	afterEach(() => {
		root = null;
	});

  it.todo('should return empty array when tree has no roots');
  it.todo('should return all roots when tree has multiple roots');
  it.todo('should return frozen roots array to prevent modification');
  it.todo('should update cached roots when switching between different trees');
  it.todo('should maintain cache consistency across multiple calls');
  it.todo('should return correct roots after add/remove operations');
  it.todo('should handle concurrent access to multiple trees');
  it.todo('should return roots with correct type parameter');
  it.todo('should not share roots arrays between different tree instances');
  it.todo('should reset cache when tree parameter changes');
});

describe('setRootsOf()', () => {
	let root: object | null = null;

	beforeEach(() => {
		root = {};
	});

	afterEach(() => {
		root = null;
	});

  it.todo('should set roots to empty array when no roots provided');
  it.todo('should set roots to provided array of objects');
  it.todo('should freeze the roots array to prevent modification');
  it.todo('should replace existing roots with new roots');
  it.todo('should update cached roots when switching between different trees');
  it.todo('should handle setting roots after previous operations');
  it.todo('should maintain roots order as provided in parameters');
  it.todo('should work with roots of different object types');
  it.todo('should clear previous roots when setting new ones');
  it.todo('should update WeakMap with new roots reference');
});
