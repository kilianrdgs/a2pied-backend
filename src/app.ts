import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import "dotenv/config";
import cors from "cors";
import { connectMongo } from "./db/mongo.js";
import swaggerOptions from "./docs/swagger.js";
import globalRouter from "./router.js";

const app = express();
const PORT = process.env.PORT;

const specs = swaggerJsdoc(swaggerOptions);

app.use(express.json());

app.use(
	cors({
		origin: ["*"],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", globalRouter);

connectMongo()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`🚀 API running at http://localhost:${PORT}`);
			console.log("--------------------------------");
			console.log(`📖 Swagger UI at http://localhost:${PORT}/doc`);
			console.log("--------------------------------");
		});
	})
	.catch((e) => {
		console.error("❌ Failed to start server:", e);
		process.exit(1);
	});
