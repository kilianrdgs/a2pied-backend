import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";
import cors from "cors";
import {connectMongoose} from "./db/mongo.js";
import swaggerOptions from "./docs/swagger.js";
import globalRouter from "./router.js";
import {createServer} from "node:http";
import {webSocketSetup} from "./websocket/utils/webSocketSetup.js";
import statusMonitor from 'express-status-monitor';

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
        allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    }),
);

app.get("/", (req, res) => {
    res.send("ok");
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api",
    //todo : Reactiver lorsque le wrapper de fetch est fait en front
    /*apiKeyMiddleware,*/
    globalRouter);
webSocketSetup(server);

app.use(statusMonitor({path: '/status'}));

app.get('/status-ws', (_req, res) => {
    res.type('html').send(`
    <html lang="fr"><body style="font-family:system-ui">
      <h3>WebSocket & Proc</h3>
       <div>WS clients count: <span id="ws_count">...</span></div>
      <div>WS clients mail: <span id="ws_mail">...</span></div>
      <div>RAM (RSS): <span id="mem">......</span></div>
      <div >Uptime: <span id="up">...</span></div>
      <script>
        async function tick(){
          const r = await fetch('/api/ws/status-data'); 
          const d = await r.json();
          document.getElementById('ws_mail').textContent = d.ws_clients_mail;
          document.getElementById('ws_count').textContent = d.ws_clients_count;
          document.getElementById('mem').textContent =  d.rss_mb + ' MB';
          document.getElementById('up').textContent =  + d.uptime_s + ' s';
        }
        tick(); 
        setInterval(tick, 1000);
      </script>
    </body></html>
  `);
});

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
