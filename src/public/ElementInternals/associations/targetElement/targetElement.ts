/**
 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#internals-target
 */
const targetElement = new WeakMap<ElementInternals, HTMLElement>();

export const disposeTargetElementOf = (internals: ElementInternals) => {
	targetElement.delete(internals);
};

export const targetElementOf = (internals: ElementInternals) => {
	return targetElement.get(internals) as HTMLElement;
};

export const setTargetElementOf = (internals: ElementInternals, element: HTMLElement) => {
	targetElement.set(internals, element);
};
