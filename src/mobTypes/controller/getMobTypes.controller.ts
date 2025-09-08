import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {getMobTypeByNameService, getMobTypesService} from "../service/getMobTypes.service.js";

/**
 * @openapi
 * /api/mobTypes:
 *   get:
 *     tags: [MobTypes]
 *     summary: Liste des types de Monstre
 *     description: Retourne une liste de types de Monstre
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Erreur serveur
 */

export async function getMobTypesController(_req: Request, res: Response) {
    try {
        const result = await getMobTypesService();
        return res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}


/**
 * @openapi
 * /api/mobTypes/{name}:
 *   get:
 *     tags: [MobTypes]
 *     summary: Retrouve un type de monstre par son nom
 *     description: Retourne un type de monstre
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: "monMonstre"
 *
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Erreur serveur
 */
export async function getMobTypeByNameController(_req: Request, res: Response) {
    try {
        const mobTypeName = _req.params.name
        const result = await getMobTypeByNameService(mobTypeName);
        return res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}
