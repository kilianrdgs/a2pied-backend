import {UserModel} from "../entities/user.model.js";
import {IUpgrade} from "../../upgrade/entities/upgrade.interface.js";

export async function getUsersService() {
    return UserModel.find();
}

export async function getUserService(id: string) {
    const user = await UserModel.findOne({_id: id}).populate<{ upgrades: IUpgrade[] }>('upgrades')
    if (!user) throw new Error("User not found")
    return user
}

export async function getUserByMailService(mail: string) {
    const user = await UserModel.findOne({mail}).populate<{ upgrades: IUpgrade[] }>('upgrades')
    if (!user) throw new Error("User not found")
    return user
}

