import mongoose from "mongoose";
import {IUpgrade, UpgradeNameEnum} from "./upgrade.interface.js";

const {Schema} = mongoose;

const upgradeSchema = new Schema<IUpgrade>({
    name: {type: String, enum: UpgradeNameEnum},
    level: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

export const UpgradeModel = mongoose.model("Upgrade", upgradeSchema);
