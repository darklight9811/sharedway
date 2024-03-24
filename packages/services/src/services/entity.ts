import { db } from "../lib/db"
import service from "../lib/service"

const entityService = service({
	index () {
		return db.entity.findMany()
	},
})

export default entityService