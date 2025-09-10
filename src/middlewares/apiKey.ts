import type { NextFunction, Request, Response } from "express";

const API_KEY = process.env.API_KEY || "default_secret_key";

export function apiKeyMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	if (process.env.ENV === "DEV") {
		next();
		return;
	}

	const apiKey = req.headers["x-api-key"];
	if (!apiKey) {
		res.status(401).json({ message: "Clé API requise" });
		return;
	}

	if (apiKey !== API_KEY) {
		res.status(403).json({ message: "Clé API invalide" });
		return;
	}

	next();
}
