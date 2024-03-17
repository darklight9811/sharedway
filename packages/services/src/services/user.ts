import { db } from "../lib/db"
import service from "../lib/service"

const users = service({
	index () {
		return db.user.findMany()
	}
})

export default users