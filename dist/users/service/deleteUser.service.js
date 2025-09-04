import { getDb } from "../../db/mongo.js";
import { toObjectId } from "../../db/objectId.js";
export async function deleteUserService(objectId) {
    const _id = toObjectId(objectId);
    const db = await getDb();
    const res = await db.collection("users").deleteOne({
        _id,
    });
    return res.deletedCount ?? 0;
}
