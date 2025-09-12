import type {WebSocket} from 'ws';

export const WS_GODOT_ROLE: "godot" = "godot" as const
export const WS_CLIENT_ROLE: "client" = "client"
export type Role = typeof WS_GODOT_ROLE | typeof WS_CLIENT_ROLE;
export type ExtendedWebSocket = WebSocket & { _id?: string; _role?: Role };

export const websocketClients = new Map<string, ExtendedWebSocket>();
export let godotWs: ExtendedWebSocket | null = null;

export function setGodot(ws: ExtendedWebSocket | null): void {
    godotWs = ws;
}


export function cleanWebsocketClients() {
    for (const [id, ws] of websocketClients) {
        if (!isOpen(ws)) {
            websocketClients.delete(id);
        }
    }

    if (godotWs && !isOpen(godotWs)) setGodot(null)
}

export function isOpen(ws: WebSocket): boolean {
    return ws.readyState === ws.OPEN;
}
