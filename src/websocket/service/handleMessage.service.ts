import {RawData} from "ws";
import {checkWebsocketCommunicationType} from "../utils/checkWebsocketCommunicationType.js";
import {WebsocketCommunicationC2SType, WebsocketEventC2SEnum} from "../type/WebsocketCommunicationC2SType.js";
import {confirmCommunicationReceipt, sendWebsocketJSONMessage} from "../utils/sendWebsocketJSONMessage.js";
import {WebsocketEventS2CEnum} from "../type/WebsocketCommunicationS2CType.js";
import {ExtendedWebSocket, godotWs, isOpen} from "../type/websocketState.js";

export function handleMessageService(ws: ExtendedWebSocket, data: RawData) {
    try {

        if (ws._role !== "godot") {
            if (godotWs && isOpen(godotWs)) {
                sendWebsocketJSONMessage(godotWs, {event: WebsocketEventS2CEnum.COMMUNICATION, data: {status: "ACK"}})
            } else {
                sendWebsocketJSONMessage(ws, {
                    event: WebsocketEventS2CEnum.COMMUNICATION,
                    data: {status: "Communication avec GODOT KO"}
                })
            }
        }
        const messageText = data.toString();
        console.log('Received:', messageText);
        confirmCommunicationReceipt(ws)
        try {
            const websocketCommunication: WebsocketCommunicationC2SType = checkWebsocketCommunicationType(messageText)
            handleEvent(websocketCommunication, ws)
        } catch (e) {
            if (ws.readyState === ws.OPEN) {
                ws.send("Le message reçu n'est pas au format attendu.");
            }
            console.log(e)
        }
    } catch (error) {
        console.error('Error processing message:', error);
        sendWebsocketJSONMessage(ws, {event: WebsocketEventS2CEnum.COMMUNICATION, data: {status: "KO"}})
    }

}


function handleEvent(websocketCommunicationType: WebsocketCommunicationC2SType, ws: ExtendedWebSocket) {

    switch (websocketCommunicationType.event) {
        case WebsocketEventC2SEnum.MONSTER_BOUGHT:
            console.log(WebsocketEventC2SEnum.MONSTER_BOUGHT)
            sendWebsocketJSONMessage(ws, {
                event: WebsocketEventS2CEnum.COMMUNICATION,
                data: {received: websocketCommunicationType.event}
            })

            break;
        case WebsocketEventC2SEnum.MONSTER_KILL:
            console.log(WebsocketEventC2SEnum.MONSTER_KILL)
            break;
        case WebsocketEventC2SEnum.MONSTER_LIST:
            console.log(WebsocketEventC2SEnum.MONSTER_LIST)
            break;
        case WebsocketEventC2SEnum.SYN:
            console.log(WebsocketEventC2SEnum.SYN)
            break;
        default:
            console.log("Evenement non reconnu")
            break;


    }
}