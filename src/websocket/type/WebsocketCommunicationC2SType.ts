/**
 * Enumération des événements WebSocket reçus côté serveur (C2S : Client → Serveur).
 *
 * Chaque valeur représente un type d'événement que le client peut émettre.
 */
export enum WebsocketEventC2SEnum {
    /**
     * Événement émis lorsqu'un joueur achète un monstre.
     * ➝ Déclenche le service `handleMonsterBoughtEventService`.
     */
    MONSTER_BOUGHT = "MONSTER_BOUGHT",

    /**
     * Événement émis lorsqu'un joueur tue un monstre.
     * ➝ Déclenche le service `handleMonsterKillEventService`.
     */
    MONSTER_KILL = "MONSTER_KILL",

    /**
     * Événement simple de test/d'initialisation de communication.
     * ➝ Actuellement loggé uniquement côté serveur.
     */
    HELLO = "HELLO"
}

/**
 * Structure d'une communication WebSocket du client vers le serveur (C2S).
 *
 * Chaque message doit comporter :
 * - un champ `event` indiquant le type d'événement envoyé par le client,
 * - un champ `data` contenant les informations associées sous forme d'objet flexible.
 */
export type WebsocketCommunicationC2SType = {
    /**
     * Type d'événement déclenché par le client (défini dans `WebsocketEventC2SEnum`).
     */
    event: WebsocketEventC2SEnum,

    /**
     * Données associées à l'événement.
     * Peut être une map clé/valeur simple, une structure imbriquée,
     * ou un tableau de chaînes de caractères.
     *
     * Exemple :
     * ```
     * {
     *   "event": "MONSTER_BOUGHT",
     *   "data": { "monsterId": "abc123" }
     * }
     * ```
     */
    data: Record<string, string | Record<string, string> | string[]>
}
