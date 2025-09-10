import type { RawData } from "ws";

export function handleMessageService(ws: WebSocket, data: RawData) {
	try {
		const messageText = data.toString();
		console.log("Received:", messageText);

		if (ws.readyState === ws.OPEN) {
			ws.send(`Echo: ${messageText}`);
		}
	} catch (error) {
		console.error("Error processing message:", error);
	}
}
