import {MobInstanceModel} from "../entities/mobInstance.model.js";
import {CreateMobInstanceDto} from "../entities/dto/createMobInstance.dto.js";
import {HydratedDocument} from "mongoose";
import {IMobInstance} from "../entities/mobInstance.interface.js";
import {getUserByMailService, getUserService, getUsersService} from "../../users/service/getUsers.service.js";
import {
    getMobTypeByNameService,
    getMobTypeService,
    getMobTypesService
} from "../../mobTypes/service/getMobTypes.service.js";
import {IMobType} from "../../mobTypes/entities/mobType.interface.js";
import {IUser} from "../../users/entities/user.interface.js";

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


export async function createMobInstanceServiceWithNameAndEmail(data: {
    monsterName: string,
    userEmail: string
}): Promise<HydratedDocument<IMobInstance>> {
    const mobType: HydratedDocument<IMobType> = await getMobTypeByNameService(data.monsterName)
    const user: HydratedDocument<IUser> = await getUserByMailService(data.userEmail)
    const mobInstancesData: CreateMobInstanceDto = {mobType: mobType._id.toString(), user: user._id.toString()}
    return await MobInstanceModel.create({...mobInstancesData, spawned: false})

}

export async function createMobInstanceRandomService(): Promise<HydratedDocument<IMobInstance>> {
    const mobTypes: HydratedDocument<IMobType>[] = await getMobTypesService()
    const mobType: HydratedDocument<IMobType> = mobTypes[0]
    const users: HydratedDocument<IUser>[] = await getUsersService()
    const user: HydratedDocument<IUser> = users[0]
    const mobInstancesData: CreateMobInstanceDto = {mobType: mobType._id.toString(), user: user._id.toString()}
    return await MobInstanceModel.create({...mobInstancesData, spawned: false})

}