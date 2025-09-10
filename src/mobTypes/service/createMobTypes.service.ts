import {MobTypeModel} from "../entities/mobType.model.js";
import {CreateMobTypeDto} from "../entities/dto/createMobType.dto.js";
import {IMobType} from "../entities/mobType.interface.js";
import {HydratedDocument} from "mongoose";

export async function createMobTypeService(mobTypeData: CreateMobTypeDto): Promise<HydratedDocument<IMobType>> {
    return MobTypeModel.create(mobTypeData)
}
