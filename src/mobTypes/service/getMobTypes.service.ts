import type { IMobType } from "../entities/mobType.interface.js";
import { MobTypeModel } from "../entities/mobType.model.js";

export async function getMobTypesService() {
	return MobTypeModel.find();
}

export async function getMobTypeByNameService(
	getMobTypeName: string,
): Promise<IMobType[]> {
	return MobTypeModel.find({
		name: { $regex: `^${getMobTypeName}$`, $options: "i" },
	});
}
