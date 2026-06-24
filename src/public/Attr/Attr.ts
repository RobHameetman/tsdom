// import implOf from '#_internals/impl';
import Node from '#public/Node';
import setAnExistingAttributeValue from '#public/Attr/algorithms/setAnExistingAttributeValue';
import { disposeElementOf, elementOf } from '#public/Attr/associations/element';
import { disposeLocalNameOf, localNameOf } from '#public/Attr/associations/localName';
import { disposeNamespaceOf, namespaceOf } from '#public/Attr/associations/namespace';
import { disposeNamespacePrefixOf, namespacePrefixOf } from '#public/Attr/associations/namespacePrefix';
import { disposeQualifiedNameOf, qualifiedNameOf } from '#public/Attr/associations/qualifiedName';
import { disposeValueOf, valueOf } from '#public/Attr/associations/value';

export const Attr = function(this: Attr) {
	throw new TypeError('Failed to construct \'Attr\': Illegal constructor');
} as unknown as typeof global.Attr;

// export const Attr = implOf<typeof global.Attr>(
// 	function Attr(this: Attr) {
// 		return Node.call(this);
// 	}, {
// 		onInit: (instance: Attr) => {
// 			// @TODO
// 		}
// 	},
// );

Object.defineProperties(Attr, {
	prototype: Object.seal(Object.create(Node.prototype, {
		/**
     * The read-only **`localName`** property of the {@link Attr} interface
		 * returns the _local part_ of the _qualified name_ of an attribute, that is
		 * the name of the attribute, stripped from any namespace in front of it.
     *
		 * @see https://dom.spec.whatwg.org/#dom-attr-localname
     * @see https://developer.mozilla.org/docs/Web/API/Attr/localName
     */
		localName: {
			get() {
				return localNameOf(this);
			},
			configurable: true,
			enumerable: true,
		},

		/**
     * The read-only **`name`** property of the {@link Attr} interface returns
		 * the _qualified name_ of an attribute, that is the name of the attribute,
		 * with the namespace prefix, if any, in front of it.
     *
		 * @see https://dom.spec.whatwg.org/#dom-attr-name
     * @see https://developer.mozilla.org/docs/Web/API/Attr/name
     */
		name: {
			get() {
				return qualifiedNameOf(this);
			},
			configurable: true,
			enumerable: true,
		},

		/**
     * The read-only **`namespaceURI`** property of the {@link Attr} interface
		 * returns the namespace URI of the attribute, or `null` if the element is
		 * not in a namespace.
     *
		 * @see https://dom.spec.whatwg.org/#dom-attr-namespaceuri
     * @see https://developer.mozilla.org/docs/Web/API/Attr/namespaceURI
     */
		namespaceURI: {
			get() {
				return namespaceOf(this);
			},
			configurable: true,
			enumerable: true,
		},

		/**
     * The read-only **`ownerElement`** property of the {@link Attr} interface
		 * returns the {@link Element} the attribute belongs to.
     *
		 * @see https://dom.spec.whatwg.org/#dom-attr-ownerelement
     * @see https://developer.mozilla.org/docs/Web/API/Attr/ownerElement
     */
		ownerElement: {
			get() {
				return elementOf(this);
			},
			configurable: true,
			enumerable: true,
		},

		/**
     * The read-only **`prefix`** property of the {@link Attr} returns the
		 * namespace prefix of the attribute, or `null` if no prefix is specified.
     *
		 * @see https://dom.spec.whatwg.org/#dom-attr-prefix
     * @see https://developer.mozilla.org/docs/Web/API/Attr/prefix
     */
		prefix: {
			get() {
				return namespacePrefixOf(this);
			},
			configurable: true,
			enumerable: true,
		},

		/**
     * @deprecated
     * The read-only **`specified`** property of the {@link Attr} interface
		 * always returns `true`.
     *
		 * @see https://dom.spec.whatwg.org/#dom-attr-specified
     * @see https://developer.mozilla.org/docs/Web/API/Attr/specified
     */
		specified: {
			get() {
				return true;
			},
			enumerable: true,
		},

		/**
     * The **`value`** property of the {@link Attr} interface contains the value
		 * of the attribute.
     *
		 * @see https://dom.spec.whatwg.org/#dom-attr-value
     * @see https://developer.mozilla.org/docs/Web/API/Attr/value
     */
		value: {
			get() {
				return valueOf(this);
			},
			set(value: string) {
				setAnExistingAttributeValue(this, value);
			},
			configurable: true,
			enumerable: true,
		},


		/**
		 * `lib.dom.d.ts` has this here which indicates an override but
		 * `Attr.prototype` does not actually have this in the browser or the spec.
		 */
		textContent: {
			get() {
				return this.value;
			},
			set(value: string) {
				this.value = value;
			},
			configurable: true,
			enumerable: true,
		},
		constructor: {
			value: Attr,
			configurable: true,
			writable: true,
		},
		[Symbol.dispose]: {
			value(this: Attr) {
				disposeElementOf(this);
				disposeLocalNameOf(this);
				disposeNamespaceOf(this);
				disposeNamespacePrefixOf(this);
				disposeQualifiedNameOf(this);
				disposeValueOf(this);

				if (Symbol.dispose in Node.prototype) {
					(Node.prototype[Symbol.dispose] as Disposal).call(this);
				}
			},
			configurable: true,
			writable: true,
		},
		[Symbol.asyncDispose]: {
			async value(this: Attr) {
				disposeElementOf(this);
				disposeLocalNameOf(this);
				disposeNamespaceOf(this);
				disposeNamespacePrefixOf(this);
				disposeQualifiedNameOf(this);
				disposeValueOf(this);

				if (Symbol.asyncDispose in Node.prototype) {
					await (Node.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
				}
			},
			configurable: true,
			writable: true,
		},
		[Symbol.toStringTag]: {
			value: 'Attr',
			configurable: true,
		},
	})),
});

if (!globalThis.Attr) {
	globalThis.Attr = Attr;
}

/**
 * Checks that an `unknown` value is an {@link Element}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Element}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Element}.
 */
export const isAttr = (value: unknown): value is Attr =>
	value instanceof Attr;

export default Attr;
