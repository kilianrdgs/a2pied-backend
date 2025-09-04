import { getUsersService } from "../service/getUsers.service.js";
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
export async function getUsersController(_req, res) {
    try {
        const result = await getUsersService();
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}
