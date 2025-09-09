import {WebSocketServer} from "ws";
import {handleMessageService} from "../service/handleMessage.service.js";
import {ExtendedWebSocket, setGodot, websocketClients} from "../type/websocketState.js";
import {randomUUID} from "node:crypto";
import {extractTokenFromURL, isTokenGodot} from "./utils.js";

export function webSocketSetup(server: any) {
    const wss = new WebSocketServer({
        server,
        path: "/ws",
        clientTracking: true
    });


    wss.on('connection', function connection(wsBase, request) {

        const token = extractTokenFromURL(request)
        const id = randomUUID();
        const ws = wsBase as ExtendedWebSocket;
        ws._id = id;
        if (isTokenGodot(token)) {
            ws._role = "godot";
            setGodot(ws);
            console.log("godotWS est set ! ")
        } else {
            ws._role = "client"
            websocketClients.set(id, ws);
        }

        const now = new Date().toISOString();
        const ip = (ws as any)?._socket?.remoteAddress || '-';
        console.log(`[WS CONNECT] ${now} ${ip}`);
        // @ts-ignore
        ws.on('message', (data) => handleMessageService(ws, data));

        ws.on('close', function close(code, reason) {
            console.log(`Client disconnected - Code: ${code}, Reason: ${reason}`);
        });
        ws.on('error', function error(err) {
            console.error('WebSocket error:', err);
        });


    })
}