import {MobInstanceModel} from "../entities/mobInstance.model.js";

export async function deleteMobInstanceService(deleteMobInstanceDTO: { id: string }) {
    return MobInstanceModel.deleteMany({
        _id: deleteMobInstanceDTO.id
    })
}