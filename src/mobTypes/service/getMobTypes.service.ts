import {MobTypeModel} from "../entities/mobType.model.js";
import {IMobType} from "../entities/mobType.interface.js";
import {HydratedDocument} from "mongoose";

export async function getMobTypesService() {
    return MobTypeModel.find()
}

export async function getMobTypeByNameService(getMobTypeName: string): Promise<IMobType[]> {
    return MobTypeModel.find({name: {$regex: `^${getMobTypeName}$`, $options: 'i'}});
}

export async function getMobTypeService(id: string): Promise<HydratedDocument<IMobType>> {
    const mobType = await MobTypeModel.findOne({_id: id})
    if (!mobType) throw new Error("MobType not found")
    return mobType
}


