import type { BoundaryPoint } from '#public/AbstractRange/types/BoundaryPoint';

/**
 * @see https://dom.spec.whatwg.org/#concept-range-start
 */
export const start = new WeakMap<AbstractRange, BoundaryPoint>();

export const disposeStartOf = (range: AbstractRange) => {
	start.delete(range);
};

export const startOf = (range: AbstractRange) => {
	if (!start.has(range)) {
		start.set(range, [document, 0]);
	}

	return start.get(range) as BoundaryPoint;
};

export const startContainerOf = (range: AbstractRange) => {
	const [ container ] = startOf(range);

	return container;
};

export const startOffsetOf = (range: AbstractRange) => {
	const [ , offset ] = startOf(range);

	return offset;
};

export const setStartOf = (range: AbstractRange, boundaryPoint: BoundaryPoint) => {
	start.set(range, boundaryPoint);
};
