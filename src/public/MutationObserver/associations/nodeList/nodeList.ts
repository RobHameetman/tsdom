import List from '@/infra/List';

/**
 * @see https://dom.spec.whatwg.org/#mutationobserver-node-list
 */
const nodeList = new WeakMap<MutationObserver, List<WeakRef<Node>>>();

export const disposeNodeListFor = (observer: MutationObserver) => {
	nodeList.delete(observer);
};

export const nodeListOf = (observer: MutationObserver) => {
	if (!nodeList.has(observer)) {
		nodeList.set(observer, new List<WeakRef<Node>>());
	}

	return nodeList.get(observer) as List<WeakRef<Node>>;
};
