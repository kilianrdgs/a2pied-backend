import {MobInstanceModel} from "../entities/mobInstance.model.js";

export async function confirmSpawningService(ids: string[]) {
    //Todo : TEST
    await MobInstanceModel.updateMany({_id: {$in: ids}}, {spawned: true});

}