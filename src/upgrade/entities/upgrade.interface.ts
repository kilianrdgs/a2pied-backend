import {Schema} from "mongoose";

export interface IUpgrade {
    name: UpgradeNameEnum,
    level: number
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}


export enum UpgradeNameEnum {
    AUTO_CREDIT = "AUTO_CREDIT",
    BUY_5_IN_A_ROW = "BUY_5_IN_A_ROW",
    BUY_10_IN_A_ROW = "BUY_10_IN_A_ROW",
    CREDIT_MULTIPLIER = "CREDIT_MULTIPLIER"
}