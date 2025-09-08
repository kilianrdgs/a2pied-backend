import { UserModel } from "../entities/user.model.js";

export async function deleteUserService(objectId: string) {
	return UserModel.deleteOne({ _id: objectId });
}
