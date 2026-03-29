import { parentOf, rootOf } from '@/tree/Tree/relationships/parents';
import { isDocument } from '@/public/Document';

export const inADocumentTree = (node: Node) => {
	return isDocument(rootOf(node));
};
