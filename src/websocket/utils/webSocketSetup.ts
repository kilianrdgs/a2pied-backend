import {WebSocketServer} from "ws";
import {handleMessageService} from "../service/handleMessage.service.js";
import {
    cleanWebsocketClients,
    ExtendedWebSocket,
    setGodot,
    websocketClients,
    WS_CLIENT_ROLE,
    WS_GODOT_ROLE
} from "../type/websocketState.js";
import {extractTokenFromURL, isTokenGodot} from "./utils.js";
import {randomUUID} from "node:crypto";

export function webSocketSetup(server: any) {
    const wss = new WebSocketServer({
        server,
        path: "/ws",
        clientTracking: true
    });

    //TODO : changer le timer
    setInterval(cleanWebsocketClients, 1000);


    wss.on('connection', function connection(wsBase, request) {

        const token = extractTokenFromURL(request)
        const ws = wsBase as ExtendedWebSocket;
        if (isTokenGodot(token)) {
            ws._role = WS_GODOT_ROLE;
            setGodot(ws);
            console.log("[WS CONNECT] GODOT_WS est set !")
        } else {
            ws._role = WS_CLIENT_ROLE;
            if (token) {
                if (!websocketClients.get(token)) websocketClients.set(token, ws);
                const id = randomUUID()
                websocketClients.set(`${token}${id}`, ws)
            } else {
                const id = randomUUID()
                websocketClients.set(`unknown-${id}`, ws)
            }
        }


        const now = new Date().toISOString();
        const ip = (ws as any)?._socket?.remoteAddress || '-';
        console.log(`[WS CONNECT] ${now} ${ip}`);
        ws.on('message', (data) => handleMessageService(ws, data));

        ws.on('close', function close(code, reason) {
            console.log(`Client disconnected - Code: ${code}, Reason: ${reason}`);
        });
        ws.on('error', function error(err) {
            console.error('WebSocket error:', err);
        });


    })
}