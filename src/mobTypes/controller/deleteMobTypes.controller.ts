import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {deleteMobTypesSevice} from "../service/deleteMobTypes.sevice.js";

/**
 * @openapi
 * /api/mobTypes/:
 *   delete:
 *     tags: [MobTypes]
 *     summary: Supprime un type de monstre par son nom
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: MonMonstre
 *           examples:
 *             exemple:
 *               value:
 *                 name: "MonMonstre"
 *     responses:
 *       204:
 *         description: Supprimé (aucun contenu)
 *       400:
 *         description: nom invalide
 *       404:
 *         description: type de monstre introuvable
 */
export async function deleteMobTypesController(req: Request, res: Response) {
    try {
        const result = await deleteMobTypesSevice(req.body);
        res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}
