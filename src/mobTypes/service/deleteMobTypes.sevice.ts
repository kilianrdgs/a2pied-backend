import {MobTypeModel} from "../entities/mobType.model.js";

export async function deleteMobTypesSevice(deleteMobTypesSevice: { name: string }) {
    return MobTypeModel.deleteMany({
        name: deleteMobTypesSevice.name
    })
}