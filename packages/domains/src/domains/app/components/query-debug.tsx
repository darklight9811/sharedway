import { Button } from "@repo/ds/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@repo/ds/ui/sheet";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { CodeIcon } from "lucide-react";

export function QueryDebug() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="sm" variant="query" className="w-full justify-start">
					<CodeIcon /> Query
				</Button>
			</SheetTrigger>

			<SheetContent side="bottom" className="p-0 border-t-0">
				<SheetTitle />
				<SheetDescription />
				<ReactQueryDevtoolsPanel />
			</SheetContent>
		</Sheet>
	);
}
