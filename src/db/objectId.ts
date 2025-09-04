import { ObjectId } from "mongodb";

export function isValidObjectId(id: string): boolean {
	if (!ObjectId.isValid(id)) return false;
	return new ObjectId(id).toHexString() === id.toLowerCase();
}

export function toObjectId(id: string): ObjectId {
	if (!isValidObjectId(id)) {
		const err = new Error("Invalid Mongo ObjectId");

		throw err;
	}
	return new ObjectId(id);
}

export function objectIdToString(
	id: ObjectId | null | undefined,
): string | null {
	return id ? id.toHexString() : null;
}
