import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {getMobInstancesToSpawnService} from "../service/getMobInstancesToSpawn.service.js";

/**
 * @openapi
 * /api/mobInstances/spawninglist:
 *   get:
 *     tags: [MobInstances]
 *     summary: Liste les instances de Monstre à faire spawner
 *     description: Retourne une liste d'instances de Monstre
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Erreur serveur
 */
export async function getMobInstancesToSpawnController(_req: Request, res: Response) {
    try {
        const result = await getMobInstancesToSpawnService();
        return res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}