import type { HydratedDocument } from "mongoose";
import type { CreateMobTypeDto } from "../entities/dto/createMobType.dto.js";
import type { IMobType } from "../entities/mobType.interface.js";
import { MobTypeModel } from "../entities/mobType.model.js";

export async function createMobTypesService(
	mobTypeData: CreateMobTypeDto,
): Promise<HydratedDocument<IMobType>> {
	return MobTypeModel.create(mobTypeData);
}
