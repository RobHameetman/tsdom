import eventHandlerMap from './eventHandlerMap';

describe('eventHandlerMap()', () => {
	it('should return true given a valid DataTransfer', () => {
		expect(eventHandlerMap(new DataTransfer())).toBe(true);
	});

	it('should return false given an invalid DataTransfer', () => {
		expect(eventHandlerMap({})).toBe(false);
	});
});
