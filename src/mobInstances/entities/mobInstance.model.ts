import mongoose, {Schema} from "mongoose";
import {IMobInstance} from "./mobInstance.interface.js";


const mobInstanceSchema = new Schema<IMobInstance>({
    mobType: {type: Schema.Types.ObjectId, ref: 'MobType', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    id: Number,
    spawned: Boolean
});


export const MobInstanceModel = mongoose.model('MobInstance', mobInstanceSchema);
