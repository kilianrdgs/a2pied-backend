import {UserModel} from "../entities/user.model.js";
import {CreateUserDto} from "../entities/dto/createUser.dto.js";

export async function createUserService(userData: CreateUserDto) {
    const user = new UserModel(userData)
    return user.save()
}
