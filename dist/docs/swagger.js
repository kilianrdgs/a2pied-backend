const PORT = process.env.PORT || 3000;
const swaggerOptions = {
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
    apis: ["./src/**/*.ts"],
};
export default swaggerOptions;
