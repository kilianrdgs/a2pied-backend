import express from "express";
import {getWebsocketStatusData} from "./controller/websocketStatus.controller.js";

const websocketRouter = express.Router();
websocketRouter.get("/status-data", getWebsocketStatusData);

export default websocketRouter;
