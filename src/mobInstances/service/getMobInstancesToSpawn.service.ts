import {MobInstanceModel} from "../entities/mobInstance.model.js";

export async function getMobInstancesToSpawnService() {
    return MobInstanceModel.find({spawned: false})
}