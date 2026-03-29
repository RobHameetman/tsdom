export interface AllowListStruct {
	readonly expressions: OrderedSet<unknown>;
	readonly selfOrigin: string | null;
	readonly srcOrigin: string | null;
}

/**
 * @see https://w3c.github.io/webappsec-permissions-policy/#allowlist
 */
export type AllowList = '*' | AllowListStruct;

/**
 * @see https://w3c.github.io/webappsec-permissions-policy/#declared-policy
 */
export interface DeclaredPolicy {
	readonly declarations: Map<unknown, ReadonlyArray<unknown>>;
	readonly reportingConfiguration: Map<unknown, string>;
}

/**
 * @see https://w3c.github.io/webappsec-permissions-policy/#permissions-policy
 */
export interface PermissionsPolicy {
	readonly inheritedPolicy: Map<unknown, 'Enabled' | 'Disabled'>;
	readonly declaredPolicy: unknown;
}

const permissionsPolicy = new WeakMap<Document, PermissionsPolicy>();

export const permissionsPolicyOf = (document: Document) => {
	return permissionsPolicy.get(document);
};

export const disposePermissionsPolicyOf = (document: Document) => {
	permissionsPolicy.delete(document);
};

export const setPermissionsPolicyOf = (document: Document, to: PermissionsPolicy) => {
	permissionsPolicy.set(document, to);
};
