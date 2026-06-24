import { resolve } from 'node:path';
import { defineConfig } from '@rstest/core';

const root = resolve(import.meta.dirname, '../..');

export default defineConfig({
	root,
	globals: true,
	testEnvironment: 'node',
	include: ['src/**/*.spec.{ts,tsx}'],
	coverage: {
		include: ['src/**/*.{ts,tsx}'],
		exclude: ['src/**/*.d.ts'],
		reporters: ['text-summary'],
	},
});
