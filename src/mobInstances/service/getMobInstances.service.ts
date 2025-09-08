import {MobInstanceModel} from "../entities/mobInstance.model.js";
import {IMobInstance} from "../entities/mobInstance.interface.js";
import {IUser} from "../../users/entities/user.interface.js";
import {IMobType} from "../../mobTypes/entities/mobType.interface.js";

export async function getMobInstancesService() {
    return MobInstanceModel.find().populate<{ user: IUser }>('user')
        .populate<{ mobType: IMobType }>('mobType');
}

export async function getMobInstanceByNameService(getMobInstanceName: string): Promise<IMobInstance[]> {
    return MobInstanceModel.find({name: {$regex: `^${getMobInstanceName}$`, $options: 'i'}});
}
