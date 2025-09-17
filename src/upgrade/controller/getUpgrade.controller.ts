import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {getUserUpgradeService} from "../service/getUpgrade.service.js";

/**
 * @swagger
 * /api/upgrades/{email}:
 *   get:
 *     summary: Récupérer l'upgrade d'un utilisateur
 *     description: Retourne les informations d'upgrade associées à l'email fourni en paramètre.
 *     tags:
 *       - Upgrades
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: L'adresse email de l'utilisateur
 *     responses:
 *       200:
 *         description: Informations de l'upgrade utilisateur
 *       404:
 *         description: Aucun upgrade trouvé pour cet utilisateur
 *       500:
 *         description: Erreur interne du serveur
 */

export async function getUserUpgradeControllerntroller(_req: Request, res: Response) {
    try {
        const userEmail = _req.params.email
        const result = await getUserUpgradeService(userEmail);
        return res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}
