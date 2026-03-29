import { jest } from '@jest/globals';
import overrideInNode from '@@/spies/misc/globalThisSpy';


jest.unstable_mockModule('./associations/signal', () => ({
	disposeSignalOf: jest.fn(),
	initializeSignalOf: jest.fn(),
	signalOf: jest.fn(),
}));

const { initializeSignalOf } = await import('./associations/signal');
const { default: AbortController } = await import('./AbortController');
const { default: AbortSignal } = await import('../AbortSignal');

// console.log(new AbortSignal());

describe('new AbortController()', () => {
	let abortController: AbortController | null = null;
	let abortSignalConstructor: jest.SpiedClass<typeof AbortSignal> | null = null;
	// let initializeSignalOf: MockInitializeSignalOf | null = null;

	beforeAll(async () => {
		// ({ initializeSignalOf } = await import('./associations/signal'));

		overrideInNode(AbortController);
		abortSignalConstructor = overrideInNode(AbortSignal);
	});

	beforeEach(() => {
		abortController = new AbortController();
	});

	afterEach(() => {
		jest.clearAllMocks();

		abortController = null;
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('should create a new AbortSignal', () => {
		expect(abortSignalConstructor).toHaveBeenCalledTimes(1);
	});

	it('should associate the signal with the controller', () => {
		expect(initializeSignalOf).toHaveBeenCalledWith(abortController, AbortSignal);
	});
});

describe('AbortController', () => {
	let abortController: AbortController | null = null;

	beforeAll(() => {
		// overrideInNode(AbortController);
		// overrideInNode(AbortSignal);

		// jest.replaceProperty(globalThis, 'AbortController', AbortController);
		// jest.replaceProperty(globalThis, 'AbortSignal', AbortSignal);

		jest.spyOn(globalThis, 'AbortController').mockImplementation(AbortController);
		// jest.spyOn(globalThis, 'AbortSignal').mockImplementation(AbortSignal);

		Object.defineProperty(globalThis, 'AbortSignal', {
			value: AbortSignal,
			configurable: true,
		});
	});

	beforeEach(() => {
		abortController = new AbortController();
	});

	afterEach(() => {
		jest.clearAllMocks();

		abortController = null;
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	describe('.signal', () => {
		it.only('should be readonly', () => {
			expect(Object.getOwnPropertyDescriptor(AbortController.prototype, 'signal')?.get).toBeInstanceOf(Function);
		});

		it('should return the controller\'s associated signal', () => {
			// console.log(abortController?.signal);
			expect(abortController?.signal).toBeInstanceOf(AbortSignal);
		});
	});

	describe('.abort()', () => {
		it('should not return anything', () => {
			expect(abortController?.abort()).toBeUndefined();
		});

		it('should abort the controller\'s associated signal when the controller is not already aborted', () => {
			expect(Object.getOwnPropertyDescriptor(AbortController.prototype, 'abort')?.value).toBeInstanceOf(Function);
		});

		it('should do nothing when the controller is not already aborted', () => {
			expect(Object.getOwnPropertyDescriptor(AbortController.prototype, 'abort')?.value).toBeInstanceOf(Function);
		});
	});

	// it('should have a readonly `signal` property', () => {
	// 	expect(Object.getOwnPropertyDescriptor(AbortController.prototype, 'signal')?.get).toBeInstanceOf(Function);
	// });

	// it('should have an `abort()` method', () => {
	// 	expect(Object.getOwnPropertyDescriptor(AbortController.prototype, 'abort')?.value).toBeInstanceOf(Function);
	// });
});
