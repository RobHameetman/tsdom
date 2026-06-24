import innerEventCreation from '#public/Event/algorithms/innerEventCreation';
import { initializeIsTrustedToTrue } from '#public/Event/attributes/isTrusted';

/**
 * @see https://dom.spec.whatwg.org/#concept-event-create
 */
export const createAnEvent = <E extends typeof global.Event = typeof global.Event>(
	eventInterface: E,
	realm = null as typeof globalThis | null,
) => {
	const dictionary = {
		bubbles: false,
		cancelable: false,
		composed: false,
	} as EventInit;

	const event = innerEventCreation(
		eventInterface,
		realm,
		(realm ?? globalThis).performance.now(),
		dictionary,
	);

	initializeIsTrustedToTrue(event);

	return event;
};

export default createAnEvent;
