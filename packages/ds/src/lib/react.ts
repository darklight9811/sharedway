import { useEffect } from "react";

export function useUpdate(...args: Parameters<typeof useEffect>) {
	useEffect(args[0], args[1]);
}
