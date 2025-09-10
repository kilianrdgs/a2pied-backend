import { MobTypeModel } from "../entities/mobType.model.js";

export async function deleteAllMobTypesService() {
	return MobTypeModel.deleteMany();
}
