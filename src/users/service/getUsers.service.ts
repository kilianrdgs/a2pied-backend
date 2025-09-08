import { UserModel } from "../entities/user.model.js";

export async function getUsersService() {
	return UserModel.find();
}
