import type {Request, Response} from "express";
import {getMobInstancesService} from "../service/getMobInstances.service.js";
import {logError} from "../../utils/logError.js";

/**
 * @openapi
 * /api/mobInstances:
 *   get:
 *     tags: [MobInstances]
 *     summary: Liste des Instances de Monstre
 *     description: Retourne une liste de Instances de Monstre
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Erreur serveur
 */
export async function getMobInstancesController(_req: Request, res: Response) {
    try {
        const result = await getMobInstancesService();
        return res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}
