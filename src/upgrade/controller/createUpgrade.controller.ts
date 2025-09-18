import {createUpgradeService} from "../service/createUpgrade.service.js";
import {logError} from "../../utils/logError.js";
import type {Request, Response} from "express";

/**
 * @swagger
 * /api/upgrades:
 *   post:
 *     summary: Créer un nouvel upgrade
 *     description: Crée un nouvel objet Upgrade avec les informations fournies dans le body.
 *     tags:
 *       - Upgrades
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "AUTO_CREDIT"
 *               userEmail:
 *                 type: string
 *                 example: "moi@edu.esiee-it.fr"
 *             required:
 *               - name
 *               - userEmail
 *     responses:
 *       201:
 *         description: Upgrade créé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */

export async function createUpgradeController(req: Request, res: Response) {
    try {
        const result = await createUpgradeService(req.body);
        return res.status(201).json(result);
    } catch (error: unknown) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}
