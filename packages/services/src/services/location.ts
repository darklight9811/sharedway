import type { Pagination } from "@repo/schemas/pagination";
import states from "../constants/location";
import service from "../lib/service";

const locationService = service({
	async state({ q }: Pagination) {
		return states.filter((t) =>
			t.label.toLowerCase().includes(q?.toLowerCase() || ""),
		);
	},
});

export default locationService;
