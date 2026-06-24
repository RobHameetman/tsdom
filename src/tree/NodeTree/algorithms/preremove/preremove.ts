import NotFoundError from '#errors/NotFoundError';
import remove from '#tree/NodeTree/algorithms/remove';

/**
 * @see https://dom.spec.whatwg.org/#concept-node-pre-remove
 */
export const preremove = (child: ChildNode, parent: ParentNode) => {
	if (child.parentNode !== parent) {
		throw new NotFoundError({}, 'preremove', 'The node to be removed is not a child of the specified parent.');
	}

	remove(child);

	return child;
};

export default preremove;
