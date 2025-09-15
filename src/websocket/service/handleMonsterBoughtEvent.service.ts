import {WebsocketCommunicationC2SType} from "../type/WebsocketCommunicationC2SType.js";
import {ExtendedWebSocket} from "../type/websocketState.js";
import {sendWebsocketJSONMessage, sendWebsocketJSONMessageToGODOT} from "../utils/sendWebsocketJSONMessage.js";
import {WebsocketEventS2CEnum} from "../type/WebsocketCommunicationS2CType.js";
import {createMobInstanceServiceWithNameAndEmail} from "../../mobInstances/service/createMobInstance.service.js";
import {getMobInstanceByIdPopulated} from "../../mobInstances/service/getMobInstances.service.js";

/**
 * Gère l'événement `MONSTER_BOUGHT` envoyé par un client WebSocket.
 *
 * Cette fonction est responsable de :
 * - Extraire les informations nécessaires (nom du monstre et email utilisateur)
 *   depuis l'objet de communication reçu.
 * - Créer une nouvelle instance de monstre associée à l'utilisateur via
 *   `createMobInstanceServiceWithNameAndEmail`.
 * - Récupérer l'instance enrichie (mobType et user) à l'aide de
 *   `getMobInstanceByIdPopulated`.
 * - Notifier le client **Godot** qu'un nouveau monstre a été généré
 *   en envoyant un événement `MONSTER_SPAWN`.
 * - Répondre au client émetteur (web) avec un accusé de communication
 *   contenant le nom du monstre et l'email de l'utilisateur.
 *
 * @param websocketCommunicationType - La structure de communication C2S envoyée
 * par le client, contenant les données nécessaires (`monsterName`, `userEmail`).
 * @param ws - La connexion WebSocket enrichie (`ExtendedWebSocket`) représentant
 * le client émetteur de l'action.
 *
 * @remarks
 * - Nécessite que le champ `monsterName` et `userEmail` soient bien transmis dans `data`.
 * - En cas de succès, deux messages sont envoyés :
 *   - vers **Godot** (`MONSTER_SPAWN` avec infos du mob et de l'utilisateur),
 *   - vers le **client émetteur** (`COMMUNICATION` confirmant la génération).
 *
 * @example
 * ```
 * const message: WebsocketCommunicationC2SType = {
 *   event: WebsocketEventC2SEnum.MONSTER_BOUGHT,
 *   data: { monsterName: "Goblin", userEmail: "player@example.com" }
 * };
 *
 * await handleMonsterBoughtEventService(message, ws);
 * // Résultat : un monstre "Goblin" lié à player@example.com est créé,
 * // Godot reçoit un MONSTER_SPAWN, et le client reçoit un accusé.
 * ```
 */
export async function handleMonsterBoughtEventService(websocketCommunicationType: WebsocketCommunicationC2SType, ws: ExtendedWebSocket): Promise<{
    data: {
        monsterName: string,
        userPseudo: string,
    }
}> {
    const {monsterName, userEmail} = websocketCommunicationType.data
    const mobInstance = await createMobInstanceServiceWithNameAndEmail({
        monsterName: monsterName as string,
        userEmail: userEmail as string
    })


    const mobInstancePopulated = await getMobInstanceByIdPopulated(mobInstance._id.toString())
    console.log(`[GAME] Monster ${monsterName} bought by ${userEmail} id: ${mobInstancePopulated._id.toString()}`)

    sendWebsocketJSONMessageToGODOT({
        event: WebsocketEventS2CEnum.MONSTER_SPAWN,
        data: {
            mobType: mobInstancePopulated.mobType,
            user: mobInstancePopulated.user,
            mobInstanceId: mobInstancePopulated._id.toString()
        }
    })
    sendWebsocketJSONMessage(ws, {
        event: WebsocketEventS2CEnum.COMMUNICATION,
        data: {
            monsterName: monsterName as string,
            userEmail: userEmail as string,
            info: `${monsterName} spawned by ${userEmail}`
        }
    })

    return {
        data: {
            monsterName: monsterName as string,
            userPseudo: mobInstancePopulated.user.pseudo,
        }
    }
}