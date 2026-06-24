import implOf from '#_internals/impl';
import filter from '#public/TreeWalker/algorithms/filter';
import traverseChildren from '#public/TreeWalker/algorithms/traverseChildren';
import traverseSiblings from '#public/TreeWalker/algorithms/traverseSiblings';
import { disposeFilterOf, filterOf, initializeFilterOf } from '#public/TreeWalker/associations/filter';
import { currentOf, disposeCurrentOf, setCurrentOf } from '#public/TreeWalker/associations/current';
import { disposeRootOf, isTreeWalkersRoot, rootOf } from '#public/TreeWalker/associations/root';
import { disposeWhatToShowOf, whatToShowOf } from '#public/TreeWalker/associations/whatToShow';

/**
 * The **`TreeWalker`** object represents the nodes of a document subtree and a
 * position within them. {@link TreeWalker} objects can be used to filter and
 * traverse node trees.
 */
export const TreeWalker = implOf<typeof global.TreeWalker>(
	function TreeWalker(this: TreeWalker) {
		return this;
	}, {
		onInit: (instance: TreeWalker) => {
			initializeFilterOf(instance, { acceptNode: () => NodeFilter.FILTER_ACCEPT });
		},
	},
);

/**
 * Checks that an `unknown` value is an {@link TreeWalker}.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `TreeWalker`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link TreeWalker}.
 */
export const isTreeWalker = (value: unknown): value is TreeWalker =>
	value instanceof TreeWalker;

Object.defineProperties(TreeWalker, {
	prototype: {
		value: Object.seal(Object.create(Object.prototype, {
			/**
			 * The **`TreeWalker.currentNode`** property represents the A {@link Node}.
			 *
			 * @see https://dom.spec.whatwg.org/#dom-treewalker-currentnode
			 * @see https://developer.mozilla.org/docs/Web/API/TreeWalker/currentNode
			 */
			currentNode: {
				get(this: TreeWalker) {
					return currentOf(this);
				},
				set(this: TreeWalker, value: Node) {
					setCurrentOf(this, value);
				},
				configurable: true,
				enumerable: true,
			},
			/**
			 * The **`TreeWalker.filter`** read-only property returns the
			 * {@link NodeFilter} associated with the {@link TreeWalker}.
			 *
			 * @see https://dom.spec.whatwg.org/#dom-treewalker-filter
			 * @see https://developer.mozilla.org/docs/Web/API/TreeWalker/filter
			 */
			filter: {
				get(this: TreeWalker) {
					return filterOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			/**
			 * The **`TreeWalker.root`** read-only property returns the root
			 * {@link Node} that the {@link TreeWalker} traverses.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/TreeWalker/root
			 * @see https://dom.spec.whatwg.org/#dom-treewalker-root
			 */
			root: {
				get(this: TreeWalker) {
					return rootOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-treewalker-whattoshow
			 */
			whatToShow: {
				get(this: TreeWalker) {
					return whatToShowOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-treewalker-firstchild
			 */
			firstChild: {
				value(this: TreeWalker) {
					return traverseChildren(this, 'first');
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-treewalker-lastchild
			 */
			lastChild: {
				value(this: TreeWalker) {
					return traverseChildren(this, 'last');
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-treewalker-nextnode
			 */
			nextNode: {
				value(this: TreeWalker) {
					let node = this.currentNode;
					let result = NodeFilter.FILTER_ACCEPT as number;

					while (true) {
						while (result !== NodeFilter.FILTER_REJECT && node.hasChildNodes()) {
							node = node.firstChild as ChildNode;
							result = filter(node, this);

							if (result === NodeFilter.FILTER_ACCEPT) {
								this.currentNode = node;

								return node;
							}
						}

						let sibling = null;
						let temporary = node as Node | null;

						while (temporary) {
							if (isTreeWalkersRoot(this, temporary)) {
								return null;
							}

							sibling = temporary.nextSibling;

							if (sibling) {
								node = sibling;

								break;
							}

							temporary = temporary.parentNode;
						}

						result = filter(node, this);

						if (result === NodeFilter.FILTER_ACCEPT) {
							this.currentNode = node;

							return node;
						}
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-treewalker-nextsibling
			 */
			nextSibling: {
				value(this: TreeWalker) {
					return traverseSiblings(this, 'next');
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			/**
			 * The **`TreeWalker.parentNode()`** method moves the current and returns
			 * the found node.
			 *
			 * @see https://dom.spec.whatwg.org/#dom-treewalker-parentnode
			 * @see https://developer.mozilla.org/docs/Web/API/TreeWalker/parentNode
			 */
			parentNode: {
				value(this: TreeWalker) {
					let node = this.currentNode;

					while (node && !isTreeWalkersRoot(this, node)) {
						node = node.parentNode as Node;

						if (node && filter(node, this) === NodeFilter.FILTER_ACCEPT) {
							this.currentNode = node;

							return node;
						}
					}

					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-treewalker-previousnode
			 */
			previousNode: {
				value(this: TreeWalker) {
					let node = this.currentNode;

					while (!isTreeWalkersRoot(this, node)) {
						let sibling = node.previousSibling;

						while (sibling) {
							node = sibling;

							let result = filter(node, this);

							while (result !== NodeFilter.FILTER_REJECT && node.hasChildNodes()) {
								node = node.lastChild as ChildNode;
								result = filter(node, this);
							}

							if (result === NodeFilter.FILTER_ACCEPT) {
								this.currentNode = node;

								return node;
							}

							sibling = node.previousSibling;
						}

						if (isTreeWalkersRoot(this, node) || !node.parentNode) {
							return null;
						}

						node = node.parentNode;

						if (filter(node, this) === NodeFilter.FILTER_ACCEPT) {
							this.currentNode = node;

							return node;
						}
					}

					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			/**
			 * @see https://dom.spec.whatwg.org/#dom-treewalker-previoussibling
			 */
			previousSibling: {
				value(this: TreeWalker) {
					return traverseSiblings(this, 'previous');
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: TreeWalker,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: TreeWalker) {
					disposeCurrentOf(this);
					disposeWhatToShowOf(this);
					disposeFilterOf(this);
					disposeRootOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'TreeWalker',
				configurable: true,
			},
		})),
	},
});

Object.seal(TreeWalker);

if (!globalThis.TreeWalker) {
	globalThis.TreeWalker = TreeWalker;
}

export default TreeWalker;
