import isObject from '#_internals/utils/functions/isObject';
import isUndefined from '#_internals/utils/functions/isUndefined';
import DomNodeType, { isDomNodeType } from '#enums/DomNodeType';
import Node from '#public/Node';

/**
 * @TODO - move this somewhere else
 *
 * @see https://dom.spec.whatwg.org/#convert-nodes-into-a-node
 *
 * @param nodes - An array of nodes or strings to convert.
 * @returns An array of converted nodes or text nodes.
 */
const convertNodesIntoNode = (
	nodes: ReadonlyArray<Node | string>,
	document: Document,
) => {
	/**
	 * 1. Replace each string of nodes with a new Text node whose data is the string and node document is document.
	 */
	const converted = nodes.map<Node | Text>((node) => {
		if (typeof node === 'string') {
			return document.createTextNode(node);
		}

		return node;
	});

	if (converted.length === 1) {
		return converted.at(0);
	}

	/**
	 * 3. Let fragment be a new DocumentFragment node whose node document is document.
	 */
	let fragment = document.createDocumentFragment();

	converted.forEach((node) => {
		fragment.appendChild(node);
	});

	return converted;
};

export const ParentNode = <T extends Node = Node>(prototype: T) =>
	Object.defineProperties(prototype, {
		childElementCount: {
			get(this: T & ParentNode) {
				return this.childNodes.length;
			},
			configurable: true,
			enumerable: true
		},
		children: {
			get(this: T & ParentNode) {
				return [] as unknown as HTMLCollection;
			},
			configurable: true,
			enumerable: true,
		},
		firstElementChild: {
			get(this: T & ParentNode) {
				return null as Element | null;
			},
			configurable: true,
			enumerable: true,
		},
		lastElementChild: {
			get(this: T & ParentNode) {
				return null as Element | null;
			},
			configurable: true,
			enumerable: true,
		},
		append: {
			value(this: T & ParentNode, ...nodes: ReadonlyArray<Node | string>) {
				const node = convertNodesIntoNode(nodes, this.ownerDocument as Document);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		prepend: {
			value(this: T & ParentNode, ..._nodes: ReadonlyArray<Node | string>) {
				/**
				 * @TODO
				 */
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		replaceChildren: {
			value(this: T & ParentNode, ..._nodes: ReadonlyArray<Node | string>) {
				/**
				 * @TODO
				 */
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
	}) as T & ParentNode;

/**
 * Checks that an `unknown` value is an {@link Node} node.
 *
 * Requirements:
 *   - `window` must be defined.
 *   - `value` must be an instance of `Node`.
 *
 * @param value - An `unknown` value.
 * @param type - [Optional] An `unknown` value.
 *
 * @returns The determination that `value` is or is not an {@link Node} node.
 */
export const isParentNode = <T extends ParentNode = ParentNode>(
	value: unknown,
	type?: DomNodeType,
): value is T =>
	/**
	 * value
	 */
	((!isUndefined(window) && value instanceof Node) ||
		(isObject(value) &&
			/**
			 * value.nodeType
			 */
			'nodeType' in value &&
			isDomNodeType(DomNodeType[value.nodeType as number]))) &&
			(type ? value.nodeType === type : true);

export default ParentNode;
