import {UpdateUpgradeDto} from "../entities/dto/updateUpgrade.dto.js";
import {UpgradeModel} from "../entities/upgrade.model.js";

export async function updateUpgradeService(upgradeData: UpdateUpgradeDto) {
    const {upgradeId, level} = upgradeData
    return UpgradeModel.findOneAndUpdate({_id: upgradeId}, {level})
}