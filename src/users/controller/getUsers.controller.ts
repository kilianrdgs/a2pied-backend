import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {getUserByMailService, getUsersService} from "../service/getUsers.service.js";

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Liste des utilisateurs (panel/admin)
 *     description: Retourne une liste d'utilisateurs de démonstration.
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Erreur serveur
 */

export async function getUsersController(_req: Request, res: Response) {
    try {
        const result = await getUsersService();
        return res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}

/**
 * @swagger
 * /api/users/{mail}:
 *   get:
 *     summary: Récupérer un utilisateur par son email
 *     description: Retourne les informations d'un utilisateur correspondant à l'email fourni en paramètre de route.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: mail
 *         required: true
 *         schema:
 *           type: string
 *         description: L'adresse email de l'utilisateur à récupérer
 *     responses:
 *       200:
 *         description: Utilisateur trouvé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               # Exemple minimal, adapte avec ton modèle user
 *               properties:
 *                 mail:
 *                   type: string
 *                   example: "user@example.com"
 *                 pseudo:
 *                   type: string
 *                   example: "MonPseudo"
 *                 credits:
 *                   type: number
 *                   example: 100
 *                 upgrades:
 *                   type: array
 *                   items:
 *                     type: string
 *         # Tu peux ajouter un exemple si tu utilises swagger-ui
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

export async function getUserController(_req: Request, res: Response) {
    try {
        const result = await getUserByMailService(_req.params.mail);
        return res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}

