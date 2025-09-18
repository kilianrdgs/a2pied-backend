import {UpgradeModel} from "../entities/upgrade.model.js";
import {CreateUpgradeDto} from "../entities/dto/createUpgrade.dto.js";
import {getUserByMailService} from "../../users/service/getUsers.service.js";

export async function createUpgradeService(upgradeData: CreateUpgradeDto) {
    const userEmail = upgradeData.userEmail;
    const user = await getUserByMailService(userEmail);
    if (user.upgrades.map((upgrade) => upgrade.name).includes(upgradeData.name)) return;
    upgradeData.level = upgradeData.level ?? 1;
    const upgrade = await new UpgradeModel({user: user._id, level: upgradeData.level, name: upgradeData.name}).save();
    user.upgrades.push(upgrade);
    user.save();
    return upgrade;
}
