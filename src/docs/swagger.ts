// src/config/swaggerOptions.ts
import type { Options } from "swagger-jsdoc";

const NODE_ENV = process.env.NODE_ENV ?? "dev";
const API_URL = process.env.URL_API || "http://localhost:3000";

const swaggerOptions: Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "a2pied API",
			version: "1.0.0",
			description: "API du jeu a2pied",
		},
		servers: NODE_ENV === "dev" ? [{ url: API_URL }] : [{ url: API_URL }],
		components: {
			securitySchemes: {
				ApiKeyAuth: {
					type: "apiKey",
					in: "header",
					name: "x-api-key",
					description: "Clé API requise dans l’en-tête 'x-api-key'.",
				},
			},
		},
		security: [{ ApiKeyAuth: [] }],
	},
	apis: ["./src/**/*.ts"],
};

export default swaggerOptions;
