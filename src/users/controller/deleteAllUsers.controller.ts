import type {Request, Response} from "express";
import {deleteAllUsersService} from "../service/deleteAllUsers.service.js";
import {logError} from "../../utils/logError.js";

/**
 * @openapi
 * /api/users/allUsers:
 *   delete:
 *     tags: [Users]
 *     summary: Supprime tous les utilisateurs (Fin de partie)
 *     description: Supprime l'ensemble des utilisateurs de la base.
 *     responses:
 *       204:
 *         description: Tous les utilisateurs ont été supprimés (aucun contenu).
 *       200:
 *         description: Tous les utilisateurs ont été supprimés (avec un résumé).
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

export async function deleteAllUsersController(_req: Request, res: Response) {
    try {
        const result = await deleteAllUsersService();
        res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}
