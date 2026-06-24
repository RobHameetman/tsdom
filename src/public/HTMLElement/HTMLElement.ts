import noop from '#_internals/utils/functions/noop';
import NotSupportedError from '#errors/NotSupportedError';
import ElementContentEditable from '#mixins/ElementContentEditable';
import ElementCSSInlineStyle from '#mixins/ElementCSSInlineStyle';
import HTMLOrSVGElement from '#mixins/HTMLOrSVGElement';
import GlobalEventHandlers from '#mixins/GlobalEventHandlers';
import Element from '#public/Element';

const _handleDefaultAction = ($this: HTMLAnchorElement, event: Event) => {
	if (!event.defaultPrevented) {
		(({
			blur: () => {
				/**
				 * @TODO Show element as not focused / remove it as the document’s active element
				 */
			},
			focus: () => {
				/**
				 * @TODO Show element as focused / make it the document’s active element
				 */
			},
		})[event.type] || noop)();
	}
};

const withMixins = (prototype: HTMLElement) =>
	HTMLOrSVGElement(
		GlobalEventHandlers(
			ElementContentEditable(
				ElementCSSInlineStyle(prototype),
			),
		),
	);

export const HTMLElement = function(this: HTMLElement) {
	throw new TypeError('Failed to construct \'HTMLElement\': Illegal constructor');
} as unknown as typeof global.HTMLElement;

// export const HTMLElement = implOf<typeof global.HTMLElement>(
// 	function HTMLElement<E extends HTMLElement = HTMLElement>(
// 		this: E,
// 		_namespace = null as string | null,
// 		_prefix = null as string | null,
// 		_localName = '',
// 		_options?: ElementCreationOptions,
// 		_key?: symbol,
// 	) {
// 		// if (_key !== HTML_ELEMENT_CONSTRUCTOR_KEY) {
// 		// 	throw new TypeError('Failed to construct \'Element\': Illegal constructor');
// 		// }

// 		// /* @ts-expect-error - Expected 1 arguments, but got 6. */
// 		// Element.call(this, _namespace, _prefix, _localName, _options, ELEMENT_CONSTRUCTOR_KEY);

// 		HTMLOrSVGElement.call(this);
// 		GlobalEventHandlers.call(this);
// 		ElementContentEditable.call(this);
// 		ElementCSSInlineStyle.call(this);

// 		// _state.set(this, {
// 		// 	custom: _localName.includes('-'),
// 		// 	internals: undefined,
// 		// });

// 		return this;
// 	}, {
// 		//
// 	},
// );

Object.defineProperties(HTMLElement, {
	prototype: {
		value: Object.seal(withMixins(Object.create(Element.prototype, {
			accessKey: {
				get(this: HTMLElement) {
					return this.getAttributeNS(null, 'accesskey') || '';
				},
				set(this: HTMLElement, value: string) {
					this.setAttributeNS(null, 'accesskey', value);
				},
				configurable: true,
				enumerable: true,
			},
			accessKeyLabel: {
				get(this: HTMLElement) {
					/**
					 * @TODO
					 */
					return this.accessKey;
				},
				configurable: true,
				enumerable: true,
			},
			autocapitalize: {
				get(this: HTMLElement) {
					return this.getAttributeNS(null, 'autocapitalize') || 'none';
				},
				set(this: HTMLElement, value: string) {
					this.setAttributeNS(null, 'autocapitalize', value);
				},
				configurable: true,
				enumerable: true,
			},
			autocorrect: {
				get(this: HTMLElement) {
					return this.getAttributeNS(null, 'autocorrect') === 'on';
				},
				set(this: HTMLElement, value: boolean) {
					this.setAttributeNS(null, 'autocorrect', value ? 'on' : 'off');
				},
				configurable: true,
				enumerable: true,
			},
			dir: {
				get(this: HTMLElement) {
					let dirValue = this.getAttributeNS(null, 'dir');

					if (dirValue !== null) {
						dirValue = dirValue.toLowerCase();

						if (['ltr', 'rtl', 'auto'].includes(dirValue)) {
							return dirValue;
						}
					}

					return '';
				},
				set(this: HTMLElement, value: string) {
					this.setAttributeNS(null, 'dir', value);
				},
				configurable: true,
				enumerable: true,
			},
			draggable: {
				get(this: HTMLElement) {
					const value = asciiLowercase(this.getAttributeNS(null, 'draggable') || '');

					if (value === 'true') {
						return true;
					} else if (value === 'false') {
						return false;
					}

					return this._localName === 'img' || (this._localName === 'a' && this.hasAttributeNS(null, 'href'));
				},
				set(this: HTMLElement, value: boolean) {
					this.setAttributeNS(null, 'draggable', String(value));
				},
				configurable: true,
				enumerable: true,
			},
			hidden: {
				get(this: HTMLElement) {
					return this.getAttributeNS(null, 'hidden') !== null;
				},
				set(this: HTMLElement, value: boolean) {
					this.setAttributeNS(null, 'hidden', String(value));
				},
				configurable: true,
				enumerable: true,
			},
			inert: {
				get(this: HTMLElement) {
					return this.getAttributeNS(null, 'inert') !== null;
				},
				set(this: HTMLElement, value: boolean) {
					this.setAttributeNS(null, 'inert', String(value));
				},
				configurable: true,
				enumerable: true,
			},
			innerText: {
				get(this: HTMLElement) {
					return '';
				},
				set(this: HTMLElement, _value: string) {
					// @TODO
				},
				configurable: true,
				enumerable: true,
			},
			lang: {
				get(this: HTMLElement) {
					return this.getAttributeNS(null, 'lang') || '';
				},
				set(this: HTMLElement, value: string) {
					this.setAttributeNS(null, 'lang', value);
				},
				configurable: true,
				enumerable: true,
			},
			offsetHeight: {
				get(this: HTMLElement) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			offsetLeft: {
				get(this: HTMLElement) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			offsetParent: {
				get(this: HTMLElement) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},
			offsetTop: {
				get(this: HTMLElement) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			offsetWidth: {
				get(this: HTMLElement) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			outerText: {
				get(this: HTMLElement) {
					return '';
				},
				set(this: HTMLElement, _value: string) {
					// @TODO
				},
				configurable: true,
				enumerable: true,
			},
			popover: {
				get(this: HTMLElement) {
					return this.getAttributeNS(null, 'popover') || null;
				},
				set(this: HTMLElement, value: string | null) {
					this.setAttributeNS(null, 'popover', String(value));
				},
				configurable: true,
				enumerable: true,
			},
			spellcheck: {
				get(this: HTMLElement) {
					const value = this.getAttributeNS(null, 'spellcheck');

					if (value === null) {
						return false;
					}

					return value === 'true';
				},
				set(this: HTMLElement, value: boolean) {
					this.setAttributeNS(null, 'spellcheck', String(value));
				},
				configurable: true,
				enumerable: true,
			},
			title: {
				get(this: HTMLElement) {
					return this.getAttributeNS(null, 'title') || '';
				},
				set(this: HTMLElement, value: string) {
					this.setAttributeNS(null, 'title', value);
				},
				configurable: true,
				enumerable: true,
			},
			translate: {
				get(this: HTMLElement) {
					const attribute = this.getAttributeNS(null, 'translate');
					const value = asciiLowercase(attribute || '');

					if (value === 'yes' || (attribute && value === '')) {
						return true;
					} else if (value === 'no') {
						return false;
					}

					if (this === this.ownerDocument.documentElement) {
						return true;
					}

					return this.parentElement && this.parentElement.translate;
				},
				set(this: HTMLElement, value: boolean) {
					this.setAttributeNS(null, 'translate', value ? 'yes' : 'no');
				},
				configurable: true,
				enumerable: true,
			},
			writingSuggestions: {
				get(this: HTMLElement) {
					return this.getAttributeNS(null, 'writingsuggestions') || 'true';
				},
				set(this: HTMLElement, value: string) {
					this.setAttributeNS(null, 'writingsuggestions', value);
				},
				configurable: true,
				enumerable: true,
			},
			attachInternals: {
				value(this: HTMLElement) {
					const state = _state.get(this) as HTMLElementInstanceState;

					if (state?.internals) {
						throw new NotSupportedError(
							'attachInternals',
							'HTMLElement',
							'ElementInternals for the specified element was already attached.',
						);
					}

					const internals = Object.create(ElementInternals.prototype);

					ElementInternals.call(internals);

					_state.set(this, {
						...state,
						internals,
					});

					return internals;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			click: {
				value(this: HTMLElement) {
					const event = Object.create(Event.prototype);

					Event.call(event, 'click', {
						bubbles: true,
						cancelable: true,
						composed: true,
					});

					this.dispatchEvent(event);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			hidePopover: {
				value(this: HTMLElement) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			showPopover: {
				value(this: HTMLElement) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			togglePopover: {
				value(this: HTMLElement, _options?: boolean) {
					return false;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: HTMLElement,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: HTMLElement) {
					if (Symbol.dispose in Element.prototype) {
						(Element.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: HTMLElement) {
					if (Symbol.asyncDispose in Element.prototype) {
						await (Element.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'HTMLElement',
				configurable: true,
			},
		}))),
	},
});

Object.seal(HTMLElement);

if (!globalThis.HTMLElement) {
	globalThis.HTMLElement = HTMLElement;
}

/**
 * Checks that an `unknown` value is an {@link Element}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Element} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Element}.
 */
export const isHTMLElement = (value: unknown): value is HTMLElement =>
	typeof globalThis.HTMLElement !== 'undefined' &&
	value instanceof globalThis.HTMLElement;

export default HTMLElement;
