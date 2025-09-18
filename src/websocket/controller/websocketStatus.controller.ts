import type {Request, Response} from "express";
import {godotWs, websocketClients} from "../type/websocketState.js";
import {getGameState, resetGameState} from "../../game/gameState.js";
import {deleteAllUpgradesService} from "../../upgrade/service/deleteAllUpgrades.service.js";
import {creditsService} from "../../credits/service/credits.service.js";
import {WebsocketCommunicationS2CType, WebsocketEventS2CEnum} from "../type/WebsocketCommunicationS2CType.js";
import {WebsocketEventC2SEnum} from "../type/WebsocketCommunicationC2SType.js";
import {broadCastJSONMessage} from "../utils/sendWebsocketJSONMessage.js";

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
        gameState: getGameState()
    });
}

export async function resetGameStateController(_req: Request, res: Response) {
    resetGameState()
    await deleteAllUpgradesService()
    console.log('upodate')
    await creditsService.resetAllCredits()
    console.log("all credit reset")
    const broadcastMessage: WebsocketCommunicationS2CType = {event: WebsocketEventS2CEnum.BROADCAST}

    broadcastMessage.data = {
        event: WebsocketEventC2SEnum.UPDATE_STATE,
        data: {action: "reset"},
        timestamp: new Date().getTime().toString()
    }

    await broadCastJSONMessage(broadcastMessage);

    res.status(200).send("OK");
}