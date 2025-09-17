import express from "express";
import {sendMailController} from "./controller/sendMail.controller.js";
import {getMailTriggerThresholdController} from "./controller/getMailTriggerThreshold.controller.js";

const mailRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mails
 *   description: API pour la gestion des mails
 */

mailRouter.post("/", sendMailController);
mailRouter.get("/threshold", getMailTriggerThresholdController);

export default mailRouter;
