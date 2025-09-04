import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import "dotenv/config";
import swaggerOptions from "./docs/swagger.js";

const app = express();
const PORT = process.env.PORT;

const specs = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/health", (_req, res) => {
	res.json({ ok: true });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
