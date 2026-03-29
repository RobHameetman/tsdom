import { EventFlag, setFlagsOf, unsetFlagsOf } from '@/public/Event/associations/flags';
import { setBubblabilityOf } from '@/public/Event/attributes/bubbles';
import { setCancelabilityOf } from '@/public/Event/attributes/cancelable';
import { initializeTimeStampOf } from '@/public/Event/attributes/timeStamp';

const attributes = {
	bubbles: <E extends typeof global.Event = typeof global.Event>(event: InstanceType<E>, _: string, value: boolean) =>
		setBubblabilityOf(event, value),

	cancelable: <E extends typeof global.Event = typeof global.Event>(event: InstanceType<E>, _: string, value: boolean) =>
		setCancelabilityOf(event, value),

	composed: <E extends typeof global.Event = typeof global.Event>(event: InstanceType<E>, _: string, value: boolean) =>
		value
			? setFlagsOf(event, EventFlag.Composed)
			: unsetFlagsOf(event, EventFlag.Composed),

	default: <E extends typeof global.Event = typeof global.Event>(event: InstanceType<E>, member: string, value: unknown) => {
		event[member as keyof typeof event] = value as never;
	}
} as const;

/**
 * @see https://dom.spec.whatwg.org/#inner-event-creation-steps
 */
export const innerEventCreation = <E extends typeof global.Event = typeof global.Event>(
	eventInterface: E,
	realm = null as typeof globalThis | null,
	time: number,
	dictionary: EventInit
) => {
	const event = (realm ?? globalThis).Object.create(eventInterface.prototype) as InstanceType<E>;

	setFlagsOf(event, EventFlag.Initialized);
	initializeTimeStampOf(event, time - (realm ?? globalThis).performance.timeOrigin);

	for (const [member, value] of Object.entries(dictionary)) {
		if (member in event) {
			(attributes[member as keyof typeof attributes] || attributes.default)(event, member, value);
		}
	}

	/**
	 * This is about constructing the specific event type
	 * @see https://dom.spec.whatwg.org/#concept-event-constructor-ext
	 */
	eventInterface.call(event, '', dictionary);

	return event;
};

export default innerEventCreation;
