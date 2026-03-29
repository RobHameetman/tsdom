import EventTarget from '@/public/EventTarget';

export const WindowProperties = function(
	this: Window,
) {
	EventTarget.call(this);

	return this;
};

WindowProperties.prototype = Object.create(EventTarget.prototype, {
	[Symbol.toStringTag]: {
		value: 'WindowProperties',
		configurable: true,
	},
});

export default WindowProperties;
