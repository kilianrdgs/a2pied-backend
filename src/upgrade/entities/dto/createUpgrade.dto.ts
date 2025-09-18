import {UpgradeNameEnum} from "../upgrade.interface.js";

export interface CreateUpgradeDto {
    userEmail: string;
    name: UpgradeNameEnum,
    level?: number
}