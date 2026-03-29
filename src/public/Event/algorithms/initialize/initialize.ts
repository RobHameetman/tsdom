import { EventFlag, setFlagsOf, unsetFlagsOf } from '@/public/Event/associations/flags';
import { initializeTypeOf } from '@/public/Event/attributes/type';
import { setBubblabilityOf } from '@/public/Event/attributes/bubbles';
import { setCancelabilityOf } from '@/public/Event/attributes/cancelable';
import { initializeIsTrustedToFalse } from '@/public/Event/attributes/isTrusted';
import { initializeTargetToNullFor } from '@/public/Event/associations/target';

/**
 * @see https://dom.spec.whatwg.org/#concept-event-initialize
 */
export const initialize = (event: Event, type: string, bubbles: boolean, cancelable: boolean) => {
	setFlagsOf(event, EventFlag.Initialized);
	unsetFlagsOf(event, EventFlag.StopPropagation, EventFlag.StopImmediatePropagation, EventFlag.Canceled);

	initializeIsTrustedToFalse(event);
	initializeTargetToNullFor(event);

	initializeTypeOf(event, type);
	setBubblabilityOf(event, bubbles);
	setCancelabilityOf(event, cancelable);
};

export default initialize;
