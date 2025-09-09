import {WebsocketCommunicationS2CType, WebsocketEventS2CEnum} from "../type/WebsocketCommunicationS2CType.js";
import {ExtendedWebSocket, godotWs, isOpen} from "../type/websocketState.js";

export const sendWebsocketJSONMessage = (ws: ExtendedWebSocket, jsonMessage: WebsocketCommunicationS2CType) => {
    ws.send(JSON.stringify(jsonMessage))
}

export const sendWebsocketJSONMessageToGODOT = (jsonMessage: WebsocketCommunicationS2CType) => {
    if (godotWs && isOpen(godotWs)) {
        sendWebsocketJSONMessage(godotWs, jsonMessage)
    }
}


export const confirmCommunicationReceipt = (ws: ExtendedWebSocket) => {
    sendWebsocketJSONMessage(ws, {event: WebsocketEventS2CEnum.COMMUNICATION, data: {status: "ACK"}})
}