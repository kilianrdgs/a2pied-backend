import { ObjectId } from "mongodb";
export function isValidObjectId(id) {
    if (!ObjectId.isValid(id))
        return false;
    return new ObjectId(id).toHexString() === id.toLowerCase();
}
export function toObjectId(id) {
    if (!isValidObjectId(id)) {
        const err = new Error("Invalid Mongo ObjectId");
        throw err;
    }
    return new ObjectId(id);
}
export function objectIdToString(id) {
    return id ? id.toHexString() : null;
}
