/**
 * @internal
 * A set of constructors that are allowed to be instantiated temporarily. Some
 * constructors (like `EventTarget`) are extended by so many other subtypes
 * especially as the DOM evolves that it's better for maintainability to have
 * subtypes just unlock the constructor on a case-by-case basis rather than
 * having to whitelist every single subtype.
 */
export const UNLOCKED_CONSTRUCTORS = new Set<new (...args: ReadonlyArray<unknown>) => unknown>();

export default UNLOCKED_CONSTRUCTORS;
