import express from "express";
import {createUpgradeController} from "./controller/createUpgrade.controller.js";
import {deleteAllUpgradeController} from "./controller/deleteAllUpgrade.controller.js";
import {
    getAvailablesUpgradesForUserController,
    getUserUpgradeControllerntroller
} from "./controller/getUpgrade.controller.js";
import {updateUpgradeController} from "./controller/updateUpgrade.controller.js";

const upgradeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Upgrades
 *   description: API pour la gestion des Upgrades
 */
upgradeRouter.post("/", createUpgradeController);
upgradeRouter.get("/:email", getUserUpgradeControllerntroller);
upgradeRouter.get("/available/:email", getAvailablesUpgradesForUserController);
upgradeRouter.put("/", updateUpgradeController);
upgradeRouter.delete("/all", deleteAllUpgradeController);

export default upgradeRouter;
