export enum WebsocketEventS2CEnum {
    ACK = "ACK",
    MONSTER_LIST = "MONSTER_LIST",

}

export type WebsocketCommunicationS2CType = {
    event: WebsocketEventS2CEnum,
    data?: Record<string, string>
}

