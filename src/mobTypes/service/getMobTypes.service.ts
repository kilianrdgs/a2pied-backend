import {MobTypeModel} from "../entities/mobType.model.js";
import {IMobType} from "../entities/mobType.interface.js";
import {GetMobTypeByNameDto} from "../entities/dto/getMobTypeByName.dto.js";

export async function getMobTypesService() {
    return MobTypeModel.find()
}

export async function getMobTypeByNameService(getMobTypeByNameDto: GetMobTypeByNameDto): Promise<IMobType[]> {
    const {name} = getMobTypeByNameDto
    return MobTypeModel.find({name});
}


