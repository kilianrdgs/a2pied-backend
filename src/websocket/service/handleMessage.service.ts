import {RawData} from "ws";
import {checkWebsocketCommunicationType} from "../utils/checkWebsocketCommunicationType.js";
import {WebsocketCommunicationC2SType, WebsocketEventC2SEnum} from "../type/WebsocketCommunicationC2SType.js";
import {
    broadCastJSONMessage,
    sendWebsocketJSONMessage,
    sendWebsocketJSONMessageToGODOT
} from "../utils/sendWebsocketJSONMessage.js";
import {WebsocketCommunicationS2CType, WebsocketEventS2CEnum} from "../type/WebsocketCommunicationS2CType.js";
import {C2S_EVENT_TO_BROADCAST, ExtendedWebSocket, godotWs, isOpen, WS_GODOT_ROLE} from "../type/websocketState.js";
import {handleMonsterBoughtEventService} from "./handleMonsterBoughtEvent.service.js";
import {handleMonsterKillEventService} from "./handleMonsterKillEvent.service.js";

/**
 * Gère la réception et le traitement d'un message WebSocket.
 *
 * Cette fonction est appelée lorsqu'un message brut (`RawData`) est reçu par le serveur
 * et s'occupe de :
 * - Vérifier si l'expéditeur n'est pas le client "godot".
 *   - Si Godot est connecté et disponible, envoie un accusé de réception (ACK).
 *   - Sinon, informe le client que la communication avec Godot a échoué.
 * - Convertir le message brut en texte et le journaliser dans la console.
 * - Valider le format du message reçu à l'aide de `checkWebsocketCommunicationType`.
 *   - Si le message est valide, délègue son traitement à `handleEvent`.
 *   - Si le format est invalide, envoie au client un message d'erreur.
 * - Gérer toute erreur inattendue lors du traitement et renvoyer un statut "KO".
 *
 * @param ws - La connexion WebSocket enrichie de type `ExtendedWebSocket` représentant le client émetteur du message.
 * @param data - Les données brutes reçues via la connexion WebSocket.
 *
 * @remarks
 * - Cette fonction distingue les rôles de connexion, notamment le rôle spécial `"godot"`.
 * - Elle implémente un mécanisme d'ACK pour confirmer la réception du message au client.
 * - Toute erreur est loggée et notifiée au client avec une réponse JSON standardisée.
 *
 * @example
 * ```
 * // Exemple d'utilisation lors de la réception d'un message
 * wss.on("message", (data, ws) => {
 *   handleMessageService(ws, data);
 * });
 * ```
 */
export function handleMessageService(ws: ExtendedWebSocket, data: RawData) {
    try {

        if (ws._role !== WS_GODOT_ROLE) {
            if (godotWs && isOpen(godotWs)) {
                //Juste pour ping GODOT et lui dire coucou il y a quelqu'un dautre qui vient de se co
                sendWebsocketJSONMessageToGODOT({event: WebsocketEventS2CEnum.COMMUNICATION, data: {status: "ACK"}})
            } else {
                sendWebsocketJSONMessage(ws, {
                    event: WebsocketEventS2CEnum.COMMUNICATION,
                    data: {status: "Communication avec GODOT KO"}
                })
            }
        }
        const messageText = data.toString();
        console.log('[WS EVENT] Received:', messageText);
        try {
            const websocketCommunication: WebsocketCommunicationC2SType = checkWebsocketCommunicationType(messageText)
            handleEvent(websocketCommunication, ws)
        } catch (e) {
            if (ws.readyState === ws.OPEN) {
                ws.send("Le message reçu n'est pas au format attendu.");
            }
            console.log(e)
        }
    } catch (error) {
        console.error('Error processing message:', error);
        sendWebsocketJSONMessage(ws, {event: WebsocketEventS2CEnum.COMMUNICATION, data: {status: "KO"}})
    }
}

/**
 * Traite un événement WebSocket entrant en fonction de son type.
 *
 * Cette fonction reçoit un objet typé `WebsocketCommunicationC2SType` (venant du client)
 * et déclenche le service adapté en fonction de l'événement reçu.
 *
 * - Si l'événement est `MONSTER_BOUGHT`, appelle le service `handleMonsterBoughtEventService`
 *   pour gérer l'achat d'un monstre.
 * - Si l'événement est `MONSTER_KILL`, appelle le service `handleMonsterKillEventService`
 *   pour gérer la suppression/mort d'un monstre.
 * - Si l'événement est `HELLO`, logge simplement l'événement dans la console.
 * - Si l'événement ne correspond à aucun de ces cas, logge un message indiquant
 *   que l'événement n'est pas reconnu.
 *
 * @param websocketCommunicationType - Objet représentant la communication reçue du client,
 * contenant l'événement (`event`) et les éventuelles données associées.
 * @param ws - La connexion WebSocket enrichie de type `ExtendedWebSocket` associée au client
 * expéditeur de l'événement.
 *
 * @remarks
 * - Cette fonction agit comme un **dispatcher d'événements** WebSocket.
 * - Les nouveaux événements doivent être ajoutés ici avec leur traitement
 * spécifique (ex. `handleMonsterUpgradeEventService`).
 *
 * @example
 * ```
 * const communication: WebsocketCommunicationC2SType = {
 *   event: WebsocketEventC2SEnum.MONSTER_BOUGHT,
 *   data: { monsterId: "abc123" }
 * };
 *
 * await handleEvent(communication, ws);
 * ```
 */
async function handleEvent(websocketCommunicationType: WebsocketCommunicationC2SType, ws: ExtendedWebSocket) {

    try {
        const broadcastMessage: WebsocketCommunicationS2CType = {event: WebsocketEventS2CEnum.BROADCAST}

        if (websocketCommunicationType.event === WebsocketEventC2SEnum.MONSTER_BOUGHT) {
            const eventPayload: {
                data: {
                    monsterName: string,
                    userPseudo: string,
                }
            } = await handleMonsterBoughtEventService(websocketCommunicationType, ws)

            broadcastMessage.data = {
                event: websocketCommunicationType.event,
                data: eventPayload.data,
                timestamp: new Date().getTime().toString()
            }
        } else if (websocketCommunicationType.event === WebsocketEventC2SEnum.MONSTER_KILL) {

            const eventPayload = await handleMonsterKillEventService(websocketCommunicationType)
            broadcastMessage.data = {
                event: websocketCommunicationType.event,
                data: eventPayload.data,
                timestamp: new Date().getTime().toString()
            }
        } else if (websocketCommunicationType.event === WebsocketEventC2SEnum.HELLO) {
            console.log(WebsocketEventC2SEnum.HELLO)
        } else {
            console.log("Evenement non reconnu")
        }

        if (C2S_EVENT_TO_BROADCAST.includes(websocketCommunicationType.event)) {
            await broadCastJSONMessage(broadcastMessage);
        }

    } catch (e) {
        console.log("Une erreur est survenue dans handleEvent")
        console.log(e)
    }
}