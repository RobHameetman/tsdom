import InvalidStateError from '#errors/InvalidStateError';
import { isActiveIsTrueFor, setIsActiveToTrueFor, setIsActiveToFalseFor } from '#public/NodeIterator/associations/isActive';
import { filterOf } from '#public/NodeIterator/associations/filter';

/**
 * Gets the root of a live {@link Range}.
 *
 * @see https://dom.spec.whatwg.org/#concept-node-filter
 *
 * @param range - A {@link Range} instance.
 *
 * @returns The root of the range's start node.
 */
export const filter = (node: Node, traverser: NodeIterator) => {
	if (isActiveIsTrueFor(traverser)) {
		throw new InvalidStateError(traverser, 'filter', 'The NodeIterator is active.');
	}

	const n = node.nodeType - 1;

	if ((traverser.whatToShow & (1 << n)) === 0) {
		return NodeFilter.FILTER_SKIP;
	}

	if (traverser.filter === null) {
		return NodeFilter.FILTER_ACCEPT;
	}

	setIsActiveToTrueFor(traverser);

	let result;

	try {
		result = filterOf(traverser)?.acceptNode.call(traverser.filter, node);
	} finally {
		setIsActiveToFalseFor(traverser);
	}

	return result;
};

export default filter;
