import { useEffect } from "react";

export default function useUpdate(
	// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
	callback: () => void | (() => void),
	triggers: unknown[],
) {
	useEffect(callback, triggers);
}
