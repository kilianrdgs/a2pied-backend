import { UserModel } from "../entities/user.model.js";
import {HydratedDocument} from "mongoose";
import {IUser} from "../entities/user.interface.js";

export async function getUsersService() {
	return UserModel.find();
}

export async function getUserService(id: string): Promise<HydratedDocument<IUser>> {
    const user = await UserModel.findOne({_id: id})
    if (!user) throw new Error("User not found")
    return user
}
