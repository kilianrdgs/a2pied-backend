import {UpgradeModel} from "../entities/upgrade.model.js";

export async function deleteAllUpgradesService() {
    return UpgradeModel.deleteMany();
}
