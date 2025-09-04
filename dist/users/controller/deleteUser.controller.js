import { deleteUserService } from "../service/deleteUser.service.js";
/**
 * @openapi
 * /api/users/{objectId}:
 *   delete:
 *     tags: [Users]
 *     summary: Supprime un utilisateur par son ObjectId
 *     parameters:
 *       - in: path
 *         name: objectId           # ⬅️ même nom que dans l'URL
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *           example: "68b995db98069c57dd3bd7ca"
 *     responses:
 *       204:
 *         description: Supprimé (aucun contenu)
 *       400:
 *         description: Id invalide
 *       404:
 *         description: Utilisateur introuvable
 */
export async function deleteUserController(req, res) {
    try {
        const result = await deleteUserService(req.params.objectId);
        res.json(result === 1 ? res.sendStatus(204) : res.sendStatus(404));
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}
