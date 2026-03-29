import { rootOf } from '@/tree/Tree/relationships/parents';
import { type Path, pathOf } from '@/public/Event/associations/path';

/**
 * @see https://dom.spec.whatwg.org/#concept-event-path-append
 */
export const appendToAnEventPath = (
	event: Event,
	invocationTarget: Path['invocationTarget'],
	shadowAdjustedTarget: Path['shadowAdjustedTarget'],
	relatedTarget: Path['relatedTarget'],
	touchTargets: Path['touchTargetList'],
	slotInClosedTree: Path['slotInClosedTree'],
) => {
	let invocationTargetInShadowTree = false;

	if (invocationTarget instanceof Node && rootOf(invocationTarget) instanceof ShadowRoot) {
		invocationTargetInShadowTree = true;
	}

	let rootOfClosedTree = false;

	if ((invocationTarget instanceof ShadowRoot) && invocationTarget.mode === 'closed') {
		rootOfClosedTree = true;
	}

	pathOf(event).append({
		invocationTarget,
		invocationTargetInShadowTree,
		shadowAdjustedTarget,
		relatedTarget,
		touchTargetList: touchTargets,
		slotInClosedTree,
		rootOfClosedTree,
	});
};

export default appendToAnEventPath;
