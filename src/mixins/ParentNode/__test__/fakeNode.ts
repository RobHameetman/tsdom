import { faker } from '@faker-js/faker';
import { DomNodeType, type DomNodeTypes } from '#nodes/enums/DomNodeType';
import { randomDomNodeType } from '#nodes/enums/DomNodeType/__test__';
import { fakeNodeList } from '#nodes/functions/isNodeList/__test__';
import { fakeEventTarget } from '#public/EventTarget/__test__';

const xml = () =>
	new DOMParser().parseFromString('<xml></xml>', 'application/xml');

export const fakeNode = ({
	ssr = typeof window === 'undefined',
	baseURI = ssr ? faker.internet.url() : window.location.href,
	childNodes = [],
	data = undefined,
	firstChild = null,
	isConnected = faker.datatype.boolean(),
	lastChild = null,
	name = 'role',
	nextSibling = null,
	namespaceURI = null as string | null,
	options = undefined,
	parentElement = null,
	parentNode = null,
	previousSibling = null,
	tag = 'div',
	textContent = null,
	type = randomDomNodeType(),
	value = 'button',
	...overrideProps
}: Record<string, unknown> = {}) => {
	let node = {} as object;

	if (!ssr) {
		const factories = {
			ELEMENT_NODE: () =>
				namespaceURI
					? document.createElement(
							tag as string,
							options as ElementCreationOptions,
					  )
					: document.createElementNS(
							namespaceURI as string,
							tag as string,
							options as ElementCreationOptions,
					  ),
			ATTRIBUTE_NODE: () =>
				namespaceURI
					? document.createAttribute(name as string)
					: document.createAttributeNS(namespaceURI as string, name as string),
			TEXT_NODE: () =>
				document.createTextNode((data as string) || faker.lorem.words()),
			CDATA_SECTION_NODE: () =>
				xml().createCDATASection(
					data ? (data as string).replace(']]', '') : '< > &',
				),
			PROCESSING_INSTRUCTION_NODE: () =>
				document.createComment((data as string) || 'target'),
			COMMENT_NODE: () =>
				document.createComment((data as string) || faker.lorem.words()),
			DOCUMENT_NODE: () => document,
			DOCUMENT_TYPE_NODE: () => document.doctype,
			DOCUMENT_FRAGMENT_NODE: () => document.createDocumentFragment(),
		};

		node = factories[type as keyof typeof factories]() as object;

		(childNodes as ReadonlyArray<Node>).forEach((childNode) =>
			(node as Node).appendChild(childNode),
		);
	} else {
		node = fakeEventTarget({
			ssr,
			baseURI,
			childNodes: fakeNodeList({ ssr, nodes: childNodes }),
			firstChild,
			isConnected,
			lastChild,
			nextSibling,
			nodeName: name,
			nodeType: DomNodeType[type as DomNodeTypes],
			ownerDocument: type === 'DOCUMENT_NODE' || ssr ? null : document,
			parentElement,
			parentNode,
			previousSibling,
			ELEMENT_NODE: DomNodeType.ELEMENT_NODE,
			ATTRIBUTE_NODE: DomNodeType.ATTRIBUTE_NODE,
			TEXT_NODE: DomNodeType.TEXT_NODE,
			CDATA_SECTION_NODE: DomNodeType.CDATA_SECTION_NODE,
			ENTITY_REFERENCE_NODE: DomNodeType.ENTITY_REFERENCE_NODE,
			ENTITY_NODE: DomNodeType.ENTITY_NODE,
			COMMENT_NODE: DomNodeType.COMMENT_NODE,
			DOCUMENT_NODE: DomNodeType.DOCUMENT_NODE,
			DOCUMENT_TYPE_NODE: DomNodeType.DOCUMENT_TYPE_NODE,
			DOCUMENT_FRAGMENT_NODE: DomNodeType.DOCUMENT_FRAGMENT_NODE,
			NOTATION_NODE: DomNodeType.NOTATION_NODE,
			DOCUMENT_POSITION_DISCONNECTED: 0x01,
			DOCUMENT_POSITION_PRECEDING: 0x02,
			DOCUMENT_POSITION_FOLLOWING: 0x04,
			DOCUMENT_POSITION_CONTAINS: 0x08,
			DOCUMENT_POSITION_CONTAINED_BY: 0x10,
			DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 0x20,
		});

		/**
		 * These properties are not provided to `fakeEventTarget()` because they
		 * are not `readonly`.
		 */
		Object.defineProperty(node, 'nodeValue', {
			writable: true,
			value,
		});

		Object.defineProperty(node, 'textContent', {
			writable: true,
			value: textContent,
		});
	}

	Object.defineProperty(node, 'appendChild', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.appendChild(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'cloneNode', {
		writable: false,
		value: !ssr
			? jest.fn((...args) => Node.prototype.cloneNode(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'compareDocumentPosition', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.compareDocumentPosition(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'contains', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.contains(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'getRootNode', {
		writable: false,
		value: !ssr
			? jest.fn((...args) => Node.prototype.getRootNode(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'hasChildNodes', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.hasChildNodes(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'insertBefore', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.insertBefore(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'isDefaultNamespace', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.isDefaultNamespace(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'isEqualNode', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.isEqualNode(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'isSameNode', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.isSameNode(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'lookupNamespaceURI', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.lookupNamespaceURI(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'lookupPrefix', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.lookupPrefix(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'normalize', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.normalize(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'removeChild', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.removeChild(...args))
			: jest.fn(),
	});

	Object.defineProperty(node, 'replaceChild', {
		writable: false,
		value: !ssr
			? /* @ts-expect-error - A spread argument must either have a tuple type or be passed to a rest parameter. */
			  jest.fn((...args) => Node.prototype.replaceChild(...args))
			: jest.fn(),
	});

	Object.entries(overrideProps).forEach(([key, value]) => {
		const prop = Object.getOwnPropertyDescriptor(node, key) || {
			writable: false,
		};

		Object.defineProperty(node, key, {
			...prop,
			value,
		});
	});

	return node as Node;
};
