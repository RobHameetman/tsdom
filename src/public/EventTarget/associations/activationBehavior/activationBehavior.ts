/**
 * Each {@link EventTarget} object can have an associated activation behavior
 * algorithm. {@link Node}s, This exists because user agents perform certain
 * actions for certain {@link EventTarget} objects, e.g., the
 * {@link HTMLAreaElement}, in response to synthetic {@link MouseEvent} events
 * whose `type` attribute is `click`. Web compatibility prevented it from being
 * removed and it is now the enshrined way of defining an activation of something.
 *
 * @see https://dom.spec.whatwg.org/#eventtarget-activation-behavior
 *
 * @param event - An event being dispatched.
 */
export type ActivationBehavior = (event: Event) => void;

const activationBehavior = new WeakMap<EventTarget, ActivationBehavior>();

export const hasActivationBehavior = (target: EventTarget) => {
	return activationBehavior.has(target);
};

export const runActivationBehaviorOf = (target: EventTarget, event: Event) => {
	const behavior = activationBehavior.get(target);

	if (behavior) {
		behavior(event);
	}
};

export const setActivationBehaviorOf = (target: EventTarget, behavior: ActivationBehavior) => {
	if (!hasActivationBehavior(target)) {
		activationBehavior.set(target, behavior);
	}
};
