import { DomNodeNamespace, isUndefined, noop } from '@com.robhameetman/utils';
import HTMLElement from '@/public/HTMLElement';
import HTMLHyperlinkElementUtils from '@/mixins/HTMLHyperlinkElementUtils';
import isFocused from '@/misc/isFocused';
import { setActivationBehaviorOf } from '@/public/EventTarget/associations/activationBehavior';

const _handleNavigation = ($this: HTMLAnchorElement) => {
	const { download, href } = $this;

	if (href && href.length > 0) {
		const url = new URL(href);

		if (url.protocol === 'mailto:') {
			/**
			 * @TODO - this can be a callback hook
			 */
			return;
		}

		if (url.protocol === 'tel:') {
			/**
			 * @TODO - this can be a callback hook
			 */
			return;
		}

		if (download) {
			/**
			 * @TODO - Initiate download for the resolved URL (bypassing normal
			 * navigation)
			 */
			return;
		} else {
			window.location.href = href;
			history.pushState(null, '', href);
		}
	}
};

const withMixins = (prototype: HTMLAnchorElement) =>
	HTMLHyperlinkElementUtils(prototype);

export const HTMLAnchorElement = function(this: HTMLAnchorElement) {
	throw new TypeError('Failed to construct \'HTMLAnchorElement\': Illegal constructor');

	setActivationBehaviorOf(this, (event: Event) => {
		if (!event.defaultPrevented) {
			(({
				auxclick: () => {
					const { href } = this;

					if (href) {
						/**
						 * @TODO Request opening the resolved URL in a new browsing
						 * context/tab/window (UA-level behavior; I could expose a hook like
						 * onNewContext(url))
						 */
					}
				},
				click: () => {
					_handleNavigation(this);
				},
				dragstart: () => {
					const { href } = this;

					if (href) {
						/**
						 * @TODO Start a drag operation whose drag data includes the link URL
						 * (and optionally the link text) so the link can be dropped elsewhere.
						 */
						// event.target?.dataTransfer?.setData('text/uri-list', href);
						// event.target?.dataTransfer?.setData('text/plain', href);
					}
				},
				keydown: () => {
					const { key } = event as KeyboardEvent;

					if (isFocused(this) && key === 'Enter') {
						this.click();
					}
				},
				keypress: () => {
					const { key } = event as KeyboardEvent;

					if (isFocused(this) && key === 'Enter') {
						this.click();
					}
				},
				/**
				 * @TODO Not sure if these two should call focus() or just set the active
				 * element.
				 */
				mousedown: () => {
					this.focus();
				},
				pointerdown: () => {
					this.focus();
				}
			})[event.type] || noop)();
		}
	});

	return this;
} as unknown as typeof global.HTMLAnchorElement;

Object.defineProperties(HTMLAnchorElement, {
	prototype: {
		value: Object.seal(withMixins(Object.create(HTMLElement.prototype, {
			charset: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'charset') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'charset', value);
				},
				configurable: true,
				enumerable: true,
			},
			coords: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'coords') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'coords', value);
				},
				configurable: true,
				enumerable: true,
			},
			download: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'download') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'download', value);
				},
				configurable: true,
				enumerable: true,
			},
			hreflang: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'hreflang') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'hreflang', value);
				},
				configurable: true,
				enumerable: true,
			},
			name: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'name') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'name', value);
				},
				configurable: true,
				enumerable: true,
			},
			ping: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'ping') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'ping', value);
				},
				configurable: true,
				enumerable: true,
			},
			referrerPolicy: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'referrerpolicy') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'referrerpolicy', value);
				},
				configurable: true,
				enumerable: true,
			},
			rel: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'rel') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'rel', value);
				},
				configurable: true,
				enumerable: true,
			},
			relList: {
				get(this: HTMLAnchorElement) {
					const rels = this.rel.split(' ').filter((rel) => rel.length > 0);
					const relList = domTokenList();

					relList.add(...rels);

					return relList;
				},
				set(this: HTMLAnchorElement, value: unknown) {
					if (value && typeof value === 'string') {
						this.rel = value;
					}
				},
				configurable: true,
				enumerable: true,
			},
			rev: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'rev') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'rev', value);
				},
				configurable: true,
				enumerable: true,
			},
			shape: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'shape') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'shape', value);
				},
				configurable: true,
				enumerable: true,
			},
			target: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'target') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'target', value);
				},
				configurable: true,
				enumerable: true,
			},
			text: {
				get(this: HTMLAnchorElement) {
					return this.children.item(0)?.textContent || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					const $text = this.ownerDocument.createTextNode(value);

					if (this.children.length > 0) {
						this.replaceChildren($text);
					} else {
						this.appendChild($text);
					}
				},
				configurable: true,
				enumerable: true,
			},
			type: {
				get(this: HTMLAnchorElement) {
					return this.getAttributeNS(null, 'type') || '';
				},
				set(this: HTMLAnchorElement, value: string) {
					this.setAttributeNS(null, 'type', value);
				},
				configurable: true,
				enumerable: true,
			},
			toString: {
				value(this: HTMLAnchorElement) {
					return this.href;
				},
				configurable: true,
				enumerable: true,
			},
			constructor: {
				value: HTMLAnchorElement,
				writable: true,
				configurable: true,
			},
			[Symbol.dispose]: {
				value(this: HTMLAnchorElement) {
					if (Symbol.dispose in HTMLElement.prototype) {
						(HTMLElement.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: HTMLAnchorElement) {
					if (Symbol.asyncDispose in HTMLElement.prototype) {
						await (HTMLElement.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'HTMLAnchorElement',
				configurable: true,
			}
		}))),
	},
});

Object.seal(HTMLAnchorElement);

if (!globalThis.HTMLAnchorElement) {
	globalThis.HTMLAnchorElement = HTMLAnchorElement;
}

/**
 * Checks that an `unknown` value is an {@link HTMLAnchorElement}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link HTMLAnchorElement} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link HTMLAnchorElement}.
 */
export const isHTMLAnchorElement = (value: unknown): value is HTMLAnchorElement =>
	typeof globalThis.HTMLAnchorElement !== 'undefined' &&
	value instanceof globalThis.HTMLAnchorElement;

export default isHTMLAnchorElement;
