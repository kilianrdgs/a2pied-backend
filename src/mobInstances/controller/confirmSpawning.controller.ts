import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {confirmSpawningService} from "../service/confirmSpawning.service.js";


/**
 * @openapi
 * /api/mobinstances/confirmSpawn:
 *   post:
 *     tags: [MobInstances]
 *     summary: Route pour confirmer le spawn de monstres
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ids]
 *             properties:
 *              ids:
 *                  type: array
 *                  items:
 *                      type: objectId
 *                      example: "507f191e810c19729de860ea"
 *           examples:
 *              examples:
 *              exemple:
 *                value:
 *                  ids:
 *                    - "507f191e810c19729de860ea"
 *                    - "68b995db98069c57dd3bd7ca"
 *     responses:
 *       200:
 *         description: Liste à jour
 *       500:
 *          description: Erreur interne
 *
 */

export async function confirmSpawningController(req: Request, res: Response) {
    try {
        const result = await confirmSpawningService(req.body);
        return res.status(201).json(result);
    } catch (error: unknown) {
        logError(error);
        return error instanceof Error ? res.status(500).json({message: error.message,}) : res.status(500).json({message: "Internal Server Error"});
    }
}
