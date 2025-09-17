import {Router} from "express";
import mailRouter from "./mails/router.js";
import mobInstancesRouter from "./mobInstances/mobInstance.router.js";
import mobTypesRouter from "./mobTypes/mobTypes.router.js";
import userRouter from "./users/router.js";
import websocketRouter from "./websocket/webSocket.router.js";
import creditsRouter from "./credits/router.js";

const globalRouter = Router();

globalRouter.use("/users", userRouter);

globalRouter.use("/mobTypes", mobTypesRouter);
globalRouter.use("/mobInstances", mobInstancesRouter);
globalRouter.use("/mails", mailRouter);
globalRouter.use("/ws", websocketRouter)
globalRouter.use("/credits", creditsRouter);

export default globalRouter;



