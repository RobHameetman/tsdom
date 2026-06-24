import type { BoundaryPoint } from '#public/AbstractRange/types/BoundaryPoint';

/**
 * @see https://dom.spec.whatwg.org/#concept-range-end
 */
export const end = new WeakMap<AbstractRange, BoundaryPoint>();

export const disposeEndOf = (range: AbstractRange) => {
	end.delete(range);
};

export const endOf = (range: AbstractRange) => {
	if (!end.has(range)) {
		end.set(range, [document, 0]);
	}

	return end.get(range) as BoundaryPoint;
};

export const endContainerOf = (range: AbstractRange) => {
	const [ container ] = endOf(range);

	return container;
};

export const endOffsetOf = (range: AbstractRange) => {
	const [ , offset ] = endOf(range);

	return offset;
};

export const setEndOf = (range: AbstractRange, boundaryPoint: BoundaryPoint) => {
	end.set(range, boundaryPoint);
};
