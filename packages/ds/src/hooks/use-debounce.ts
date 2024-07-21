import { useRef, useState } from "react";

export default function useDebounce<Value>(
	callback: (value: Value) => void,
	initialValue: Value,
	timeout = 300,
) {
	const ref = useRef<NodeJS.Timeout>();
	const [value, setvalue] = useState(initialValue);

	return [
		value,
		function updatevalue(newvalue: Value) {
			const parsed = (newvalue as any)?.target?.value || newvalue;

			if (ref.current) clearTimeout(ref.current);
			setvalue(parsed);

			ref.current = setTimeout(() => {
				callback(parsed);
			}, timeout);
		},
	] as const;
}
