import { initializeAbortAlgorithmsOf } from '#public/AbortSignal/associations/abortAlgorithms';
import { initializeAbortReasonOf } from '#public/AbortSignal/associations/abortReason';
import { initializeDependentOf } from '#public/AbortSignal/associations/dependent';
import { initializeDependentSignalsOf } from '#public/AbortSignal/associations/dependentSignals';
import { initializeSourceSignalsOf } from '#public/AbortSignal/associations/sourceSignals';
import AbortSignal from './AbortSignal';

export const createAbortSignal = () => {
	const signal = Object.create(AbortSignal.prototype) as AbortSignal;

	initializeAbortReasonOf(signal);
	initializeAbortAlgorithmsOf(signal);
	initializeDependentOf(signal);
	initializeDependentSignalsOf(signal);
	initializeSourceSignalsOf(signal);

	return signal;
};

export default AbortSignal;
