import { isNumber, isType, isUndefined } from '@com.robhameetman/utils';

export const NamedNodeMap = function(
	this: NamedNodeMap,
	...nodes: Array<Attr>
) {
	Object.setPrototypeOf(this, NamedNodeMap.prototype);

	return this;
};

NamedNodeMap.prototype = Object.create(Object.prototype, {
	getNamedItem: {
		value(this: NamedNodeMap, qualifiedName: string) {
			for (const attr of this) {
				if (attr.name === qualifiedName) {
					return attr;
				}
			}

			return null;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	getNamedItemNS: {
		value(this: NamedNodeMap, namespace: string | null, localName: string) {
			for (const attr of this) {
				if (attr.localName === localName && attr.namespaceURI === namespace) {
					return attr;
				}
			}

			return null;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	removeNamedItem: {
		value(this: NamedNodeMap, qualifiedName: string) {
			let attr: Attr | null = null;
			let index = 0;

			for (const key in this) {
				if (isNumber(key)) {
					attr = this.item(key) as Attr;
					const remove = attr.name === qualifiedName;

					if (remove || key !== index) {
						delete this[key];

						if (!remove && this.item(index)) {
							this[index] = attr;
						}
					}
				}

				index += 1;
			}

			return attr;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	removeNamedItemNS: {
		value(this: NamedNodeMap, namespace: string | null, localName: string) {
			let attr: Attr | null = null;
			let index = 0;

			for (const key in this) {
				if (isNumber(key)) {
					attr = this.item(key) as Attr;
					const remove = attr.localName === localName && attr.namespaceURI === namespace;

					if (remove || key !== index) {
						delete this[key];

						if (!remove && this.item(index)) {
							this[index] = attr;
						}
					}
				}

				index += 1;
			}

			return attr;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	setNamedItem: {
		value(this: NamedNodeMap, attr: Attr) {
			let existingAttr = this.getNamedItem(attr.name);
			let index = this.length;

			if (existingAttr) {
				for (const key in this) {
					if (isNumber(key) && this[key] === existingAttr) {
						index = key;
					}
				}
			}

			this[index] = attr;
			this[attr.name] = attr;

			return existingAttr;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	setNamedItemNS: {
		value(this: NamedNodeMap, attr: Attr) {
			let existingAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
			let index = this.length;

			if (existingAttr) {
				for (const key in this) {
					if (isNumber(key) && this[key] === existingAttr) {
						index = key;
					}
				}
			}

			this[index] = attr;
			this[attr.name] = attr;

			return existingAttr;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	item: {
		value(this: NamedNodeMap, index: number) {
			return this[index] || null;
		},
		configurable: true,
		enumerable: true,
		writable: true,
	},
	length: {
		get(this: NamedNodeMap) {
			return Object.keys(this).filter(isNumber).length;
		},
		configurable: true,
		enumerable: true,
	},
	[Symbol.iterator]: {
		value: function* (this: NamedNodeMap) {
			const keys = Object.keys(this)
				.filter(Number.isInteger)
				.map(Number)
				.sort((a, b) => a - b);

			for (const key of keys) {
				yield this[key];
			}
		},
		configurable: true,
		writable: true,
	},
	constructor: {
		value: NamedNodeMap,
		configurable: true,
		writable: true,
	},
	[Symbol.toStringTag]: {
		value: 'NamedNodeMap',
		configurable: true,
	},
});

/**
 * Checks that an `unknown` value is a {@link NodeList}.
 *
 * Requirements:
 *   - `value` must be a valid instance of `NodeList` or an object whose values are `Node`s.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link NodeList}.
 */
export const isNamedNodeMap = (value: unknown): value is NamedNodeMap =>
	/**
	 * value
	 */
	(!isUndefined(window) && value instanceof NamedNodeMap) ||
	isType<NamedNodeMap>('NamedNodeMap', value);

export default NamedNodeMap;
