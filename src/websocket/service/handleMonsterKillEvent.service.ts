import {sendWebsocketJSONMessageToMailWebsocket} from "../utils/sendWebsocketJSONMessage.js";
import {WebsocketCommunicationC2SType} from "../type/WebsocketCommunicationC2SType.js";
import {getMobInstanceByIdPopulated} from "../../mobInstances/service/getMobInstances.service.js";
import {WebsocketEventS2CEnum} from "../type/WebsocketCommunicationS2CType.js";
import {checkSendMailGauge} from "../../mails/service/sendMail.service.js";
import {deleteMobInstanceService} from "../../mobInstances/service/deleteMobInstance.service.js";
import {monsterKillGameStateUpdate} from "../../game/gameState.js";
import {CheckSendMailPayloadType} from "../../mails/CheckSendMailPayload.type.js";

/**
 * Gère l'événement `MONSTER_KILL` envoyé par un client WebSocket (le serveur de jeu).
 *
 * Cette fonction :
 * - Extrait `mobInstanceId` depuis `websocketCommunicationType.data` et vérifie qu'il s'agit d'une chaîne. [6][4]
 * - Récupère l'instance de monstre enrichie (utilisateur et type) via `getMobInstanceByIdPopulated`. [6][4]
 * - Envoie un email à l'utilisateur propriétaire du monstre via `sendMailService`. [6][4]
 * - Supprime l'instance du monstre via `deleteMobInstanceService`. [6][4]
 * - Tente de retrouver la WebSocket de l'utilisateur et, si disponible, lui envoie l'événement `MONSTER_KILL` avec le `mobType`. [6][4]
 * - Si la WebSocket de l'utilisateur n'est pas trouvée, lève une erreur explicite. [6][4]
 *
 * @param websocketCommunicationType - Message C2S contenant l'événement et les données, incluant `mobInstanceId` en tant que chaîne. [6][4]
 *
 * @throws Error - Si `mobInstanceId` n'est pas une chaîne, si l'utilisateur n'est pas résolu, ou si la WebSocket cible de l'utilisateur est introuvable. [6][4]
 *
 * @remarks
 * - Cette fonction ne répond pas directement à l'émetteur; elle notifie le propriétaire du monstre via sa WebSocket si elle est disponible. [6][4]
 * - Pour une documentation cohérente, commentez les services appelés (email, delete, lookup WebSocket) avec TSDoc afin de faciliter la génération automatique via TypeDoc/TSDoc. [6][15]
 *
 * @example
 * ```
 * const msg: WebsocketCommunicationC2SType = {
 *   event: WebsocketEventC2SEnum.MONSTER_KILL,
 *   data: { mobInstanceId: "650f0c..." }
 * };
 * await handleMonsterKillEventService(msg);
 * // Effets: email envoyé, mob supprimé, notification MONSTER_KILL envoyée à l'utilisateur propriétaire si connecté.
 * ```
 */
export async function handleMonsterKillEventService(websocketCommunicationType: WebsocketCommunicationC2SType) {
    const {mobInstanceId} = websocketCommunicationType.data
    if (typeof mobInstanceId === "string") {
        const mobInstance = await getMobInstanceByIdPopulated(mobInstanceId)
        const {user, mobType} = mobInstance
        const checkSendMailPayload: CheckSendMailPayloadType = await checkSendMailGauge(user);
        await deleteMobInstanceService({id: mobInstanceId})
        monsterKillGameStateUpdate()
        sendWebsocketJSONMessageToMailWebsocket(user.mail, {
            event: WebsocketEventS2CEnum.MONSTER_KILL,
            data: {
                mobType,
                mailTriggerGauge: checkSendMailPayload.user.mailTriggerGauge.toString(),
                isGaugeFull: checkSendMailPayload.isGaugeFull
            }
        })
        return {data: {monsterName: mobType.name, userPseudo: user.pseudo}}
    }
    throw new Error("Erreur dans handleMonsterKillEventService")
}