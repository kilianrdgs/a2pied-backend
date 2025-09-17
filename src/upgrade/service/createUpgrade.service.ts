import {UpgradeModel} from "../entities/upgrade.model.js";
import {CreateUpgradeDto} from "../entities/dto/createUpgrade.dto.js";
import {getUserService} from "../../users/service/getUsers.service.js";

export async function createUpgradeService(upgradeData: CreateUpgradeDto) {
    const userId = upgradeData.userId;
    const user = await getUserService(userId.toString());
    if (user.upgrades.map((upgrade) => upgrade.name).includes(upgradeData.name)) return;
    upgradeData.level = upgradeData.level ?? 0;
    const upgrade = await new UpgradeModel({user: userId, level: upgradeData.level, name: upgradeData.name}).save();
    user.upgrades.push(upgrade);
    user.save();
    return upgrade;
}
