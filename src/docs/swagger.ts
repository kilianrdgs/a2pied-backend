import type {Options} from "swagger-jsdoc";

const NODE_ENV = process.env.NODE_ENV ?? "dev"
const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "a2pied API",
            version: "1.0.0",
            description: "API du jeu a2pied",
        },
        servers: NODE_ENV === "dev" ? [] : [{url: process.env.URL_API}],
    },
    apis: ["./src/**/*.ts"],
};

export default swaggerOptions;
