import OrderedSet from '#infra/OrderedSet';
import type { Slot } from '#tree/ShadowTree/relationships/slots';

/**
 * A set of mutation records that have not yet been delivered to mutation
 * observers.
 *
 * @see https://dom.spec.whatwg.org/#mutation-observer-list
 */
const __SIGNAL_SLOTS__ = new WeakMap<typeof globalThis, OrderedSet<Slot>>();

if (!__SIGNAL_SLOTS__.has(globalThis)) {
	__SIGNAL_SLOTS__.set(globalThis, new OrderedSet<Slot>());
}

export const signalSlots = () => {
	return __SIGNAL_SLOTS__.get(globalThis) as OrderedSet<Slot>;
};

export default signalSlots;
