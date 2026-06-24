import { rs } from '@rstest/core';
type WindowSpy = Partial<Window & typeof globalThis>;
type Key = keyof WindowSpy;

export const windowSpy = () =>
	rs.spyOn<WindowSpy, Key>(window, 'window', 'get');
