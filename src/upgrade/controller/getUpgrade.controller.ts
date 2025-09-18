import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {getAvailablesUpgradeForUserService, getUserUpgradeService} from "../service/getUpgrade.service.js";

/**
 * @openapi
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

/**
 * @openapi
 * /api/upgrades/available/{email}:
 *   get:
 *     summary: Récupère la liste des upgrades disponibles
 *     description: Ce endpoint permet de récupérer toutes les upgrades actuellement disponibles pour un utilisateur. Il appelle la fonction getAvailablesUpgradeService pour obtenir ces données.
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
 *         description: Liste des upgrades récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Le nom de l'upgrade
 *                     example: AUTO_CREDIT
 *                   level:
 *                     type: integer
 *                     description: Niveau actuel de l'upgrade
 *                     example: 2
 *       500:
 *         description: Erreur serveur interne
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 error:
 *                   type: object
 */

export async function getAvailablesUpgradesForUserController(_req: Request, res: Response) {
    try {
        const email = _req.params.email;
        const result = await getAvailablesUpgradeForUserService(email);
        return res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}

