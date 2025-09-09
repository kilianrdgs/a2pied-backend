import {MobInstanceModel} from "../entities/mobInstance.model.js";
import {IUser} from "../../users/entities/user.interface.js";
import {IMobType} from "../../mobTypes/entities/mobType.interface.js";

export async function getMobInstancesService() {
    return MobInstanceModel.find().populate<{ user: IUser }>('user')
        .populate<{ mobType: IMobType }>('mobType');
}

export async function getMobInstanceByIdPopulated(id: string) {
    const mobInstance = await MobInstanceModel.findOne({_id: id}).populate<{ user: IUser }>('user')
        .populate<{ mobType: IMobType }>('mobType');

    if (!mobInstance) throw new Error("MobInstance NotFound")
    return mobInstance
}
