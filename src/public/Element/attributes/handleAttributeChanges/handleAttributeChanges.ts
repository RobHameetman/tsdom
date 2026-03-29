import enqueueACustomElementCallbackReaction from '@/public/CustomElementRegistry/algorithms/enqueueACustomElementCallbackReaction';
import queueAMutationRecord from '@/public/MutationRecord/algorithms/queueAMutationRecord';
import { runAttributeChangeStepsOf } from '@/public/Element/associations/attributeChangeSteps';

/**
 * @see https://dom.spec.whatwg.org/#handle-attribute-changes
 */
export const handleAttributeChanges = (attribute: Attr, element: Element, oldValue: string | null, newValue: string | null) => {
	queueAMutationRecord(
		'attributes',
		element,
		attribute.name,
		attribute.namespaceURI,
		oldValue,
		[],
		[],
		null,
		null,
	);

	if (custom(element)) {
		enqueueACustomElementCallbackReaction(element, 'attributeChangedCallback', [attribute.name, oldValue, newValue, attribute.namespaceURI]);
	}

	runAttributeChangeStepsOf(element, [
		element,
		attribute.localName,
		oldValue,
		newValue,
		attribute.namespaceURI,
	]);
};

export default handleAttributeChanges;
