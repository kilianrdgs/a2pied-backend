import { getDb } from "../../db/mongo.js";
import type { User } from "../user.model.js";

export async function createUserService(user: User) {
	const db = await getDb();
	const { insertedId } = await db.collection("users").insertOne(user);
	return { ...user, _id: String(insertedId) };
}
