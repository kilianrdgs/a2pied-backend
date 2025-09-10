import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";
import cors from "cors";
import { connectMongoose } from "./db/mongo.js";
import swaggerOptions from "./docs/swagger.js";
import globalRouter from "./router.js";
import { createServer } from "node:http";
import { webSocketSetup } from "./websocket/utils/webSocketSetup.js";
import { apiKeyMiddleware } from "./middlewares/apiKey.js";

const app = express();
const server = createServer(app);
const PORT = process.env.PORT;
const FRONT_URL = process.env.FRONT_URL ?? "";

const specs = swaggerJsdoc(swaggerOptions);

app.use(express.json());

app.use(
  cors({
    origin: ["*", FRONT_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", apiKeyMiddleware, globalRouter);

webSocketSetup(server);
connectMongoose()
  .then(() => {
    server.listen(PORT, () => {
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
