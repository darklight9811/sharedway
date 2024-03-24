import { db } from "../lib/db"
import service from "../lib/service"

const userService = service({
	index () {
		return db.user.findMany()
	},
})

export default userService