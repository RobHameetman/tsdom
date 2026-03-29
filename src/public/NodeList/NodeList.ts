export const NodeList = function(this: NodeList) {
	throw new TypeError('Failed to construct \'NodeList\': Illegal constructor');
} as unknown as typeof global.NodeList;

// export const NodeList = implOf<typeof global.NodeList>(
// 	function NodeList(this: NodeList) {
// 		// const instance = Array.apply(this);

// 		Object.setPrototypeOf(this, NodeList.prototype);

// 		return this;

// 		// return new Proxy(this, {
// 		// 	defineProperty(instance, key, descriptor) {
// 		// 		const index = Number(key);

// 		// 		if (mutable.has(instance)) {
// 		// 			return Reflect.defineProperty(instance, key, descriptor);
// 		// 		} else {
// 		// 			if (Number.isInteger(index) && index >= 0) {
// 		// 				throw new TypeError(`Failed to set an indexed property [${index}] on 'NodeList': Index property setter is not supported.`);
// 		// 			}
// 		// 		}

// 		// 		return true;
// 		// 	},
// 		// 	deleteProperty(instance, key) {
// 		// 		if (mutable.has(instance)) {
// 		// 			return Reflect.deleteProperty(instance, key);
// 		// 		}

// 		// 		return true;
// 		// 	},
// 		// 	set(instance, key, value) {
// 		// 		const index = Number(key);

// 		// 		if (mutable.has(instance) || !Number.isInteger(index) || index < 0) {
// 		// 			return Reflect.set(instance, key, value);
// 		// 		}

// 		// 		return true;
// 		// 	},
// 		// });
// 	}, {
// 		//
// 	},
// );

Object.defineProperties(NodeList, {
	prototype: {
		value: Object.seal(Object.create(Object.prototype, {
			length: {
				get() {
					let length = 0;

					while (length in this) {
						length += 1;
					}

					return length;
				},
				configurable: true,
				enumerable: true,
			},
			keys: {
				*value() {
					if (this.length > 0) {
						let index = 0;

						while (index in this) {
							yield index;

							index += 1;
						}
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			values: {
				*value() {
					for (const key of this.keys()) {
						yield this[key];
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			entries: {
				*value() {
					for (const key of this.keys()) {
						yield [key, this[key]] as const;
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			item: {
				value(index: number) {
					return this[index] || null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			forEach: {
				value(callback: (value: Node, key: number, parent: NodeList) => void, thisArg?: ThisType<unknown>) {
					for (const [key, value] of this.entries()) {
						callback.call(thisArg, value, key, this);
					}
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			[Symbol.iterator]: {
				value: function* () {
					yield* this.values();
				},
				configurable: true,
				writable: true,
			},
			constructor: {
				value: NodeList,
				configurable: true,
				writable: true,
			},
			[Symbol.dispose]: {
				value(this: NodeList) {
					let index = this.length - 1;

					while(index >= 0 && index in this) {
						delete this[index];
						index -= 1;
					}
				}
			},
			[Symbol.asyncDispose]: {
				async value(this: NodeList) {
					let index = this.length - 1;

					while(index >= 0 && index in this) {
						delete this[index];
						index -= 1;
					}
				}
			},
			[Symbol.toStringTag]: {
				value: 'NodeList',
				configurable: true,
			},
		})),
	},
});

Object.seal(NodeList);

if (!globalThis.NodeList) {
	globalThis.NodeList = NodeList;
}

/**
 * Checks that an `unknown` value is a {@link NodeList}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link NodeList} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link NodeList}.
 */
export const isNodeList = (value: unknown): value is NodeList =>
	typeof globalThis.NodeList !== 'undefined' &&
	value instanceof globalThis.NodeList;

export default NodeList;
