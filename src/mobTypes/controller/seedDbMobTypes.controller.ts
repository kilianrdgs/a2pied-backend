import {seedDbMobTypesService} from "../service/seedDbMobTypes.service.js";
import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";

/**
 * @openapi
 * /api/mobtypes/seeddb:
 *   post:
 *     tags: [MobTypes]
 *     summary: Crée un Type de monstre
 *     description: Crée un nouveau Type de monstre
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             item : object
 *             properties:
 *               cost:
 *                 type: string
 *                 example: 50
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *                 example: bob
 *               life:
 *                 type: string
 *                 example: 75
 *               damage:
 *                  type: number
 *                  example: 5
 *           examples:
 *             exemple:
 *               value:
 *                 - name: dog
 *                   cost: 250
 *                   damage: 10
 *                   life: 50
 *                 - name: snail
 *                   cost: 250
 *                   damage: 10
 *                   life: 50
 *     responses:
 *       201:
 *         description: Type de monstre créé
 *       500:
 *          description: Erreur interne
 */
export async function seedDbMobTypesController(req: Request, res: Response) {
    try {
        const result = await seedDbMobTypesService(req.body);
        return res.status(201).json(result);
    } catch (error: unknown) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}
