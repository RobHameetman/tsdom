// import type { USVString } from '#_internals/webidl/USVString';

/**
 * @see https://w3c.github.io/trusted-types/dist/spec/#trustedscripturl-data
 */
export const data = new WeakMap<TrustedScriptURL, USVString>();

export const dataOf = (trustedScriptURL: TrustedScriptURL) => {
	return data.get(trustedScriptURL) as USVString;
};

export const initializeDataOf = (trustedScriptURL: TrustedScriptURL) => {
	if (!data.has(trustedScriptURL)) {
		setDataOf(trustedScriptURL, '');
	}
};

export const setDataOf = (trustedScriptURL: TrustedScriptURL, value: USVString) => {
	data.set(trustedScriptURL, value);
};
