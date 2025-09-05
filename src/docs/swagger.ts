import type { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "a2pied API",
			version: "1.0.0",
			description: "API du jeu a2pied",
		},
		servers: [{ url: process.env.URL_API }],
	},
	apis: ["./src/**/*.ts"],
};

export default swaggerOptions;
