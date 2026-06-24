import type { ActivationBehavior } from '#public/EventTarget/associations/activationBehavior';

/**
 * Each {@link EventTarget} object that has {@link ActivationBehavior}, can
 * additionally have a {@link legacyCanceledActivationBehavior} algorithm. These
 * algorithms only exist for {@link HTMLCheckboxElement} and
 * {@link HTMLRadioElement} elements and are not to be used for anything else.
 *
 * @see https://dom.spec.whatwg.org/#eventtarget-legacy-canceled-activation-behavior
 */
export type LegacyCanceledActivationBehavior = ActivationBehavior;

const legacyCanceledActivationBehavior = new WeakMap<EventTarget, LegacyCanceledActivationBehavior>();

export const hasLegacyCanceledActivationBehavior = (target: EventTarget) => {
	return legacyCanceledActivationBehavior.has(target);
};

export const runLegacyCanceledActivationBehaviorOf = (target: EventTarget, event: Event) => {
	const behavior = legacyCanceledActivationBehavior.get(target);

	if (behavior) {
		behavior(event);
	}
};
