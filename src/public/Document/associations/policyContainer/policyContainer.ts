/**
 * @see https://w3c.github.io/webappsec-subresource-integrity/#source
 */
export type Source = 'inline';

/**
 * @see https://w3c.github.io/webappsec-subresource-integrity/#destination
 */
export type Destination = Extract<RequestDestination, 'script' | 'style'>;

/**
 * @see https://html.spec.whatwg.org/multipage/browsers.html#embedder-policy-value
 */
export type EmbedderPolicyValue = 'unsafe-none' | 'require-corp' | 'credentialless';

/**
 * @see https://html.spec.whatwg.org/multipage/browsers.html#embedder-policy
 */
export interface EmbedderPolicy {
	readonly reportingEndpoint: string;
	readonly reportOnlyReportingEndpoint: string;
	readonly reportOnlyValue: EmbedderPolicyValue;
	readonly value: EmbedderPolicyValue;
}

/**
 * @see https://w3c.github.io/webappsec-subresource-integrity/#integrity-policy
 */
export interface IntegrityPolicy {
	readonly sources: ReadonlyArray<Source>;
	readonly blockedDestinations: ReadonlyArray<Destination>;
	readonly endpoints: ReadonlyArray<string>;
}

/**
 * @see https://html.spec.whatwg.org/multipage/browsers.html#policy-container
 */
export interface PolicyContainer {
	readonly CSPList: ReadonlyArray<unknown>;
	readonly embedderPolicy: EmbedderPolicy;
	readonly referrerPolicy: ReferrerPolicy;
	readonly integrityPolicy: IntegrityPolicy;
	readonly reportOnlyIntegrityPolicy: IntegrityPolicy;
}

const policyContainer = new WeakMap<Document, PolicyContainer>();

export const policyContainerOf = (document: Document) => {
	return policyContainer.get(document);
};

export const disposePolicyContainerOf = (document: Document) => {
	policyContainer.delete(document);
};

export const setPolicyContainerOf = (document: Document, to: PolicyContainer) => {
	policyContainer.set(document, to);
};
