import { Router } from "express";
import mailRouter from "./mails/router.js";
import userRouter from "./users/router.js";

const globalRouter = Router();

globalRouter.use("/users", userRouter);
globalRouter.use("/mails", mailRouter);

export default globalRouter;
