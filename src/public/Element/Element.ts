import Node from '#public/Node';
import ARIAMixin from '#mixins/ARIAMixin';
import ChildNode from '#mixins/ChildNode';
import NonDocumentTypeChildNode from '#mixins/NonDocumentTypeChildNode';
import ParentNode from '#mixins/ParentNode';
import Animatable from '#mixins/Animatable';
import Slottable from '#mixins/Slottable';
import NamedNodeMap from '#public/NamedNodeMap';
import { disposeShadowRootOf, shadowRootOf } from '#public/Element/associations/shadowRoot';

const withMixins = (prototype: HTMLElement) =>
	ARIAMixin(
		ChildNode(
			NonDocumentTypeChildNode(
				ParentNode(
					Animatable(
						Slottable(prototype),
					),
				),
			),
		),
	);

export const Element = function(this: Element) {
	throw new TypeError('Failed to construct \'Element\': Illegal constructor');
} as unknown as typeof global.Element;

// export const Element = implOf<typeof global.Element>(
// 	function Element<E extends Element = Element>(this: E) {
// 		ARIAMixin.call(this);
// 		ChildNode.call(this);
// 		NonDocumentTypeChildNode.call(this);
// 		ParentNode.call(this);
// 		Animatable.call(this);
// 		// Slottable.call(this);

// 		return this;
// 	}, {
// 		//
// 	},
// );

Object.defineProperties(Element, {
	prototype: {
		value: Object.seal(withMixins(Object.create(Node.prototype, {
			attributes: {
				get() {
					return new NamedNodeMap(this);
				},
				configurable: true,
				enumerable: true,
			},
			classList: {
				get(this: Element) {
					const classes = domTokenList();

					classes.add(...(this.attributes.getNamedItem('class')?.value.split(' ') || []));

					return classes;
				},
				set(this: Element, value: unknown) {
					if (value && typeof value === 'string') {
						this.className = value;
					}
				},
				configurable: true,
				enumerable: true,
			},
			className: {
				get(this: Element) {
					return this.attributes.getNamedItem('class')?.value || '';
				},
				set(this: Element, value: string) {
					const classAttr = document.createAttribute('class');

					classAttr.value = value;
					this.attributes.setNamedItem(classAttr);
				},
				configurable: true,
				enumerable: true,
			},
			clientHeight: {
				get(this: Element) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			clientLeft: {
				get(this: Element) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			clientTop: {
				get(this: Element) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			clientWidth: {
				get(this: Element) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			currentCSSZoom: {
				get(this: Element) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			id: {
				get(this: Element) {
					return this.getAttributeNS(null, 'id')?.value || '';
				},
				set(this: Element, value: string) {
					this.setAttributeNS(null, 'id', value);
				},
				configurable: true,
				enumerable: true,
			},
			innerHTML: {
				get(this: Element) {
					return '';
				},
				configurable: true,
				enumerable: true,
			},
			localName: {
				get(this: Element) {
					const { localName } = _state.get(this) as ElementInstanceState;

					return localName;
				},
				configurable: true,
				enumerable: true,
			},
			namespaceURI: {
				get(this: Element) {
					const { namespaceURI } = _state.get(this) as ElementInstanceState;

					return namespaceURI;
				},
				configurable: true,
				enumerable: true,
			},
			onfullscreenchange: {
				value: null,
				configurable: true,
				enumerable: true,
			},
			onfullscreenerror: {
				value: null,
				configurable: true,
				enumerable: true,
			},
			outerHTML: {
				get(this: Element) {
					const tag = this.tagName.toLowerCase();

					return `<${tag}>${this.innerHTML}</${tag}>`;
				},
				configurable: true,
				enumerable: true,
			},
			ownerDocument: {
				get(this: Element) {
					return null;
				},
				configurable: true,
				enumerable: true,
			},
			part: {
				get(this: Element) {
					const parts = domTokenList();

					parts.add(...(this.getAttributeNS(null, 'part')?.split(' ') || []));

					return parts;
				},
				set(this: Element, value: unknown) {
					if (value && typeof value === 'string') {
						this.setAttributeNS(null, 'part', value);
					}
				},
				configurable: true,
				enumerable: true,
			},
			prefix: {
				get(this: Element) {
					const { prefix } = _state.get(this) as ElementInstanceState;

					return prefix;
				},
				configurable: true,
				enumerable: true,
			},
			scrollHeight: {
				get(this: Element) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			scrollLeft: {
				get(this: Element) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			scrollTop: {
				get(this: Element) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			scrollWidth: {
				get(this: Element) {
					return 0;
				},
				configurable: true,
				enumerable: true,
			},
			shadowRoot: {
				get(this: Element) {
					const shadow = shadowRootOf(this);

					if (!shadow || shadow.mode === 'closed') {
						return null;
					}

					return shadow;
				},
				configurable: true,
				enumerable: true,
			},
			slot: {
				value: '',
				configurable: true,
				enumerable: true,
			},
			tagName: {
				get(this: Element) {
					return this.localName.toUpperCase();
				},
				configurable: true,
				enumerable: true,
			},
			textContent: {
				get(this: Element) {
					return this.nodeValue;
				},
				set(value: string | null) {
					this.nodeValue = value ?? '';
				},
				configurable: true,
				enumerable: true,
			},
			attachShadow: {
				value(this: Element, init: ShadowRootInit) {
					const { shadowRoot } = _state.get(this) as ElementInstanceState;

					const $shadowRoot = Object.create(ShadowRoot.prototype);

					ShadowRoot.call($shadowRoot, this, init, NODE_CONSTRUCTOR_KEY);

					return $shadowRoot;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			checkVisibility: {
				value(this: Element, _options?: CheckVisibilityOptions) {
					return true;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			closest: {
				value<E extends Element = Element>(this: E, _selector: string) {
					return null as E | null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			computedStyleMap: {
				value(this: Element) {
					return stylePropertyMapReadonly();
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getAttribute: {
				value(this: Element, qualifiedName: string) {
					const attr = this.attributes.getNamedItem(qualifiedName);

					return attr ? attr.value : null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getAttributeNS: {
				value(this: Element, namespace: string | null, localName: string) {
					const attr = this.attributes.getNamedItemNS(namespace, localName);

					return attr ? attr.value : null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getAttributeNames: {
				value(this: Element) {
					const names = [] as Array<string>;

					for (const attr of this.attributes) {
						names.push(attr.name);
					}

					return names;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getAttributeNode: {
				value(this: Element, qualifiedName: string) {
					return this.attributes.getNamedItem(qualifiedName);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getAttributeNodeNS: {
				value(this: Element, namespace: string | null, localName: string) {
					return this.attributes.getNamedItemNS(namespace, localName);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getBoundingClientRect: {
				value(this: Element) {
					return domRect();
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getClientRects: {
				value(this: Element) {
					return domRectList();
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getElementsByClassName: {
				value(this: Element, classNames: string) {
					const classList = classNames.split(' ').filter((name) => name.length > 0);
					const elements = [] as Array<Element>;

					for (const child of this.childNodes) {
						if ('classList' in child) {
							let hasAllClasses = true;

							for (const className of classList) {
								if (!(child as Element).classList.contains(className)) {
									hasAllClasses = false;
									break;
								}
							}

							if (hasAllClasses) {
								elements.push(child as Element);
							}
						}
					}

					return HTMLCollectionOf(...elements);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getElementsByTagName: {
				value(this: Element, tagName: string) {
					const elements = [] as Array<Element>;
					const tagNameUpper = tagName.toUpperCase();

					for (const child of this.childNodes) {
						if ('tagName' in child && child.tagName === tagNameUpper) {
							elements.push(child as Element);
						}
					}

					return HTMLCollectionOf(...elements);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getElementsByTagNameNS: {
				value(this: Element, namespace: string | null, localName: string) {
					const elements = [] as Array<Element>;

					for (const child of this.childNodes) {
						if ('localName' in child) {
							const namespaceMatches = (child as Element).namespaceURI === namespace;
							const localNameMatches = child.localName === localName;

							if (namespaceMatches && localNameMatches) {
								elements.push(child as Element);
							}
						}
					}

					return HTMLCollectionOf(...elements);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getHTML: {
				value(this: Element, _options?: GetHTMLOptions) {
					return this.outerHTML;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			hasAttribute: {
				value(this: Element, qualifiedName: string) {
					return this.attributes.getNamedItem(qualifiedName) !== null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			hasAttributeNS: {
				value(this: Element, namespace: string | null, localName: string) {
					return this.attributes.getNamedItemNS(namespace, localName) !== null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			hasAttributes: {
				value(this: Element) {
					return this.attributes.length > 0;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			hasPointerCapture: {
				value(this: Element, _pointerId: number) {
					return false;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			insertAdjacentElement: {
				value(this: Element, _position: InsertPosition, _element: Element) {
					return null as Element | null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			insertAdjacentHTML: {
				value(this: Element, _position: InsertPosition, _text: string) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			insertAdjacentText: {
				value(this: Element, _position: InsertPosition, _text: string) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			matches: {
				value(this: Element, _selectors: string) {
					return false;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			releasePointerCapture: {
				value(this: Element, _pointerId: number) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			removeAttribute: {
				value(this: Element, qualifiedName: string) {
					this.attributes.removeNamedItem(qualifiedName);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			removeAttributeNS: {
				value(this: Element, namespace: string | null, localName: string) {
					this.attributes.removeNamedItemNS(namespace, localName);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			removeAttributeNode: {
				value(this: Element, attr: Attr) {
					return this.attributes.removeNamedItem(attr.name);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			requestFullscreen: {
				value(this: Element, _options?: FullscreenOptions) {
					return Promise.resolve();
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			requestPointerLock: {
				value(this: Element, _options?: PointerLockOptions) {
					return Promise.resolve();
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			scroll: {
				value(this: Element, _options?: ScrollToOptions) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			scrollBy: {
				value(this: Element, _options?: ScrollToOptions) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			scrollIntoView: {
				value(this: Element, _arg?: boolean | ScrollIntoViewOptions) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			scrollTo: {
				value(this: Element, _options?: ScrollToOptions) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setAttribute: {
				value(this: Element, qualifiedName: string, value: string) {
					this.setAttributeNS(null, qualifiedName, value);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setAttributeNS: {
				value(this: Element, namespace: string | null, qualifiedName: string, value: string) {
					let attribute = this.attributes.getNamedItemNS(namespace, qualifiedName);

					if (!attribute) {
						attribute = this.ownerDocument.createAttributeNS(namespace, qualifiedName);

						this.attributes.setNamedItem(attribute);
					}

					attribute.value = value;

					this.attributes.setNamedItemNS(attribute);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setAttributeNode: {
				value(this: Element, attr: Attr) {
					return this.attributes.setNamedItem(attr);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setAttributeNodeNS: {
				value(this: Element, attr: Attr) {
					return this.attributes.setNamedItemNS(attr);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setHTMLUnsafe: {
				value(this: Element, _html: string) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setPointerCapture: {
				value(this: Element, _pointerId: number) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			toggleAttribute: {
				value(this: Element, qualifiedName: string, force?: boolean) {
					const hasAttr = this.hasAttribute(qualifiedName);

					if (force === true || (force === undefined && !hasAttr)) {
						this.setAttribute(qualifiedName, '');
						return true;
					} else {
						this.removeAttribute(qualifiedName);
						return false;
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			webkitMatchesSelector: {
				value(this: Element, selectors: string) {
					return this.matches(selectors);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: Element,
				writable: true,
				configurable: true,
			},
			[Symbol.dispose]: {
				value(this: Element) {
					disposeShadowRootOf(this);

					if (Symbol.dispose in Node.prototype) {
						(Node.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: Element) {
					disposeShadowRootOf(this);

					if (Symbol.asyncDispose in Node.prototype) {
						await (Node.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'Element',
				configurable: true,
			},
		}))),
	},
});

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
export const isElement = (value: unknown): value is Element =>
	typeof globalThis.Element !== 'undefined' &&
	value instanceof globalThis.Element;

export default Element;
