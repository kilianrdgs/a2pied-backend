import mongoose from "mongoose";
import type { IMobType } from "./mobType.interface.js";

const { Schema } = mongoose;

const mobTypeSchema = new Schema<IMobType>({
	cost: String,
	life: String,
	damage: Number,
	name: String,
});

export const MobTypeModel = mongoose.model("MobType", mobTypeSchema);
