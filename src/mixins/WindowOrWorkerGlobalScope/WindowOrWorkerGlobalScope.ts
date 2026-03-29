import InvalidCharacterError from '@/errors/InvalidCharacterError';

export const WindowOrWorkerGlobalScope = <T>(prototype: T) =>
	Object.defineProperties(prototype, {
		caches: {
			get(this: WindowOrWorkerGlobalScope) {
				return {} as CacheStorage;
			},
			configurable: true,
			enumerable: true,
		},
		crossOriginIsolated: {
			get(this: WindowOrWorkerGlobalScope) {
				return false;
			},
			configurable: true,
			enumerable: true,
		},
		crypto: {
			get(this: WindowOrWorkerGlobalScope) {
				return {} as Crypto;
			},
			configurable: true,
			enumerable: true,
		},
		indexedDB: {
			get(this: WindowOrWorkerGlobalScope) {
				return {} as IDBFactory;
			},
			configurable: true,
			enumerable: true,
		},
		isSecureContext: {
			get(this: WindowOrWorkerGlobalScope) {
				return false;
			},
			configurable: true,
			enumerable: true,
		},
		origin: {
			get(this: WindowOrWorkerGlobalScope) {
				return '';
			},
			configurable: true,
			enumerable: true,
		},
		performance: {
			get(this: WindowOrWorkerGlobalScope) {
				return {} as Performance;
			},
			configurable: true,
			enumerable: true,
		},
		atob: {
			value(this: WindowOrWorkerGlobalScope, data: string) {
				try {
					return globalThis.atob(data);
				} catch {
					throw new InvalidCharacterError(
						this,
						'atob',
						'The string to be decoded is not correctly encoded.',
					);
				}
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		btoa: {
			value(this: WindowOrWorkerGlobalScope, data: string) {
				try {
					return globalThis.btoa(data);
				} catch {
					throw new InvalidCharacterError(
						this,
						'btoa',
						'The string to be encoded contains characters outside of the Latin1 range.',
					);
				}
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		clearInterval: {
			value(this: WindowOrWorkerGlobalScope, handle: number) {
				globalThis.clearInterval(handle);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		clearTimeout: {
			value(this: WindowOrWorkerGlobalScope, handle: number) {
				globalThis.clearTimeout(handle);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		createImageBitmap: {
			value(
				this: WindowOrWorkerGlobalScope,
				_image: ImageBitmapSource,
				_options?: ImageBitmapOptions,
			) {
				return Promise.resolve({} as ImageBitmap);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		fetch: {
			value(
				this: WindowOrWorkerGlobalScope,
				input: RequestInfo,
				init?: RequestInit,
			) {
				if ('fetch' in globalThis) {
					return globalThis.fetch(input, init);
				}

				return Promise.resolve({} as Response);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		queueMicrotask: {
			value(this: WindowOrWorkerGlobalScope, callback: VoidFunction) {
				if ('queueMicrotask' in globalThis) {
					return globalThis.queueMicrotask(callback);
				}

				return Promise.resolve().then(callback).catch(this.reportError);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		reportError: {
			value(this: WindowOrWorkerGlobalScope, e: unknown) {
				if ('reportError' in globalThis) {
					return globalThis.reportError(e);
				}
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		setInterval: {
			value(
				this: WindowOrWorkerGlobalScope,
				handler: TimerHandler,
				timeout?: number,
				...args: ReadonlyArray<unknown>
			) {
				return globalThis.setInterval(handler, timeout, ...args);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
		setTimeout: {
			value(
				this: WindowOrWorkerGlobalScope,
				handler: TimerHandler,
				timeout?: number,
				...args: ReadonlyArray<unknown>
			) {
				return globalThis.setTimeout(handler, timeout, ...args);
			},
			configurable: true,
			enumerable: true,
			writable: true,
		},
	}) as T & WindowOrWorkerGlobalScope;

export default WindowOrWorkerGlobalScope;
