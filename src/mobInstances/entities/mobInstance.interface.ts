import {Schema} from "mongoose";

export interface IMobInstance {
    mobType: { type: Schema.Types.ObjectId, ref: 'MobType', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id: number,
    spawned: boolean
}