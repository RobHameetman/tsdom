import type List from '@/infra/List';
import reportAnException from '@/algorithms/reportAnException';
import { EventFlag, isFlagSetFor, setFlagsOf, unsetFlagsOf } from '@/public/Event/associations/flags';
import type { Listener } from '@/public/EventTarget/associations/eventListenerList';
import removeAnEventListener from '@/public/EventTarget/algorithms/removeAnEventListener';

/**
 * @see https://dom.spec.whatwg.org/#concept-event-listener-inner-invoke
 */
export const innerInvoke = (
	event: Event,
	listeners: List<Listener>,
	phase: 'capturing' | 'bubbling',
	invocationTargetInShadowTree: boolean,
	_legacyOutputDidListenersThrowFlag?: boolean,
) => {
	let found = false;

	for (const listener of listeners) {
		if (event.type !== listener.type) {
			continue;
		}

		found = true;

		if (phase === 'capturing' && !listener.capture) {
			continue;
		}

		if (phase === 'bubbling' && listener.capture) {
			continue;
		}

		if (listener.once) {
			removeAnEventListener(event.currentTarget as EventTarget, listener);
		}

		let global = globalThis;
		let currentEvent;

		if (global instanceof Window) {
			currentEvent = global.event;

			if (!invocationTargetInShadowTree) {
				global.event = event;
			}
		}


		if (listener.passive) {
			setFlagsOf(event, EventFlag.InPassiveListener);
		}

		if (global instanceof Window) {
			/**
			 * then record timing info for event listener given event and listener.
			 *
			 * @privateRemarks
			 * This would be a function recordTimingIInfoForEventListener
			 * @see https://w3c.github.io/long-animation-frames/#record-timing-info-for-event-listener
			 */
		}

		try {
      listener.callback?.handleEvent.call(event.currentTarget, event);
    } catch (e) {
			reportAnException(e, window);

			/**
			 * 2. Set legacyOutputDidListenersThrowFlag if given.
			 *
			 * NOTE: The legacyOutputDidListenersThrowFlag is only used by Indexed
			 * Database API.
			 *
			 * @privateRemarks
			 * Probably won't implement this
			 */
    }

		unsetFlagsOf(event, EventFlag.InPassiveListener);

		if (globalThis instanceof Window) {
			globalThis.event = currentEvent;
		}

		if (isFlagSetFor(event, EventFlag.StopImmediatePropagation)) {
			break;
		}
	}

	return found;
};

export default innerInvoke;
