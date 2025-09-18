import {UpgradeModel} from "../entities/upgrade.model.js";
import {UserModel} from "../../users/entities/user.model.js";

export async function deleteAllUpgradesService() {
    await UserModel.updateMany({}, {upgrades: []})
    return UpgradeModel.deleteMany();
}
