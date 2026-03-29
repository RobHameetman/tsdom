/**
 * @see https://html.spec.whatwg.org/multipage/forms.html#labeled-control
 */
const labelledControl = new WeakMap<HTMLLabelElement, HTMLElement>();

export const disposeLabelledControlOf = (label: HTMLLabelElement) => {
	labelledControl.delete(label);
};

export const labelledControlOf = (label: HTMLLabelElement) => {
	return labelledControl.get(label) || null;
};

export const setLabelledControlOf = (label: HTMLLabelElement, control: HTMLElement) => {
	labelledControl.set(label, control);
};
