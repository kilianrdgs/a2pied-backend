import {WebsocketCommunicationC2SType, WebsocketEventC2SEnum} from "../type/WebsocketCommunicationC2SType.js";
import {logError} from "../../utils/logError.js";

export const checkWebsocketCommunicationType = (data: string): WebsocketCommunicationC2SType => {
    try {
        const json = JSON.parse(data)
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
    } catch (e) {
        logError(e)
        throw e
    }

}

