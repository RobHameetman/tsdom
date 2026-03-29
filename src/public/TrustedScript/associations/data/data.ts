// import type { DOMString } from '@/_internals/webidl/DOMString';

/**
 * @see https://w3c.github.io/trusted-types/dist/spec/#trustedscript-data
 */
export const data = new WeakMap<TrustedScript, DOMString>();

export const dataOf = (trustedScript: TrustedScript) => {
	return data.get(trustedScript) as DOMString;
};

export const initializeDataOf = (trustedScript: TrustedScript) => {
	if (!data.has(trustedScript)) {
		setDataOf(trustedScript, '');
	}
};

export const setDataOf = (trustedScript: TrustedScript, value: DOMString) => {
	data.set(trustedScript, value);
};
