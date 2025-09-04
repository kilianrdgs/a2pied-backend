import { Router } from "express";
import userRouter from "./users/router.js";
const globalRouter = Router();
globalRouter.use("/users", userRouter);
export default globalRouter;
