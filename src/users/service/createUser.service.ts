import type { CreateUserDto } from "../entities/dto/createUser.dto.js";
import { UserModel } from "../entities/user.model.js";

export async function createUserService(userData: CreateUserDto) {
	const user = new UserModel(userData);
	return user.save();
}
