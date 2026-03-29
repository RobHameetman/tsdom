import { jest } from '@jest/globals';

export const globalThisSpy = <C>(constructor: C) =>
	/* @ts-expect-error - Property 'name' does not exist on type 'C'. */
	jest.spyOn(globalThis, constructor.name).mockReturnValue(constructor);

export default globalThisSpy;
