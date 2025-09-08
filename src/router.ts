import { Router } from "express";
import mailRouter from "./mails/router.js";
import userRouter from "./users/router.js";
import mobTypesRouter from "./mobTypes/mobTypes.router.js";

const globalRouter = Router();

globalRouter.use("/users", userRouter);
globalRouter.use("/mobTypes", mobTypesRouter);
globalRouter.use("/mails", mailRouter);

export default globalRouter;
