import { WhatToShow } from '#public/NodeFilter';

/**
 * @see https://dom.spec.whatwg.org/#concept-traversal-whattoshow
 */
const whatToShow = new WeakMap<NodeIterator, WhatToShow>();

export const disposeWhatToShowOf = (iterator: NodeIterator) => {
	whatToShow.delete(iterator);
};

export const setWhatToShowOf = (iterator: NodeIterator, value: WhatToShow) => {
	whatToShow.set(iterator, value);
};

export const whatToShowOf = (iterator: NodeIterator) => {
	return whatToShow.get(iterator) as WhatToShow;
};
