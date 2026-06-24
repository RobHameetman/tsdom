// import implOf from '#_internals/impl';
import type { Tree } from '#tree/Tree';
import DomNodeType from '#enums/DomNodeType';
import HierarchyRequestError from '#errors/HierarchyRequestError';
import { isSlottable } from '#mixins/Slottable';
import NodeListOf from '#public/NodeList';
import EventTarget from '#public/EventTarget';
import { setGetTheParentOf } from '#public/EventTarget/associations/getTheParent';
import { documentTreeOf } from '#public/Document/associations/documentTree';
import { type NodeDocument, disposeNodeDocumentOf, initializeNodeDocumentOf, nodeDocumentOf } from '#public/Node/associations/nodeDocument';
import isConnected from '#public/ShadowRoot/algorithms/isConnected';
import { childrenOf, firstChildOf, hasChildren, lastChildOf } from '#tree/Tree/relationships';
import { nextSiblingOf, previousSiblingOf } from '#tree/Tree/relationships/siblings';
import { parentOf, rootOf } from '#tree/Tree/relationships/parents';
import { length } from '#tree/NodeTree/algorithms/length';
import { setValueOf } from '#public/Attr/associations/value';
import replaceData from '#public/CharacterData/algorithms/replaceData';
import { shadowIncludingRootOf } from '#tree/ShadowTree';
import equals from './algorithms/equals';
import { qualifiedNameOf } from '#public/Attr/associations/qualifiedName';

/**
 * The DOM **`Node`** interface is an abstract base class upon which many other
 * DOM API objects are based, thus letting those object types to be used
 * similarly and often interchangeably.
 * @public
 *
 * @see https://dom.spec.whatwg.org/#interface-node
 * @see https://developer.mozilla.org/docs/Web/API/Node
 */
export const Node = function(this: Node) {
	throw new TypeError('Failed to construct \'Node\': Illegal constructor');
} as unknown as typeof global.Node;

// export const Node = implOf<typeof global.Node>(
// 	function(this: Node) {
// 		return EventTarget.call(this);
// 	}, {
// 		onInit: (instance) => {
// 			initializeNodeDocumentOf(instance, document);

// 			setGetTheParentOf(instance, (_event: Event) => {
// 				if (isSlottable(instance) && instance.assignedSlot !== null) {
// 					return instance.assignedSlot as EventTarget;
// 				}

// 				return instance.parentNode as EventTarget;
// 			});

// 			return instance;
// 		},
// 	},
// );

Object.defineProperties(Node, {
	prototype: {
		value: Object.seal(Object.create(EventTarget.prototype, {
			baseURI: {
				get(this: Node) {
					/**
					 * @TODO - return this’s node document’s document base URL, serialized.
					 * @see https://html.spec.whatwg.org/multipage/urls-and-fetching.html#document-base-url
					 * @see https://url.spec.whatwg.org/#concept-url-serializer
					 */
					const { baseURI } = nodeDocumentOf(this) as NodeDocument;

					return baseURI;
				},
				configurable: true,
				enumerable: true,
			},
			childNodes: {
				get(this: Node) {
					const nodes = Object.create(NodeList.prototype) as NodeList;

					childrenOf(this).forEach((child, index) => {
						Object.defineProperty(nodes, index.toString(), {
							value: child,
							configurable: true,
							enumerable: true,
						});
					});

					return nodes;
				},
				configurable: true,
				enumerable: true,
			},
			firstChild: {
				get(this: Node) {
					return firstChildOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			isConnected: {
				/**
				 * Checks if the node is connected to the document.
				 *
				 * @see https://dom.spec.whatwg.org/#dom-node-isconnected
				 *
				 * @param this - The node to check.
				 *
				 * @returns A boolean which is `true` if the node is connected to the
				 * document, `false` otherwise.
				 */
				get(this: Node) {
					return isConnected(this);
				},
				configurable: true,
				enumerable: true,
			},
			lastChild: {
				get(this: Node) {
					return lastChildOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			nextSibling: {
				get(this: Node) {
					return nextSiblingOf(this);
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The read-only **`nodeName`** property of the {@link Node} interface
			 * returns the name of the current node as a string.
			 *
			 * @see https://developer.mozilla.org/docs/Web/API/Node/nodeName
			 */
			nodeName: {
				get(this: Node) {
					switch (this.nodeType) {
						case Node.ELEMENT_NODE:
							return (this as Element).tagName;
						case Node.ATTRIBUTE_NODE:
							return qualifiedNameOf(this as Attr);
						case Node.TEXT_NODE:
							return '#text';
						case Node.CDATA_SECTION_NODE:
							return '#cdata-section';
						case Node.PROCESSING_INSTRUCTION_NODE:
							return (this as ProcessingInstruction).target;
						case Node.COMMENT_NODE:
							return '#comment';
						case Node.DOCUMENT_NODE:
							return '#document';
						case Node.DOCUMENT_TYPE_NODE:
							return (this as DocumentType).name;
						case Node.DOCUMENT_FRAGMENT_NODE:
							return '#document-fragment';
					}
				},
				configurable: true,
				enumerable: true,
			},

			/**
			 * The read-only **`nodeType`** property of the {@link Node} interface is
			 * an integer that identifies what the node is.
			 *
			 * @see https://dom.spec.whatwg.org/#dom-node-nodetype
			 * @see https://developer.mozilla.org/docs/Web/API/Node/nodeType
			 */
			nodeType: {
				get(this: Node) {
					const Interface = Object.getPrototypeOf(this).constructor;

					return [
						'Element',
						'Attr',
						'Text',
						'CDATASection',
						'EntityReference',
						'Entity',
						'ProcessingInstruction',
						'Comment',
						'Document',
						'DocumentType',
						'DocumentFragment',
						'Notation',
					].findIndex((type) => Interface.name === type);
				},
				configurable: true,
				enumerable: true,
			},
			nodeValue: {
				get(this: Node) {
					switch (this.nodeType) {
						case DomNodeType.TEXT_NODE:
						case DomNodeType.COMMENT_NODE:
						case DomNodeType.CDATA_SECTION_NODE:
						case DomNodeType.PROCESSING_INSTRUCTION_NODE:
							return (this as CharacterData).data;
						case DomNodeType.ATTRIBUTE_NODE:
							return (this as Attr).value;
						default:
							return null;
					}
				},
				set(this: Node, value: string | null) {
					switch (this.nodeType) {
						case DomNodeType.TEXT_NODE:
						case DomNodeType.COMMENT_NODE:
						case DomNodeType.CDATA_SECTION_NODE:
						case DomNodeType.PROCESSING_INSTRUCTION_NODE:
							replaceData(this as CharacterData, 0, length(this), value ?? '');
							break;
						case DomNodeType.ATTRIBUTE_NODE:
							setValueOf(this as Attr, value ?? '');
							break;
						default:
							return null;
					}
				},
				configurable: true,
				enumerable: true,
			},
			ownerDocument: {
				get(this: Node) {
					return !(this instanceof Document)
						? nodeDocumentOf(this)
						: null;
				},
				configurable: true,
				enumerable: true,
			},
			parentElement: {
				get(this: Node) {
					if (this.parentNode === null || this.parentNode.nodeType !== DomNodeType.ELEMENT_NODE) {
						return null;
					}

					return this.parentNode as HTMLElement;
				},
				configurable: true,
				enumerable: true,
			},
			parentNode: {
				get(this: Node) {
					return parentOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			previousSibling: {
				get(this: Node) {
					return previousSiblingOf(this);
				},
				configurable: true,
				enumerable: true,
			},
			textContent: {
				get(this: Node) {
					return this.nodeValue;
				},
				set(this: Node, newValue: string | null) {
					this.nodeValue = newValue;
				},
				configurable: true,
				enumerable: true,
			},
			appendChild: {
				value<T extends Node>(this: Node, child: T) {
					if (this.ownerDocument !== null) {
						const documentTree = tree.get(this.ownerDocument);

						if (documentTree) {
							documentTree.append(this, child);
						}
					}

					return child;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			cloneNode: {
				value(this: Node, _subtree: boolean) {
					return { ...this };
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			compareDocumentPosition: {
				value(this: Node, other: Node) {
					if (this.ownerDocument !== null) {
						const documentTree = tree.get(this.ownerDocument);

						if (documentTree) {
							return documentTree.compareTreeOrder(this, other);
						}
					}

					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			contains: {
				value(this: Node, node: Node | null) {
					if (!node) {
						return false;
					}

					if (this.isSameNode(node)) {
						return true;
					}

					if (this.hasChildNodes()) {
						let childToCheck = this.childNodes.length - 1;

						while (childToCheck) {
							const child = this.childNodes.item(childToCheck);

							if (child === node || child.contains(node)) {
								return true;
							}

							childToCheck -= 1;
						}
					}

					return false;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getRootNode: {
				value(this: Node, options?: GetRootNodeOptions) {
					if (options && options.composed) {
						return shadowIncludingRootOf(this);
					}

					return rootOf(this);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			hasChildNodes: {
				value(this: Node) {
					return hasChildren(this);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			insertBefore: {
				value<T extends Node>(this: Node, node: T, child: Node | null) {
					if (this.ownerDocument !== null) {
						const documentTree = tree.get(this.ownerDocument);

						if (documentTree && child) {
							return documentTree.before(node, child);
						}
					}

					return node;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			isDefaultNamespace: {
				value(this: Node) {
					return true;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`isEqualNode()`** method of the {@link Node} interface tests
			 * whether two nodes are equal.
			 *
			 * @see https://dom.spec.whatwg.org/#dom-node-isequalnode
			 * @see https://developer.mozilla.org/docs/Web/API/Node/isEqualNode
			 */
			isEqualNode: {
				value(this: Node, otherNode: Node | null) {
					if (otherNode === null) {
						return false;
					} else if (this.isSameNode(otherNode)) {
						return true;
					}

					return equals(this, otherNode);
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},

			/**
			 * The **`isSameNode()`** method of the {@link Node} interface is a legacy
			 * alias the for the `===` strict equality operator.
			 *
			 * @see https://dom.spec.whatwg.org/#dom-node-issamenode
			 * @see https://developer.mozilla.org/docs/Web/API/Node/isSameNode
			 */
			isSameNode: {
				value(this: Node, otherNode: Node | null) {
					return this === otherNode;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			lookupNamespaceURI: {
				value(this: Node, _prefix: string | null) {
					return null;
				},
				enumerable: true,
			},
			lookupPrefix: {
				value(this: Node, _namespace: string | null) {
					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			normalize: {
				value(this: Node) {},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			removeChild: {
				value<T extends Node>(this: Node, child: T) {
					if (this.ownerDocument !== null) {
						const documentTree = tree.get(this.ownerDocument);

						if (documentTree) {
							return documentTree.remove(child);
						}
					}

					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			replaceChild: {
				value<T extends Node>(this: Node, node: Node, child: T) {
					if (!this.hasChildNodes()) {
						throw new HierarchyRequestError('replaceChild', 'Node', 'The node to be replaced is not a child of this node.');
					}

					if (this.ownerDocument !== null) {
						const documentTree = tree.get(this.ownerDocument);

						if (documentTree) {
							return documentTree.replace(node, child);
						}
					}

					return null;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: Node,
				writable: true,
				configurable: true,
			},
			[Symbol.dispose]: {
				value(this: Node) {
					disposeNodeDocumentOf(this);

					if (Symbol.dispose in EventTarget.prototype) {
						(EventTarget.prototype[Symbol.dispose] as Disposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.asyncDispose]: {
				async value(this: Node) {
					disposeNodeDocumentOf(this);

					if (Symbol.asyncDispose in EventTarget.prototype) {
						await (EventTarget.prototype[Symbol.asyncDispose] as AsyncDisposal).call(this);
					}
				},
				configurable: true,
				writable: true,
			},
			[Symbol.toStringTag]: {
				value: 'Node',
				configurable: true,
			},
			ELEMENT_NODE: {
				value: DomNodeType.ELEMENT_NODE,
				enumerable: true,
			},
			ATTRIBUTE_NODE: {
				value: DomNodeType.ATTRIBUTE_NODE,
				enumerable: true,
			},
			TEXT_NODE: {
				value: DomNodeType.TEXT_NODE,
				enumerable: true,
			},
			CDATA_SECTION_NODE: {
				value: DomNodeType.CDATA_SECTION_NODE,
				enumerable: true,
			},
			ENTITY_REFERENCE_NODE: {
				value: DomNodeType.ENTITY_REFERENCE_NODE,
				enumerable: true,
			},
			ENTITY_NODE: {
				value: DomNodeType.ENTITY_NODE,
				enumerable: true,
			},
			PROCESSING_INSTRUCTION_NODE: {
				value: DomNodeType.PROCESSING_INSTRUCTION_NODE,
				enumerable: true,
			},
			COMMENT_NODE: {
				value: DomNodeType.COMMENT_NODE,
				enumerable: true,
			},
			DOCUMENT_NODE: {
				value: DomNodeType.DOCUMENT_NODE,
				enumerable: true,
			},
			DOCUMENT_TYPE_NODE: {
				value: DomNodeType.DOCUMENT_TYPE_NODE,
				enumerable: true,
			},
			DOCUMENT_FRAGMENT_NODE: {
				value: DomNodeType.DOCUMENT_FRAGMENT_NODE,
				enumerable: true,
			},
			NOTATION_NODE: {
				value: DomNodeType.NOTATION_NODE,
				enumerable: true,
			},
			DOCUMENT_POSITION_DISCONNECTED: {
				value: 0x01,
				enumerable: true,
			},
			DOCUMENT_POSITION_PRECEDING: {
				value: 0x02,
				enumerable: true,
			},
			DOCUMENT_POSITION_FOLLOWING: {
				value: 0x04,
				enumerable: true,
			},
			DOCUMENT_POSITION_CONTAINS: {
				value: 0x08,
				enumerable: true,
			},
			DOCUMENT_POSITION_CONTAINED_BY: {
				value: 0x10,
				enumerable: true,
			},
			DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: {
				value: 0x20,
				enumerable: true,
			},
		})),
	},
	ELEMENT_NODE: {
		value: DomNodeType.ELEMENT_NODE,
		enumerable: true,
	},
	ATTRIBUTE_NODE: {
		value: DomNodeType.ATTRIBUTE_NODE,
		enumerable: true,
	},
	TEXT_NODE: {
		value: DomNodeType.TEXT_NODE,
		enumerable: true,
	},
	CDATA_SECTION_NODE: {
		value: DomNodeType.CDATA_SECTION_NODE,
		enumerable: true,
	},
	ENTITY_REFERENCE_NODE: {
		value: DomNodeType.ENTITY_REFERENCE_NODE,
		enumerable: true,
	},
	ENTITY_NODE: {
		value: DomNodeType.ENTITY_NODE,
		enumerable: true,
	},
	PROCESSING_INSTRUCTION_NODE: {
		value: DomNodeType.PROCESSING_INSTRUCTION_NODE,
		enumerable: true,
	},
	COMMENT_NODE: {
		value: DomNodeType.COMMENT_NODE,
		enumerable: true,
	},
	DOCUMENT_NODE: {
		value: DomNodeType.DOCUMENT_NODE,
		enumerable: true,
	},
	DOCUMENT_TYPE_NODE: {
		value: DomNodeType.DOCUMENT_TYPE_NODE,
		enumerable: true,
	},
	DOCUMENT_FRAGMENT_NODE: {
		value: DomNodeType.DOCUMENT_FRAGMENT_NODE,
		enumerable: true,
	},
	NOTATION_NODE: {
		value: DomNodeType.NOTATION_NODE,
		enumerable: true,
	},
	DOCUMENT_POSITION_DISCONNECTED: {
		value: 0x01,
		enumerable: true,
	},
	DOCUMENT_POSITION_PRECEDING: {
		value: 0x02,
		enumerable: true,
	},
	DOCUMENT_POSITION_FOLLOWING: {
		value: 0x04,
		enumerable: true,
	},
	DOCUMENT_POSITION_CONTAINS: {
		value: 0x08,
		enumerable: true,
	},
	DOCUMENT_POSITION_CONTAINED_BY: {
		value: 0x10,
		enumerable: true,
	},
	DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: {
		value: 0x20,
		enumerable: true,
	},
});

Object.seal(Node.prototype);

if (!globalThis.Node) {
	globalThis.Node = Node;
}

/**
 * Checks that an `unknown` value is a {@link Node}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Node} if the type is defined on the global object.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Node}.
 */
export const isNode = (value: unknown): value is Node =>
	typeof globalThis.Node !== 'undefined' &&
	value instanceof globalThis.Node;

export default Node;
