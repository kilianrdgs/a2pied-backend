import { getDb } from "../../db/mongo.js";

export async function deleteAllUsersService() {
	const db = await getDb();
	const res = await db.collection("users").deleteMany({});
	return res.deletedCount ?? 0;
}
