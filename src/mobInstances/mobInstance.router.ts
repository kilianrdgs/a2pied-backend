import express from "express";
import {getMobInstancesController} from "./controller/getMobInstances.controller.js";
import {
    createMobInstanceRandomController,
    createMobInstancesController
} from "./controller/createMobInstance.controller.js";
import {deleteMobInstancesController} from "./controller/deleteMobInstance.controller.js";
import {getMobInstancesToSpawnController} from "./controller/getMobInstancesToSpawn.controller.js";

const mobInstancesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: MobInstances
 *   description: API pour la gestion des instances de monstre
 */

mobInstancesRouter.get("/", getMobInstancesController);
mobInstancesRouter.get("/spawninglist", getMobInstancesToSpawnController);
mobInstancesRouter.delete("/:name", deleteMobInstancesController);
mobInstancesRouter.post("/", createMobInstancesController)
mobInstancesRouter.post("/random", createMobInstanceRandomController)

export default mobInstancesRouter