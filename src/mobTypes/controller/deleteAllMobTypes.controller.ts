import type { Request, Response } from "express";
import { logError } from "../../utils/logError.js";
import { deleteAllMobTypesService } from "../service/deleteAllMobTypes.service.js";

/**
 * @openapi
 * /api/mobTypes/allMobTypes:
 *   delete:
 *     tags: [MobTypes]
 *     summary: Supprime tous les types de monstre
 *     description: Supprime l'ensemble des types de monstre de la base.
 *     responses:
 *       204:
 *         description: Tous les types de monstre ont été supprimés (aucun contenu).
 *       200:
 *         description: Tous les types de monstre ont été supprimés (avec un résumé).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: integer
 *                   example: 8
 *       500:
 *         description: Erreur serveur
 */

export async function deleteAllMobTypesController(
	_req: Request,
	res: Response,
) {
	try {
		const result = await deleteAllMobTypesService();
		res.status(200).json(result);
	} catch (error) {
		logError(error);
		return res.status(500).json({ message: "Internal server error", error });
	}
}
