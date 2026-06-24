import { rs } from '@rstest/core';

export const globalThisSpy = <C>(constructor: C) =>
	/* @ts-expect-error - Property 'name' does not exist on type 'C'. */
	rs.spyOn(globalThis, constructor.name).mockReturnValue(constructor);

export default globalThisSpy;
