import EventFlag, { isFlagSetFor, setFlagsOf } from '@/public/Event/associations/flags';
import { type Path, lastPathOf } from '@/public/Event/associations/path';
import { setTouchTargetListOf } from '@/public/Event/associations/touchTargetList';
import { setTargetOf } from '@/public/Event/associations/target';
import { setRelatedTargetOf } from '@/public/Event/associations/relatedTarget';
import { initializeCurrentTargetOf } from '@/public/Event/attributes/currentTarget';
import { setTypeOf } from '@/public/Event/attributes/type';
import innerInvoke from '@/public/EventTarget/algorithms/innerInvoke';
import { eventListenerListFor } from '@/public/EventTarget/associations/eventListenerList';

/**
 * @see https://dom.spec.whatwg.org/#concept-event-listener-invoke
 */
export const invoke = (
	struct: Path,
	event: Event,
	phase: 'capturing' | 'bubbling',
	legacyOutputDidListenersThrowFlag?: boolean,
) => {
	setTargetOf(event, lastPathOf(event, (path) => path.shadowAdjustedTarget !== null)?.shadowAdjustedTarget as EventTarget);

	setRelatedTargetOf(event, struct.relatedTarget as EventTarget);
	setTouchTargetListOf(event, struct.touchTargetList);

	if (isFlagSetFor(event, EventFlag.StopPropagation)) {
		return;
	}

	initializeCurrentTargetOf(event, struct.invocationTarget);

	const listeners = eventListenerListFor(event.currentTarget as EventTarget);
	let invocationTargetInShadowTree = struct.invocationTargetInShadowTree;

	let found = innerInvoke(event, listeners, phase, invocationTargetInShadowTree, legacyOutputDidListenersThrowFlag);

	if (!found && event.isTrusted) {
		let originalEventType = event.type;

		switch (event.type) {
			case 'animationend':
				setTypeOf(event, 'webkitAnimationEnd');
				break;
			case 'animationiteration':
				setTypeOf(event, 'webkitAnimationIteration');
				break;
			case 'animationstart':
				setTypeOf(event, 'webkitAnimationStart');
				break;
			case 'transitionend':
				setTypeOf(event, 'webkitTransitionEnd');
				break;
			default:
				break;
		}

		innerInvoke(event, listeners, phase, invocationTargetInShadowTree, legacyOutputDidListenersThrowFlag);
		setTypeOf(event, originalEventType);
	}
};

export default invoke;
