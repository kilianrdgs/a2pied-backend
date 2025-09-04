import { getDb } from "../../db/mongo.js";
export async function createUserService(user) {
    const db = await getDb();
    const { insertedId } = await db.collection("users").insertOne(user);
    return { ...user, _id: String(insertedId) };
}
