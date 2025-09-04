import { getDb } from "../../db/mongo.js";
export async function getUsersService() {
    const db = await getDb();
    return db.collection("users").find({}).toArray();
}
