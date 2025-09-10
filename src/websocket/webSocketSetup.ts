import { WebSocketServer } from "ws";
import { handleMessageService } from "./service/handleMessage.service.js";

export function webSocketSetup(server: any) {
	const wss = new WebSocketServer({
		server,
		path: "/ws",
		clientTracking: true,
	});
	wss.on("connection", function connection(ws, _request) {
		const now = new Date().toISOString();
		const ip = (ws as any)?._socket?.remoteAddress || "-";
		console.log(`[WS CONNECT] ${now} ${ip}`);
		// @ts-expect-error
		ws.on("message", (data) => handleMessageService(ws, data));

		ws.on("close", function close(code, reason) {
			console.log(`Client disconnected - Code: ${code}, Reason: ${reason}`);
		});
		ws.on("error", function error(err) {
			console.error("WebSocket error:", err);
		});
	});
}
