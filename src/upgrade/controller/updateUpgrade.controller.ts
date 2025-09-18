import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {updateUpgradeService} from "../service/updateUpgrade.service.js";

/**
 * @swagger
 * /api/upgrades:
 *   put:
 *     summary: Mettre à jour un upgrade
 *     description: Met à jour les informations d'un objet Upgrade existant à partir des données envoyées dans le body.
 *     tags:
 *       - Upgrades
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               upgradeId:
 *                 type: string
 *                 example: "64ff12345ab67c89d012ef34"
 *               level:
 *                 type: number
 *                 example: 2
 *             required:
 *               - upgradeId
 *               - level
 *     responses:
 *       200:
 *         description: L'upgrade a été mis à jour avec succès
 *       404:
 *         description: Upgrade introuvable
 *       500:
 *         description: Erreur interne du serveur
 */
export async function updateUpgradeController(req: Request, res: Response) {
    try {
        const result = await updateUpgradeService(req.body);
        res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}
