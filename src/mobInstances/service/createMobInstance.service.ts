import {MobInstanceModel} from "../entities/mobInstance.model.js";
import {CreateMobInstanceDto} from "../entities/dto/createMobInstance.dto.js";
import {HydratedDocument} from "mongoose";
import {IMobInstance} from "../entities/mobInstance.interface.js";
import {getUserService} from "../../users/service/getUsers.service.js";
import {getMobTypeService} from "../../mobTypes/service/getMobTypes.service.js";

export async function createMobInstancesService(mobInstancesData: CreateMobInstanceDto): Promise<HydratedDocument<IMobInstance>> {
    try {
        const userId = mobInstancesData.user;
        const mobTypeId = mobInstancesData.mobType;
        await getUserService(userId.toString());
        await getMobTypeService(mobTypeId.toString())
        return MobInstanceModel.create({...mobInstancesData, spawned: false})
    } catch (e) {
        throw e
    }
}
