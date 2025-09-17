import {UpgradeModel} from "../entities/upgrade.model.js";
import {UserModel} from "../../users/entities/user.model.js";

export async function getUserUpgradeService(userEmail: string) {
    const user = await UserModel.findOne({mail: userEmail})
    if (!user) return []
    return UpgradeModel.find({user: user._id});
}