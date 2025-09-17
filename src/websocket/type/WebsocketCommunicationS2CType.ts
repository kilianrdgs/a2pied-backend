import {IMobType} from "../../mobTypes/entities/mobType.interface.js";
import {IUser} from "../../users/entities/user.interface.js";

export enum WebsocketEventS2CEnum {
    COMMUNICATION = "COMMUNICATION",
    MONSTER_KILL = "MONSTER_KILL",
    MONSTER_SPAWN = "MONSTER_SPAWN",
    BROADCAST = "BROADCAST"

}

export type WebsocketCommunicationS2CType = {
    event: WebsocketEventS2CEnum,
    data?: Record<string, boolean | string | Record<string, string> | string[]> | MonsterSpawnPayload | MonsterKillPayload
}


type MonsterSpawnPayload = { mobType: IMobType, user: IUser, mobInstanceId: string }
type MonsterKillPayload = { mobType: IMobType }
