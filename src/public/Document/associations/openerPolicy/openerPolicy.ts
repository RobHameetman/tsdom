/**
 * @see https://html.spec.whatwg.org/multipage/browsers.html#cross-origin-opener-policy-value
 */
export type OpenerPolicyValue =  'unsafe-none' | 'same-origin' | 'same-origin-allow-popups' | 'same-origin-plus-COEP';

/**
 * @see https://html.spec.whatwg.org/multipage/browsers.html#cross-origin-opener-policy
 */
export interface OpenerPolicy {
	readonly reportingEndpoint: string | null;
	readonly reportOnlyReportingEndpoint: string | null;
	readonly reportOnlyValue: OpenerPolicyValue;
	readonly value: OpenerPolicyValue;
}

const openerPolicy = new WeakMap<Document, OpenerPolicy>();

export const openerPolicyOf = (document: Document) => {
	return openerPolicy.get(document);
};

export const disposeOpenerPolicyOf = (document: Document) => {
	openerPolicy.delete(document);
};

export const setOpenerPolicyOf = (document: Document, to: OpenerPolicy) => {
	openerPolicy.set(document, to);
};
