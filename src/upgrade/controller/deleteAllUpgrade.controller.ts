import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {deleteAllUpgradesService} from "../service/deleteAllUpgrades.service.js";

/**
 * @swagger
 * /api/upgrades/all:
 *   delete:
 *     summary: Supprimer tous les upgrades
 *     description: Supprime l'ensemble des enregistrements d'upgrades.
 *     tags:
 *       - Upgrades
 *     responses:
 *       200:
 *         description: Tous les upgrades ont été supprimés avec succès
 *       500:
 *         description: Erreur interne du serveur
 */

export async function deleteAllUpgradeController(_req: Request, res: Response) {
    try {
        const result = await deleteAllUpgradesService();
        res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}
