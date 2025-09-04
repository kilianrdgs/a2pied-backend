import type { Options } from "swagger-jsdoc";

const PORT = process.env.PORT || 3000;

const swaggerOptions: Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "a2pied API",
			version: "1.0.0",
			description: "API du jeu a2pied",
		},
		servers: [
			{
				url: `http://localhost:${PORT}`,
			},
		],
	},
	apis: ["./src/routes/**/*.ts"],
};

export default swaggerOptions;
