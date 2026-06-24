import extractErrorInformation from '#algorithms/extractErrorInformation';

/**
 * @TODO - These types will be moved eventually. This is gonna be a whole thing
 * so will come back to it later.
 */
interface AllScripts {
	readonly environmentSettingsObject: typeof globalThis;
	readonly record: object | null;
	readonly parseError: Error | null;
	readonly errorToRethrow: Error | null;
	readonly fetchOptions: object | null;
	readonly baseUrl: URL | null;
}

interface ScriptRecord {}
interface SourceTextModuleRecord {}
interface SyntheticModuleRecord {}
interface WebAssemblyModuleRecord {}

interface ClassicScript extends AllScripts {
	readonly record: ScriptRecord | null;
	readonly mutedErrors: boolean;
}

export const isClassicScript = (value: unknown): value is ClassicScript => {
	return true;
};

export interface JavaScriptModuleScript extends AllScripts {
	readonly record: SourceTextModuleRecord | null;
}

export interface CSSModuleScript extends AllScripts {
	readonly record: SyntheticModuleRecord | null;
}

export interface JSONModuleScript extends AllScripts {
	readonly record: SyntheticModuleRecord | null;
}

export interface WebAssemblyModuleScript extends AllScripts {
	readonly record: WebAssemblyModuleRecord | null;
}

export type ModuleScript = JavaScriptModuleScript | CSSModuleScript | JSONModuleScript | WebAssemblyModuleScript;
export type Script = ClassicScript | ModuleScript;

/**
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#report-an-exception
 *
 * @param global - The global object.
 * @param omitError - Whether to omit the error from the report.
 */
export const reportAnException = (exception: unknown, global: typeof globalThis, omitError = false) => {
	let notHandled = true;
	const errorInfo = extractErrorInformation(exception);

	/**
	 * @TODO eventually we'll need to get the relevant script from the call stack.
	 * From the spec: "This should usually be the running script (most notably during run a classic script)."
	 * @see https://html.spec.whatwg.org/multipage/webappapis.html#running-script
	 * @see https://html.spec.whatwg.org/multipage/webappapis.html#run-a-classic-script
	 */
	const script = null as Script | null;

	if (isClassicScript(script) && script.mutedErrors) {
		errorInfo.set('error', null);
		errorInfo.set('message', 'Script error.');
		errorInfo.set('filename', '');
		errorInfo.set('lineno', 0);
		errorInfo.set('colno', 0);
	}

	if (omitError) {
		errorInfo.set('error', null);
	}

	if (!isInErrorReportingMode(global)) {
		/**
		 * @TODO
		 */
	}

	if (notHandled) {
		errorInfo.set('error', null);

		if (global instanceof DedicatedWorkerGlobalScope) {
			/**
			 * @TODO
			 */
		} else {
			console.error(exception);
		}
	}
};

export default reportAnException;
