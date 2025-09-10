import {logError} from "../../utils/logError.js";
import type {Request, Response} from "express";
import {createMobInstanceRandomService, createMobInstancesService} from "../service/createMobInstance.service.js";

/**
 * @openapi
 * /api/mobinstances:
 *   post:
 *     tags: [MobInstances]
 *     summary: Crée une instance de monstre
 *     description: Crée une nouvelle instance de monstre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user,mobtype]
 *             properties:
 *               user:
 *                 type: objectId
 *                 example: "507f191e810c19729de860ea"
 *               mobType:
 *                 type: objectId
 *                 example: "507f191e810c19729de860ea"
 *           examples:
 *             exemple:
 *               value:
 *                   user: 507f191e810c19729de860ea
 *                   mobType: 507f191e810c19729de860eb
 *     responses:
 *       201:
 *         description: Instance de monstre créé
 *       500:
 *          description: Erreur interne
 *
 */
export async function createMobInstancesController(req: Request, res: Response) {
    try {
        const result = await createMobInstancesService(req.body);
        return res.status(201).json(result);
    } catch (error: unknown) {
        logError(error);
        return error instanceof Error ? res.status(500).json({message: error.message,}) : res.status(500).json({message: "Internal Server Error"});
    }
}

/**
 * @openapi
 * /api/mobinstances/random:
 *   post:
 *     tags: [MobInstances]
 *     summary: Crée une instance de monstre random
 *     description: Crée une nouvelle instance de monstre random
 *     responses:
 *       201:
 *         description: Instance de monstre créé
 *       500:
 *          description: Erreur interne
 *
 */
export async function createMobInstanceRandomController(req: Request, res: Response) {
    try {
        const result = await createMobInstanceRandomService();
        return res.status(201).json(result);
    } catch (error: unknown) {
        logError(error);
        return error instanceof Error ? res.status(500).json({message: error.message,}) : res.status(500).json({message: "Internal Server Error"});
    }
}