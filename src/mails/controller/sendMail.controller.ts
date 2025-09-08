import type { Request, Response } from "express";

import { logError } from "../../utils/logError.js";
import { sendMailService } from "../service/sendMail.service.js";

/**
 * @openapi
 * /api/mails:
 *   post:
 *     tags: [Mails]
 *     summary: envoyer un mail
 *     description: Envoie un mail à partir d'un email et d'un pseudo.
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

export async function sendMailController(req: Request, res: Response) {
	try {
		const result = await sendMailService(req.body);
		return res.status(201).json(result);
	} catch (error: unknown) {
		logError(error);
		return res.status(500).json({ message: "Internal server error", error });
	}
}
