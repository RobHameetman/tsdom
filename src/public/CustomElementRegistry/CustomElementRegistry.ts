import validCustomElementName from '@/algorithms/validCustomElementName';
import NotSupportedError from '@/errors/NotSupportedError';
import SyntaxError from '@/errors/SyntaxError';
import { customElementConstructorOf, customElementDefinitionSetHasConstructor, customElementDefinitionSetHasName, customElementDefinitionSetOf, customElementNameOf, disposeCustomElementDefinitionSetOf } from '@/public/CustomElementRegistry/associations/customElementDefinitionSet';
import { disposeElementDefinitionIsRunningOf, elementDefinitionIsRunningOf, setElementDefinitionIsRunningOf } from '@/public/CustomElementRegistry/associations/elementDefinitionIsRunning';
import { disposeIsScopedOf, isScopedOf, setIsScopedOf } from '@/public/CustomElementRegistry/associations/isScoped';
import { disposeScopedDocumentSetOf } from '@/public/CustomElementRegistry/associations/scopedDocumentSet';
import { disposeWhenDefinedPromiseMapOf } from '@/public/CustomElementRegistry/associations/whenDefinedPromiseMap';

/**
 * Stores a list of states for an autonomous custom element, and allows states
 * to be added and removed from the set. The interface can be used to expose the
 * internal states of a custom element, allowing them to be used in CSS
 * selectors by code that uses the element (e.g. :state(checked)).
 *
 * Each value is a custom identifier. Identifiers can be added to the set or
 * deleted. If an identifier is present in the set the particular state is `true`,
 * while if it is removed the state is `false`.
 *
 * @returns A {@link CustomElementRegistry}.
 */
export const CustomElementRegistry = function(this: CustomElementRegistry) {
	// throw new TypeError('Failed to construct \'CustomElementRegistry\': Illegal constructor');
	setIsScopedOf(this, true);
} as unknown as typeof global.CustomElementRegistry;

Object.defineProperties(CustomElementRegistry, {
	prototype: {
		value: Object.seal(Object.create(Object.prototype, {
			define: {
				value(this: CustomElementRegistry, name: string, constructor: CustomElementConstructor, options = {} as ElementDefinitionOptions) {
					if (typeof constructor !== 'function') {
						throw new TypeError('Custom element constructor must be a function');
					}

					if (!validCustomElementName(name)) {
						throw new SyntaxError(this, 'define', `'${name}' is not a valid custom element name`);
					}

					if (customElementDefinitionSetHasName(this, name)) {
						throw new NotSupportedError(this, 'define', `A custom element with name '${name}' has already been defined`);
					}

					if (customElementDefinitionSetHasConstructor(this, constructor)) {
						throw new NotSupportedError(this, 'define', `The custom element constructor has already been defined`);
					}

					let localName = name;
					let { extends: _extends = null } = options;

					if (_extends !== null) {
						if (isScopedOf(this)) {
							throw new NotSupportedError(this, 'define', 'Customized built-in elements are not supported in scoped registries');
						}

						if (validCustomElementName(_extends)) {
							throw new NotSupportedError(this, 'define', 'Customized built-in elements are not supported');
						}

						/**
						 * If the element interface for extends and the HTML namespace is HTMLUnknownElement (e.g., if extends does not indicate an element definition in this specification), then throw a "NotSupportedError" DOMException.
						 */
						if (globalThis.HTMLElement?.prototype instanceof globalThis.HTMLUnknownElement) {
							throw new NotSupportedError(this, 'define', 'Customized built-in elements are not supported');
						}

						localName = _extends;
					}

					if (elementDefinitionIsRunningOf(this)) {
						throw new NotSupportedError(this, 'define', 'A custom element definition is already running');
					}

					setElementDefinitionIsRunningOf(this, true);

					let formAssociated = false;
					let disableInternals = false;
					let disableShadow = false;
					let observedAttributes = [];

					try {
						let prototype = Object.getPrototypeOf(constructor.prototype);

						if (!(prototype instanceof Object)) {
							throw new TypeError('Custom element prototype must be an object');
						}
					} catch (error) {
						//
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			get: {
				value(this: CustomElementRegistry, name: string) {
					if (customElementConstructorOf(this, name)) {
						return customElementConstructorOf(this, name);
					}

					return undefined;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getName: {
				value(this: CustomElementRegistry, constructor: CustomElementConstructor) {
					if (customElementNameOf(this, constructor)) {
						return customElementNameOf(this, constructor);
					}

					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			upgrade: {
				value(this: CustomElementRegistry, root: Node) {
					/**
					 * @TODO
					 */
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			whenDefined: {
				async value(this: CustomElementRegistry, name: string) {
					/**
					 * @TODO
					 */
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: CustomElementRegistry,
				writable: true,
				configurable: true,
			},
			[Symbol.dispose]: {
				value(this: CustomElementRegistry) {
					disposeCustomElementDefinitionSetOf(this);
					disposeElementDefinitionIsRunningOf(this);
					disposeIsScopedOf(this);
					disposeScopedDocumentSetOf(this);
					disposeWhenDefinedPromiseMapOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: CustomElementRegistry) {
					disposeCustomElementDefinitionSetOf(this);
					disposeElementDefinitionIsRunningOf(this);
					disposeIsScopedOf(this);
					disposeScopedDocumentSetOf(this);
					disposeWhenDefinedPromiseMapOf(this);
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'CustomElementRegistry',
				configurable: true,
			},
		})),
	},
});

Object.seal(CustomElementRegistry);

if (!globalThis.CustomElementRegistry) {
	globalThis.CustomElementRegistry = CustomElementRegistry;
}

/**
 * Checks that an `unknown` value is a {@link CustomElementRegistry}.
 *
 * Requirements:
 *   - `value` must be a valid instance of `CustomElementRegistry` or an object whose values are `Node`s.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link CustomElementRegistry}.
 */
export const isCustomElementRegistry = (value: unknown): value is CustomElementRegistry =>
	typeof globalThis.CustomElementRegistry !== 'undefined' &&
	value instanceof globalThis.CustomElementRegistry;

export default CustomElementRegistry;
