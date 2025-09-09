import {WebsocketCommunicationC2SType, WebsocketEventC2SEnum} from "../websocket/type/WebsocketCommunicationC2SType.js";

export const checkWebsocketCommunicationType = (data: string): WebsocketCommunicationC2SType => {
    let json = {}
    try {
        json = JSON.parse(data)
    } catch (e) {
        throw e
    }
    const CONFIG: WebsocketCommunicationC2SType = {
        event: WebsocketEventC2SEnum.MONSTER_BOUGHT,
        data: {
            sampleKey: "sampleValue"
        },
    } as const;
    const keysToCheck: Array<keyof WebsocketCommunicationC2SType> = Object.keys(CONFIG) as Array<keyof WebsocketCommunicationC2SType>
    const keys = Object.keys(json);
    for (const key of keys) {
        if (!(keysToCheck as string[]).includes(key)) {
            throw new Error("Erreur de type : le message reçu n'est pas dans le type souhaité")
        }
    }
    return json as WebsocketCommunicationC2SType
}

