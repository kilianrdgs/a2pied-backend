import { UserModel } from "../entities/user.model.js";

export async function deleteAllUsersService() {
	return UserModel.deleteMany();
}
