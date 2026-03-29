import { WhatToShow } from '@/public/NodeFilter';

/**
 * @see https://dom.spec.whatwg.org/#concept-traversal-whattoshow
 */
const whatToShow = new WeakMap<TreeWalker, WhatToShow>();

export const disposeWhatToShowOf = (iterator: TreeWalker) => {
	whatToShow.delete(iterator);
};

export const setWhatToShowOf = (iterator: TreeWalker, value: WhatToShow) => {
	whatToShow.set(iterator, value);
};

export const whatToShowOf = (iterator: TreeWalker) => {
	return whatToShow.get(iterator) as WhatToShow;
};
