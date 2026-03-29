import List from '@/infra/List';
import { rootOf } from '@/tree/Tree/relationships/roots';
import { isShadowIncludingInclusiveAncestorOf, shadowRootOf } from '@/tree/ShadowTree/relationships/shadowRoots';
import type { Slot } from '@/tree/ShadowTree/types/Slot';
import { EventFlag, setFlagsOf, isFlagSetFor, isFlagUnsetFor, unsetFlagsOf } from '@/public/Event/associations/flags';
import { type Path, pathOf, setPathToEmptyListFor } from '@/public/Event/associations/path';
import { relatedTargetOf, setRelatedTargetToNullFor } from '@/public/Event/associations/relatedTarget';
import { initializeTargetToNullFor } from '@/public/Event/associations/target';
import { setTouchTargetsToEmptyListFor, touchTargetListFor } from '@/public/Event/associations/touchTargetList';
import { setCurrentTargetToNullFor } from '@/public/Event/attributes/currentTarget';
import { setPhaseToAtTarget, setPhaseToBubbling, setPhaseToCapturing, setPhaseToNone } from '@/public/Event/attributes/eventPhase';
import type { PotentialEventTarget } from '@/public/EventTarget';
import appendToAnEventPath from '@/public/EventTarget/algorithms/appendToAnEventPath';
import invoke from '@/public/EventTarget/algorithms/invoke';
import { hasActivationBehavior, runActivationBehaviorOf } from '@/public/EventTarget/associations/activationBehavior';
import { hasLegacyCanceledActivationBehavior, runLegacyCanceledActivationBehaviorOf } from '@/public/EventTarget/associations/legacyCanceledActivationBehavior';
import { hasLegacyPreActivationBehavior, runLegacyPreActivationBehaviorOf } from '@/public/EventTarget/associations/legacyPreActivationBehavior';
import { invokeGetTheParentOf } from '@/public/EventTarget/associations/getTheParent';
import { isAssignedSlottable } from '@/mixins/Slottable';
import retarget from '@/public/ShadowRoot/algorithms/retarget';

/**
 * @see https://dom.spec.whatwg.org/#remove-all-event-listeners
 */
export const dispatch = (
	event: Event,
	target: EventTarget,
	legacyOverrideTargetFlag?: boolean,
	legacyOutputDidListenersThrowFlag?: boolean,
) => {
	setFlagsOf(event, EventFlag.Dispatch);

	const targetOverride = legacyOverrideTargetFlag === undefined
		? target
		: (target as Window).document;

	let activationTarget = null;
	let relatedTarget = retarget(relatedTargetOf(event), targetOverride);
	let clearTargets = false;

	if (target !== relatedTarget || target === relatedTargetOf(event)) {
		let touchTargets = new List<PotentialEventTarget>();

		touchTargetListFor(event).forEach((touchTarget: PotentialEventTarget) => {
			touchTargets.append(retarget(touchTarget, target));
		});

		appendToAnEventPath(
			event,
			target,
			targetOverride,
			relatedTarget,
			touchTargets,
			false,
		);

		let isActivationEvent = event instanceof MouseEvent && event.type === 'click';

		if (isActivationEvent && hasActivationBehavior(target)) {
			activationTarget = target;
		}

		let slottable = isAssignedSlottable(target) ? target : null;
		let slotInClosedTree = false;

		let parent = invokeGetTheParentOf(target, event);

		while (parent) {
			if (slottable) {
				slottable = null;

				if ((rootOf(parent) instanceof ShadowRoot) && (shadowRootOf(parent as Slot) as ShadowRoot).mode === 'closed') {
					slotInClosedTree = true;
				}
			}

			relatedTarget = retarget(relatedTarget, parent);
			touchTargets = new List<PotentialEventTarget>();

			touchTargetListFor(event).forEach((touchTarget: PotentialEventTarget) => {
				touchTargets.append(retarget(touchTarget, target));
			});

			if (parent instanceof Window || (parent instanceof Node && isShadowIncludingInclusiveAncestorOf(parent, rootOf(target as Node)))) {
				if (isActivationEvent && event.bubbles && activationTarget === null && hasActivationBehavior(parent)) {
					activationTarget = parent;

					appendToAnEventPath(
						event,
						parent,
						null,
						relatedTarget,
						touchTargets,
						slotInClosedTree,
					);
				} else if (parent === relatedTarget) {
					parent = null;
				} else {
					target = parent;

					if (isActivationEvent && activationTarget === null && hasActivationBehavior(target)) {
						activationTarget = target;
					}

					appendToAnEventPath(
						event,
						parent,
						target,
						relatedTarget,
						touchTargets,
						slotInClosedTree,
					);
				}

				if (parent) {
					parent = invokeGetTheParentOf(parent, event);
				}

				slotInClosedTree = false;
			}
		}

		let clearTargetStruct = pathOf(event).find(
			(pathStruct) => pathStruct.shadowAdjustedTarget !== null,
		) as Path;

		if ([
			clearTargetStruct.shadowAdjustedTarget,
			clearTargetStruct.relatedTarget,
			...clearTargetStruct.touchTargetList,
		].some((eventTarget) => eventTarget instanceof Node && rootOf(eventTarget) instanceof ShadowRoot)) {
			clearTargets = true;
		}

		if (activationTarget && hasLegacyPreActivationBehavior(activationTarget)) {
			runLegacyPreActivationBehaviorOf(activationTarget, event);
		}

		pathOf(event).toReversed().forEach((struct) => {
			if (struct.shadowAdjustedTarget) {
				setPhaseToCapturing(event)
			} else {
				setPhaseToAtTarget(event);
			}

			invoke(struct, event, 'capturing', legacyOutputDidListenersThrowFlag);
		});

		pathOf(event).forEach((struct) => {
			if (struct.shadowAdjustedTarget) {
				setPhaseToAtTarget(event);
			} else {
				if (!event.bubbles) {
					return;
				}

				setPhaseToBubbling(event);
			}

			invoke(struct, event, 'bubbling', legacyOutputDidListenersThrowFlag);
		});
	}

	setPhaseToNone(event);
	setCurrentTargetToNullFor(event);
	setPathToEmptyListFor(event);
	unsetFlagsOf(event,EventFlag.Dispatch, EventFlag.StopPropagation, EventFlag.StopImmediatePropagation);

	if (clearTargets) {
		initializeTargetToNullFor(event);
		setRelatedTargetToNullFor(event);
		setTouchTargetsToEmptyListFor(event);
	}

	if (activationTarget) {
		if (isFlagUnsetFor(event, EventFlag.Canceled)) {
			runActivationBehaviorOf(activationTarget, event)
		} else if (hasLegacyCanceledActivationBehavior(activationTarget)) {
			runLegacyCanceledActivationBehaviorOf(activationTarget, event);
		}
	}

	return !isFlagSetFor(event, EventFlag.Canceled);
};

export default dispatch;
