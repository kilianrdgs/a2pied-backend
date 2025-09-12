import type {Request, Response} from "express";
import {godotWs, websocketClients} from "../type/websocketState.js";

export async function getWebsocketStatusData(_req: Request, res: Response) {
    const ws_clients_mail: string[] = []
    if (websocketClients.size > 0) {
        for (const [id] of websocketClients) {
            ws_clients_mail.push(id)
        }
    }
    const isGodotHere = !!godotWs
    res.json({
        ws_godot: isGodotHere,
        ws_clients_mail,
        ws_clients_count: websocketClients.size,
        rss_mb: (process.memoryUsage().rss / 1024 / 1024).toFixed(1),
        uptime_s: Math.floor(process.uptime()),
    });
}