/**
 * @openapi
 * /api/mails/threshold:
 *   get:
 *     tags: [Mails]
 *     summary: Seuil de monstre à atteindre
 *     description: Récupère le seuil de monstre à atteindre pour déclencher l'envoi de mail
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Erreur serveur
 */
import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {getMailTriggerThresholdService} from "../service/getMailTriggerThreshold.service.js";


export async function getMailTriggerThresholdController(_req: Request, res: Response) {
    try {
        const result = getMailTriggerThresholdService();
        return res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}