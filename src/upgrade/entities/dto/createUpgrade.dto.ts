import {UpgradeNameEnum} from "../upgrade.interface.js";

export interface CreateUpgradeDto {
    userId: string;
    name: UpgradeNameEnum,
    level?: number
}