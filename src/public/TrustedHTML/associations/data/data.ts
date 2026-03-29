// import type { DOMString } from '@/_internals/webidl/DOMString';

/**
 * @see https://w3c.github.io/trusted-types/dist/spec/#trustedhtml-data
 */
export const data = new WeakMap<TrustedHTML, DOMString>();

export const dataOf = (trustedHTML: TrustedHTML) => {
	return data.get(trustedHTML) as DOMString;
};

export const initializeDataOf = (trustedHTML: TrustedHTML) => {
	if (!data.has(trustedHTML)) {
		setDataOf(trustedHTML, '');
	}
};

export const setDataOf = (trustedHTML: TrustedHTML, value: DOMString) => {
	data.set(trustedHTML, value);
};
