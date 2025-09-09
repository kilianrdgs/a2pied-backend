export enum WebsocketEventS2CEnum {
    COMMUNICATION = "COMMUNICATION",
    MONSTER_LIST = "MONSTER_LIST",

}

export type WebsocketCommunicationS2CType = {
    event: WebsocketEventS2CEnum,
    data?: Record<string, string | Record<string, string> | string[]>
}

