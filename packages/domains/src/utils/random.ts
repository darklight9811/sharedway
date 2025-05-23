export function randomCuid2() {
	return `c${Math.random().toString(36).substr(2, 9)}`;
}
