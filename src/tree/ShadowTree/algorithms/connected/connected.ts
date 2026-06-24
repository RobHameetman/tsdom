import { shadowIncludingRootOf } from '#tree/ShadowTree/relationships/shadowRoots';
import { isDocument } from '#public/Document';

export const connected = (node: Node) => {
	return isDocument(shadowIncludingRootOf(node));
};
