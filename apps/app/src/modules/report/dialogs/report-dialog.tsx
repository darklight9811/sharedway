"use client";

import Field from "@repo/ds/form/field";
import Form from "@repo/ds/form/form";
import tailwind from "@repo/ds/tw";
import { Button } from "@repo/ds/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ds/ui/dialog";
import { Label } from "@repo/ds/ui/label";
import { RadioGroup, RadioGroupItem } from "@repo/ds/ui/radio-group";
import { Textarea } from "@repo/ds/ui/textarea";
import report from "@repo/schemas/report";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { store } from "../actions";

/**
 * ### MARK: Interfaces
 */

interface Props {
	children: React.ReactNode;

	data?: { id_profile?: string };
}

/**
 * ### MARK: Component
 */

export default function ReportDialog(props: Props) {
	const t = useTranslations("report");

	return (
		<Dialog>
			<DialogTrigger asChild>{props.children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t("title")}</DialogTitle>
					<DialogDescription>{t("subtitle")}</DialogDescription>
				</DialogHeader>

				<Form
					schema={report}
					onSubmit={store}
					data={props.data}
					replace={Success}
				>
					<Field
						name="reason"
						render={({ field }) => (
							<RadioGroup
								{...field}
								onValueChange={field.onChange}
								className="border border-border rounded-lg gap-0"
							>
								<div className="flex items-center space-x-2 p-4 border-b border-border">
									<RadioGroupItem value="offensive" id="offensive" />
									<Label htmlFor="offensive">{t("reason.offensive")}</Label>
								</div>
								<div className="flex items-center space-x-2 p-4 border-b border-border">
									<RadioGroupItem value="not_missing" id="not_missing" />
									<Label htmlFor="not_missing">{t("reason.not_missing")}</Label>
								</div>
								<div className="flex items-center space-x-2 p-4 border-b border-border">
									<RadioGroupItem value="ownership" id="ownership" />
									<Label htmlFor="ownership">{t("reason.ownership")}</Label>
								</div>
								<div className="flex items-center space-x-2 p-4">
									<RadioGroupItem value="other" id="other" />
									<Label htmlFor="other">{t("reason.other")}</Label>
								</div>
							</RadioGroup>
						)}
					/>

					<Field
						name="description"
						label={t("description")}
						render={({ field }) => <Textarea {...field} />}
					/>

					<DialogFooter>
						<Button variant="destructive" type="submit">
							{t("action")}
						</Button>
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

/**
 * ### MARK: Helpers
 */

function Success() {
	const t = useTranslations("report");

	return (
		<div className="flex flex-col justify-center items-center gap-4 animate-left-in">
			<CircleCheck
				size={128}
				color={tailwind.theme.extend.colors.primary.DEFAULT}
			/>

			<p>{t("success")}</p>

			<DialogFooter>
				<DialogTrigger asChild>
					<Button>{t("close")}</Button>
				</DialogTrigger>
			</DialogFooter>
		</div>
	);
}
