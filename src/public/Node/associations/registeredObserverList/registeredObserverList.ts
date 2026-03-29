import List from '@/infra/List';

/**
 * A {@link RegisteredObserver} consists of an observer (a
 * {@link MutationObserver} object) and options (a {@link MutationObserverInit}
 * dictionary).
 *
 * @see https://dom.spec.whatwg.org/#registered-observer
 */
export interface RegisteredObserver {
	readonly observer: MutationObserver;
	readonly options: MutationObserverInit;
}

/**
 * A {@link TransientRegisteredObserver} is a {@link RegisteredObserver} that
 * also consists of a source (a {@link RegisteredObserver}).
 * {@link TransientRegisteredObserver}s are used to track mutations within a
 * given {@link Node}'s descendants after `node` has been removed so they do not
 * get lost when `subtree` is set to `true` on {@link Node}'s `parent`.
 *
 * @see https://dom.spec.whatwg.org/#transient-registered-observer
 */
export interface TransientRegisteredObserver extends RegisteredObserver {
	readonly source: RegisteredObserver;
}

/**
 * Each {@link Node} has a registered observer list, which is initially empty.
 *
 * @see https://dom.spec.whatwg.org/#registered-observer-list
 */
export const registeredObserverList = new WeakMap<Node, List<RegisteredObserver | TransientRegisteredObserver>>();

export const disposeRegisteredObserverListFor = (node: Node) => {
	registeredObserverList.delete(node);
};

export const initializeRegisteredObserverListFor = (node: Node) => {
	if (!registeredObserverList.has(node)) {
		registeredObserverList.set(node, new List<RegisteredObserver | TransientRegisteredObserver>());
	}
};

export const registeredObserversOf = (node: Node) => {
	return registeredObserverList.get(node) || new List<RegisteredObserver | TransientRegisteredObserver>();
};
