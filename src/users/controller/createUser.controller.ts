import type { Request, Response } from "express";
import { createUserService } from "../service/createUser.service.js";

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Crée un utilisateur (inscription)
 *     description: Crée un nouvel utilisateur à partir d'un email et d'un pseudo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mail, pseudo]
 *             properties:
 *               mail:
 *                 type: string
 *                 format: email
 *                 example: test@gmail.com
 *               pseudo:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *                 example: bob
 *           examples:
 *             exemple:
 *               value:
 *                 mail: "test@gmail.com"
 *                 pseudo: "bob"
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Requête invalide
 *       409:
 *         description: Email ou pseudo déjà utilisé
 */

export async function createUserController(req: Request, res: Response) {
	try {
		const result = await createUserService(req.body);

		if (result instanceof Error) {
			if (result.message === "Email or pseudo already used") {
				return res.status(409).json({ message: result.message });
			}
			return res.status(400).json({ message: result.message });
		}
		return res.status(201).json(result);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error", error });
	}
}
