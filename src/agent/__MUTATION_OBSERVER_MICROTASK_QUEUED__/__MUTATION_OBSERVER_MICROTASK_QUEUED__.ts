/**
 * A flag indicating whether a mutation observer microtask has been queued.
 *
 * @see https://dom.spec.whatwg.org/#mutation-observer-compound-microtask-queued-flag
 */
export const __MUTATION_OBSERVER_MICROTASK_QUEUED__ = new WeakMap<typeof globalThis, boolean>();

if (!__MUTATION_OBSERVER_MICROTASK_QUEUED__.has(globalThis)) {
	__MUTATION_OBSERVER_MICROTASK_QUEUED__.set(globalThis, false);
}

export const mutationObserverMicrotaskQueued = () => {
	return __MUTATION_OBSERVER_MICROTASK_QUEUED__.get(globalThis) as boolean;
};

export const setMutationObserverMicrotaskQueuedToFalse = () => {
	__MUTATION_OBSERVER_MICROTASK_QUEUED__.set(globalThis, false);
};

export const setMutationObserverMicrotaskQueuedToTrue = () => {
	__MUTATION_OBSERVER_MICROTASK_QUEUED__.set(globalThis, true);
};

export default mutationObserverMicrotaskQueued;
