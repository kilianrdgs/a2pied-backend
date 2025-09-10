import mongoose from "mongoose";
import {IMobType} from "./mobType.interface.js";

const {Schema} = mongoose;

const mobTypeSchema = new Schema<IMobType>({
    cost: String,
    life: String,
    damage: Number,
    name: {type: String, unique: true},
});

export const MobTypeModel = mongoose.model('MobType', mobTypeSchema);
