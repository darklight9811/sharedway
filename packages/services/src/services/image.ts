import { db } from "../lib/db";
import service from "../lib/service";

const imageService = service({
	show(id: string) {
		return db.profilePicture.findUnique({ where: { id } });
	},
});

export default imageService;
