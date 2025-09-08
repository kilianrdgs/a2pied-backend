import express from "express";
import {getMobTypeByNameController, getMobTypesController} from "./controller/getMobTypes.controller.js";
import {createMobTypesController} from "./controller/createMobTypes.controller.js";
import {deleteAllMobTypesController} from "./controller/deleteAllMobTypes.controller.js";
import {deleteMobTypesController} from "./controller/deleteMobTypes.controller.js";


const mobTypesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour la gestion des utilisateurs
 */

mobTypesRouter.get("/", getMobTypesController);
mobTypesRouter.get("/:name", getMobTypeByNameController);
mobTypesRouter.post("/", createMobTypesController);
mobTypesRouter.delete("/allMobTypes", deleteAllMobTypesController);
mobTypesRouter.delete("/", deleteMobTypesController);

export default mobTypesRouter;
