import {CreateMobTypeDto} from "../entities/dto/createMobType.dto.js";
import {promises as fs} from 'fs';
import {MobTypesSeedDto} from "../entities/dto/mobTypesSeed.dto.js";
import {MobTypeModel} from "../entities/mobType.model.js";

export async function seedDbMobTypesService(createMobTypeDtos?: CreateMobTypeDto[]) {

    if (!createMobTypeDtos?.length) {
        const filePath = './src/seed/mobTypesData.json';
        const content: string = await fs.readFile(filePath, 'utf8');
        const parsed: MobTypesSeedDto = JSON.parse(content);
        return MobTypeModel.create(parsed.mobTypesData)
    }

    return MobTypeModel.create(createMobTypeDtos)
}