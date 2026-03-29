import OrderedSet from '@/infra/OrderedSet';

/**
 * A set of mutation records that have not yet been delivered to mutation
 * observers.
 *
 * @see https://dom.spec.whatwg.org/#mutation-observer-list
 */
export const __PENDING_MUTATION_OBSERVERS__ = new WeakMap<typeof globalThis, OrderedSet<MutationObserver>>();

if (!__PENDING_MUTATION_OBSERVERS__.has(globalThis)) {
	__PENDING_MUTATION_OBSERVERS__.set(globalThis, new OrderedSet<MutationObserver>());
}

export const pendingMutationObservers = () => {
	return __PENDING_MUTATION_OBSERVERS__.get(globalThis) as OrderedSet<MutationObserver>;
};

export default pendingMutationObservers;
