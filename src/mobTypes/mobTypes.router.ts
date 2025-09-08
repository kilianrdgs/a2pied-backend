import express from "express";
import {getMobTypeByNameController, getMobTypesController} from "./controller/getMobTypes.controller.js";
import {createMobTypesController} from "./controller/createMobTypes.controller.js";


const mobTypesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour la gestion des utilisateurs
 */

mobTypesRouter.get("/", getMobTypesController);
mobTypesRouter.get("/findByName", getMobTypeByNameController);
mobTypesRouter.post("/", createMobTypesController);

export default mobTypesRouter;
