import HierarchyRequestError from '@/errors/HierarchyRequestError';
import NotFoundError from '@/errors/NotFoundError';
import Tree from '@/tree/Tree';
import { childrenOf } from '@/tree/Tree/relationships/children';
import { isParentOf } from '@/tree/Tree/relationships/parents';
import { isHostIncludingInclusiveAncestorOf } from '@/tree/Tree/relationships/hosts';

const isDocumentOrFragmentOrElement = (node: Node) =>
	node instanceof Document ||
	node instanceof DocumentFragment ||
	node instanceof Element;

const isFragmentOrDoctypeOrElement = (node: Node) =>
	node instanceof DocumentFragment ||
	node instanceof DocumentType ||
	node instanceof Element;

const isTextWithDocumentParent = (node: Node, parent: ParentNode) =>
	node instanceof Text && parent instanceof Document;

const isDoctypeWithoutDocumentParent = (node: Node, parent: ParentNode) =>
	node instanceof DocumentType && !(parent instanceof Document);

/**
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */
export const ensurePreinsertValidity = (node: Node, parent: ParentNode, child = null as ChildNode | null): void | never => {
	if (!isDocumentOrFragmentOrElement(parent)) {
		throw new HierarchyRequestError({}, 'ensurePreinsertValidity', 'The parent node type is valid for insertion.');
	}

	if (isHostIncludingInclusiveAncestorOf(parent, node)) {
		throw new HierarchyRequestError({}, 'ensurePreinsertValidity', 'The node is not allowed to be inserted here.');
	}

	if (child !== null && !isParentOf<Node, ParentNode>(child, parent)) {
		throw new NotFoundError({}, 'ensurePreinsertValidity', 'The child node is not a child of the parent node.');
	}

	if (!isFragmentOrDoctypeOrElement(node) || !(node instanceof CharacterData)) {
		throw new HierarchyRequestError({}, 'ensurePreinsertValidity', 'The node type is not valid for insertion.');
	}

	if (isTextWithDocumentParent(node, parent) || isDoctypeWithoutDocumentParent(node, parent)) {
		throw new HierarchyRequestError({}, 'ensurePreinsertValidity', 'The node is not allowed to be inserted here.');
	}

	const elementChildrenOfNode = childrenOf(node).filter((child) => child instanceof Element);
	const textChildrenOfNode = childrenOf(node).filter((child) => child instanceof Text);

	const parentHasAnElementChild = childrenOf(parent).some((child) => child instanceof Element);
	const parentHasADocTypeChild = childrenOf(parent).some((child) => child instanceof DocumentType);

	const childIsADocType = child instanceof DocumentType;
	const childPrecedesDocType = child !== null && Tree.of(child).follows(child, (followingNode) => followingNode instanceof DocumentType);
	const childIsFollowingElement = child !== null && Tree.of(child).precedes(child, (precedingNode) => precedingNode instanceof Element);

	if (parent instanceof Document) {
		switch(node.nodeType) {
			case Node.DOCUMENT_FRAGMENT_NODE:
				if (elementChildrenOfNode.length > 1 || textChildrenOfNode.length > 0) {
					throw new HierarchyRequestError({}, 'ensurePreinsertValidity', 'The node is not allowed to be inserted here.');
				} else if ((elementChildrenOfNode.length === 1 && parentHasAnElementChild) || childIsADocType || (child !== null && childPrecedesDocType)) {
					throw new HierarchyRequestError({}, 'ensurePreinsertValidity', 'The node is not allowed to be inserted here.');
				}

				break;
			case Node.ELEMENT_NODE:
				if (parentHasAnElementChild || childIsADocType || (child !== null && childPrecedesDocType)) {
					throw new HierarchyRequestError({}, 'ensurePreinsertValidity', 'The node is not allowed to be inserted here.');
				}

				break;
			case Node.DOCUMENT_TYPE_NODE:
				if (parentHasADocTypeChild || childIsFollowingElement || (child === null && parentHasAnElementChild))	{
					throw new HierarchyRequestError({}, 'ensurePreinsertValidity', 'The node is not allowed to be inserted here.');
				}

				break;
			default:
				break;
		}
	}
};

export default ensurePreinsertValidity;
