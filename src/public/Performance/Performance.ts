import EventTarget from '#public/EventTarget';

export const Performance = function(this: Performance) {
	throw new TypeError('Failed to construct \'Performance\': Illegal constructor');
} as unknown as typeof global.Performance;

Object.defineProperties(Performance, {
	prototype: {
		value: Object.seal(Object.create(EventTarget.prototype, {
			eventCounts: {
				get(this: Performance) {
					return new Map<string, number>() as EventCounts;
				},
				configurable: true,
				enumerable: true,
			},
			navigation: {
				get(this: Performance) {
					return {} as PerformanceNavigation;
				},
				configurable: true,
				enumerable: true,
			},
			timeOrigin: {
				get(this: Performance) {
					return 0 as DOMHighResTimeStamp;
				},
				configurable: true,
				enumerable: true,
			},
			timing: {
				get(this: Performance) {
					return {} as PerformanceTiming;
				},
				configurable: true,
				enumerable: true,
			},
			clearMarks: {
				value(this: Performance, markName = '') {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			clearMeasures: {
				value(this: Performance, measureName = '') {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			clearResourceTimings: {
				value(this: Performance) {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getEntries: {
				value(this: Performance, markName = '') {
					return [] as PerformanceEntryList;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getEntriesByName: {
				value(this: Performance, name: string, type = '') {
					return [] as PerformanceEntryList;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			getEntriesByType: {
				value(this: Performance, type = '') {
					return [] as PerformanceEntryList;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			mark: {
				value(this: Performance, markName: string, markOptions = {} as PerformanceMarkOptions) {
					return {} as PerformanceMark;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			measure: {
				value(this: Performance, measureName: string, startOrMeasureOptions = {} as string | PerformanceMeasureOptions, endMark?: string) {
					return {} as PerformanceMeasure;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			now: {
				value(this: Performance) {
					return performance.now() as DOMHighResTimeStamp;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			setResourceTimingBufferSize: {
				value(this: Performance, maxSize: number) {
					return;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			toJSON: {
				value(this: Performance) {
					return {} as PerformanceEntryList;
				},
				configurable: true,
				enumerable: true,
				writable: true,
			},
			constructor: {
				value: Performance,
				writable: true,
				configurable: true,
			},
			[Symbol.toStringTag]: {
				value: 'Performance',
				configurable: true,
			},
		})),
	},
});

Object.seal(Performance);

if (!globalThis.Performance) {
	globalThis.Performance = Performance;
}

/**
 * Checks that an `unknown` value is a {@link Performance}.
 *
 * Requirements:
 *   - `value` must be an instance of {@link Performance}.
 *
 * @param value - An `unknown` value.
 *
 * @returns The determination that `value` is or is not a {@link Performance}.
 */
export const isPerformance = (value: unknown): value is Performance =>
	value instanceof Performance;

export default Performance;
