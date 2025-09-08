import {MobTypeModel} from "../entities/mobType.model.js";

export async function deleteMobTypesService(deleteMobTypes: { name: string }) {
    return MobTypeModel.deleteMany({
        name: deleteMobTypes.name
    })
}