/**
 * Each {@link EventTarget} object also has an associated get the parent
 * algorithm. {@link Node}s, {@link ShadowRoot}s, and {@link Document}s override
 * the get the parent algorithm.
 *
 * @see https://dom.spec.whatwg.org/#get-the-parent
 *
 * @param event - An event being dispatched.
 *
 * @returns The parent {@link EventTarget} or `null`.
 */
export type GetTheParent = (event: Event) => EventTarget | null;

/**
 * Unless specified otherwise it returns `null`.
 * @returns `null`
 */
export const DEFAULT_GET_THE_PARENT: GetTheParent = () => null;

const getTheParent = new WeakMap<EventTarget, GetTheParent>();

export const invokeGetTheParentOf = (target: EventTarget, event: Event) => {
	return (getTheParent.get(target) || DEFAULT_GET_THE_PARENT)(event);
};

export const setGetTheParentOf = (target: EventTarget, algorithm: GetTheParent) => {
	getTheParent.set(target, algorithm);
};
