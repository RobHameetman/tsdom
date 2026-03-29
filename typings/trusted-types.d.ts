declare global {
	type CreateHTMLCallback = (input: DOMString, ...args: ReadonlyArray<unknown>) => DOMString | null;
	type CreateScriptCallback = (input: DOMString, ...args: ReadonlyArray<unknown>) => DOMString | null;
	type CreateScriptURLCallback = (input: DOMString, ...args: ReadonlyArray<unknown>) => USVString | null;

	type TrustedHTML = string & {
		toJSON(): string;
		toString(): string;
	};

	declare var TrustedHTML: {
		prototype: TrustedHTML;
		new (): TrustedHTML;
	};

	type TrustedScript = string & {
		toJSON(): string;
		toString(): string;
	};

	declare var TrustedScript: {
		prototype: TrustedScript;
		new (): TrustedScript;
	};

	type TrustedScriptURL = string & {
		toJSON(): string;
		toString(): string;
	};

	declare var TrustedScriptURL: {
		prototype: TrustedScriptURL;
		new (): TrustedScriptURL;
	};

	type TrustedType = TrustedHTML | TrustedScript | TrustedScriptURL;

	interface TrustedTypePolicyOptions {
		readonly createHTML?: CreateHTMLCallback;
		readonly createScript?: CreateScriptCallback;
		readonly createScriptURL?: CreateScriptURLCallback;
	}

	interface TrustedTypePolicy {
		readonly createHTML(input: DOMString, ...args: ReadonlyArray<unknown>): TrustedHTML;
		readonly createScript(input: DOMString, ...args: ReadonlyArray<unknown>): TrustedScript;
		readonly createScriptURL(input: DOMString, ...args: ReadonlyArray<unknown>): TrustedScriptURL;
	}

	declare var TrustedTypePolicy: {
		prototype: TrustedTypePolicy;
		new (): TrustedTypePolicy;
	};

	interface TrustedTypePolicyFactory {
		readonly defaultPolicy: TrustedTypePolicy | null;
		readonly emptyHTML: TrustedHTML;
		readonly emptyScript: TrustedScript;
		createPolicy(policyName: DOMString, policyOptions?: TrustedTypePolicyOptions): TrustedTypePolicy;
		getAttributeType(tagName: DOMString, attribute: DOMString, elementNs?: DOMString, attrNs?: DOMString): DOMString | null;
		getPropertyType(tagName: DOMString, property: DOMString, elementNs?: DOMString): DOMString | null;
		isHTML(value: unknown): value is TrustedHTML;
		isScript(value: unknown): value is TrustedScript;
		isScriptURL(value: unknown): value is TrustedScriptURL;
	}

	declare var TrustedTypePolicyFactory: {
		prototype: TrustedTypePolicyFactory;
		new (): TrustedTypePolicyFactory;
	};

	interface Window {
		readonly TrustedHTML: TrustedHTML;
		readonly TrustedScript: TrustedScript;
		readonly TrustedScriptURL: TrustedScriptURL;
		readonly TrustedTypePolicy: TrustedTypePolicy;
		readonly TrustedTypePolicyFactory: TrustedTypePolicyFactory;
		readonly trustedTypes: TrustedTypePolicyFactory;
	}
}
