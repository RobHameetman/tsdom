import UNLOCKED_CONSTRUCTORS from '@/_internals/constants/UNLOCKED_CONSTRUCTORS';

/**
 * A type for constructors in general.
 *
 * @privateRemarks
 * Must use `any` argument type here for parity with `lib.es5.d.ts` definitions.
 */
export type Constructor = new (...args: ReadonlyArray<any>) => unknown;
export type ConstructorFunction = Constructor | ((...args: ReadonlyArray<any>) => unknown);

export interface ImplOptions<C extends Constructor = Constructor> {
	readonly subtypes?: ReadonlyArray<Constructor>;
	readonly exposed?: boolean;
	readonly onInit?: (instance: InstanceType<C>, args: ConstructorParameters<C>) => void
}

const constructing = new Set();

export const implOf = <C extends Constructor = Constructor>(Constructor: Function, opts = {} as ImplOptions<C>) => {
	const {
		onInit = () => {},
		subtypes = [],
		exposed = false,
	} = opts;

	return new Proxy<C>(Constructor as C,  {
		construct(Impl, args: ConstructorParameters<C>) {
			console.log(Impl.name, subtypes.some((Subtype) => constructing.has(Subtype.name)));
			if (!exposed && !subtypes.includes(Impl) && !subtypes.some((Subtype) => constructing.has(Subtype.name))) {
				throw new TypeError(`Failed to construct '${Impl.name}': Illegal constructor`);
			}

			console.log(`Constructing ${Impl.name}`);
			constructing.add(Impl.name);

			const instance = Reflect.construct(Impl, args) as InstanceType<C>;

			onInit(instance, args);

			constructing.delete(Impl.name);
			console.log(`Constructed ${Impl.name}`);

			/**
			 * @privateRemarks
			 * Not sure why exactly the Proxy handler's `construct` trap has a return
			 * type annotated simply as `object`, but it does so that's why we need this cast
			 * here.
			 */
			return instance as object;
		},
		apply(Impl, instance = Object.create(Impl.prototype) as InstanceType<C>, args: ConstructorParameters<C>) {
			console.log(Impl.name, instance, subtypes.filter(Boolean));
			if (!exposed && !subtypes.filter(Boolean).some((Subtype) => instance instanceof Subtype)) {
				throw new TypeError('Illegal constructor');
			}

			Reflect.apply(Impl, instance, args);

			onInit(instance, args);

			return instance;
		},
	});
};

export default implOf;
