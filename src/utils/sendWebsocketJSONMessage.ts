import {WebsocketCommunicationS2CType, WebsocketEventS2CEnum} from "../websocket/type/WebsocketCommunicationS2CType.js";

export const sendWebsocketJSONMessage = (ws: WebSocket, jsonMessage: WebsocketCommunicationS2CType) => {
    ws.send(JSON.stringify(jsonMessage))
}


export const confirmCommunicationReceipt = (ws: WebSocket) => {
    sendWebsocketJSONMessage(ws, {event: WebsocketEventS2CEnum.ACK})
}