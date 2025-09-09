import {IMobType} from "../../mobTypes/entities/mobType.interface.js";
import {IUser} from "../../users/entities/user.interface.js";

export enum WebsocketEventS2CEnum {
    COMMUNICATION = "COMMUNICATION",
    MONSTER_LIST = "MONSTER_LIST",
    MONSTER_SPAWN = "MONSTER_SPAWN"

}

export type WebsocketCommunicationS2CType = {
    event: WebsocketEventS2CEnum,
    data?: Record<string, string | Record<string, string> | string[]> | MonsterSpawnPayload
}


type MonsterSpawnPayload = { mobType: IMobType, user: IUser, mobInstanceId: string }
