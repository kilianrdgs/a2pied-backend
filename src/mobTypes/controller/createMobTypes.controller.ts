import {logError} from "../../utils/logError.js";
import type {Request, Response} from "express";
import {createMobTypesService} from "../service/createMobTypes.service.js";

/**
 * @openapi
 * /api/mobtypes:
 *   post:
 *     tags: [MobTypes]
 *     summary: Crée un Type de monstre
 *     description: Crée un nouveau Type de monstre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [cost,name,life,damage]
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
 *                   name: MonMonstre
 *                   cost: 250
 *                   damage: 10
 *                   life: 50
 *     responses:
 *       201:
 *         description: Type de monstre créé
 *       500:
 *          description: Erreur interne
 *
 */
export async function createMobTypesController(req: Request, res: Response) {
    try {
        const result = await createMobTypesService(req.body);
        return res.status(201).json(result);
    } catch (error: unknown) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}