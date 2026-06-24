import type { TrustedHTML } from '#_internals/types/TrustedHTML';
import type { DOMString } from '#webidl/DOMString';

/**
 * @see https://w3c.github.io/trusted-types/dist/spec/#trustedhtml-data
 */
export const data = new WeakMap<TrustedHTML, DOMString>();

export const dataOf = (trustedHTML: TrustedHTML) => {
	return data.get(trustedHTML) as DOMString;
};

export const setDataOf = (trustedHTML: TrustedHTML, value: DOMString): void => {
	data.set(trustedHTML, value);
};
