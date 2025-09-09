import type {WebSocket} from 'ws';

export type Role = 'godot' | 'client';
export type ExtendedWebSocket = WebSocket & { _id?: string; _role?: Role };

export const websocketClients = new Map<string, ExtendedWebSocket>();
export let godotWs: ExtendedWebSocket | null = null;

export function setGodot(ws: ExtendedWebSocket | null): void {
    godotWs = ws;
}

export function isOpen(ws: WebSocket): boolean {
    return ws.readyState === ws.OPEN;
}
