import type { OneOf } from '@com.robhameetman/utils';
import createAnEvent from '@/public/Event/algorithms/createAnEvent';
import Event from '@/public/Event';
import { setBubblabilityOf } from '@/public/Event/attributes/bubbles';
import { setCancelabilityOf } from '@/public/Event/attributes/cancelable';
// import { setTimeStampOf } from '@/public/Event/attributes/timeStamp';
import { initializeTypeOf } from '@/public/Event/attributes/type';
import dispatch from '@/public/EventTarget/algorithms/dispatch';

type IDLAttributeOf<E extends typeof global.Event = typeof global.Event> =
	InstanceType<E>[keyof InstanceType<E>];

type AttributeInitializationDescriptions<E extends typeof global.Event = typeof global.Event> =
	Partial<Record<keyof InstanceType<E>, IDLAttributeOf<E>>>;

type DefaultAttribute = keyof typeof defaultAttributeInitializationDescriptions;

const defaultAttributeInitializationDescriptions = {
	bubbles: <E extends typeof global.Event = typeof global.Event>(event: InstanceType<E>, value: IDLAttributeOf<E>) =>
		setBubblabilityOf(event, value as boolean),

	cancelable: <E extends typeof global.Event = typeof global.Event>(event: InstanceType<E>, value: IDLAttributeOf<E>) =>
		setCancelabilityOf(event, value as boolean),
} as const;

/**
 * @see https://dom.spec.whatwg.org/#concept-event-create
 */
export const fireAnEvent = <E extends typeof global.Event = typeof global.Event>(
	e: string,
	target: EventTarget,
	eventConstructor?: E,
	attributeInitializationDescriptions?: AttributeInitializationDescriptions<E>,
	legacyTargetOverrideFlag?: boolean,
) => {
	if (!eventConstructor) {
		eventConstructor = Event as E;
	}

	const event = createAnEvent(eventConstructor, globalThis);

	initializeTypeOf(event, e);

	if (attributeInitializationDescriptions) {
		for (const [attribute, value] of Object.entries(attributeInitializationDescriptions)) {
			if (attribute in defaultAttributeInitializationDescriptions) {
				defaultAttributeInitializationDescriptions[attribute as DefaultAttribute](event, value);
			} else {
				event[attribute as keyof InstanceType<E>] = value;
			}
		}
	}

	return dispatch(event, target, legacyTargetOverrideFlag);
};

export default fireAnEvent;
