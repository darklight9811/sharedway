import { buildMetadata } from "@/lib/parallel";
import imageService from "@repo/services/image";
import type { NextRequest } from "next/server";

export async function GET(
	_req: NextRequest,
	{ params }: { params: { id: string } },
) {
	const data = await imageService.show(params.id)(await buildMetadata());
	const image = await fetch(data!.url);

	return image;
}
