import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {deleteMobInstanceService} from "../service/deleteMobInstance.service.js";

/**
 * @openapi
 * /api/mobInstances/:
 *   delete:
 *     tags: [MobInstances]
 *     summary: Supprime une instance monstre par son id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "507f191e810c19729de860ea"
 *           examples:
 *             exemple:
 *               value:
 *                 name: "507f191e810c19729de860ea"
 *     responses:
 *       204:
 *         description: Supprimé (aucun contenu)
 *       400:
 *         description: nom invalide
 *       404:
 *         description: type de monstre introuvable
 */
export async function deleteMobInstancesController(req: Request, res: Response) {
    try {
        const result = await deleteMobInstanceService(req.body);
        res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}
