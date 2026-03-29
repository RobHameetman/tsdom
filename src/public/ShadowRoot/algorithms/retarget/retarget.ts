import type { PotentialEventTarget } from '@/public/EventTarget';
import { isShadowIncludingInclusiveAncestorOf } from '@/tree/ShadowTree/relationships/shadowRoots';

/**
 * The retargeting algorithm is used by event dispatch as well as other
 * specifications, such as Fullscreen.
 *
 * @see https://dom.spec.whatwg.org/#retarget
 */
const retarget = (target: PotentialEventTarget, against: EventTarget) => {
	if (!(target instanceof Node)) {
		return target;
	}

	const root = target.getRootNode();

	if (!(root instanceof ShadowRoot) || (against instanceof Node && isShadowIncludingInclusiveAncestorOf(root, against))) {
		return target;
	}

	return retarget(root.host, against);
};

export default retarget;
