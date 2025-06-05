import { useEffect } from "react";

export function useUpdate(callback: Parameters<typeof useEffect>[0], triggers: unknown[]) {
	useEffect(callback, triggers);
}
