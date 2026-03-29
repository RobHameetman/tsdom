import type { ActivationBehavior } from '@/public/EventTarget/associations/activationBehavior';

/**
 * Each {@link EventTarget} object that has {@link ActivationBehavior}, can
 * additionally have a {@link legacyPreActivationBehavior} algorithm. These
 * algorithms only exist for {@link HTMLCheckboxElement} and
 * {@link HTMLRadioElement} elements and are not to be used for anything else.
 *
 * @see https://dom.spec.whatwg.org/#eventtarget-legacy-pre-activation-behavior
 */
export type LegacyPreActivationBehavior = ActivationBehavior;

export const legacyPreActivationBehavior = new WeakMap<EventTarget, LegacyPreActivationBehavior>();

export const hasLegacyPreActivationBehavior = (target: EventTarget) => {
	return legacyPreActivationBehavior.has(target);
};

export const runLegacyPreActivationBehaviorOf = (target: EventTarget, event: Event) => {
	const behavior = legacyPreActivationBehavior.get(target);

	if (behavior) {
		behavior(event);
	}
};
