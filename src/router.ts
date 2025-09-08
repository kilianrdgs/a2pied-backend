import {Router} from "express";
import userRouter from "./users/router.js";
import mobTypesRouter from "./mobTypes/mobTypes.router.js";

const globalRouter = Router();

globalRouter.use("/users", userRouter);
globalRouter.use("/mobTypes", mobTypesRouter);

export default globalRouter;
