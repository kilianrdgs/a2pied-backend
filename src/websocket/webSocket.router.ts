import express from "express";
import {getWebsocketStatusData, resetGameStateController} from "./controller/websocketStatus.controller.js";

const websocketRouter = express.Router();
websocketRouter.get("/status-data", getWebsocketStatusData);
websocketRouter.get("/reset-game-state", resetGameStateController);

export default websocketRouter;
