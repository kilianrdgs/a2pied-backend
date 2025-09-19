import express from "express";
import {createUserController} from "./controller/createUser.controller.js";
import {deleteAllUsersController} from "./controller/deleteAllUsers.controller.js";
import {deleteUserController} from "./controller/deleteUser.controller.js";
import {getUserController, getUsersController} from "./controller/getUsers.controller.js";
import {addCreditToUsersController} from "./controller/addCreditToUsers.controller.js";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour la gestion des utilisateurs
 */

userRouter.get("/", getUsersController);
userRouter.get("/:mail", getUserController);
userRouter.post("/", createUserController);
userRouter.delete("/allUsers", deleteAllUsersController);
userRouter.delete("/:objectId", deleteUserController);
userRouter.post("/addCreditToUsers", addCreditToUsersController);

export default userRouter;
