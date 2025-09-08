import express from "express";
import { sendMailController } from "./controller/sendMail.controller.js";

const mailRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mails
 *   description: API pour la gestion des mails
 */

mailRouter.post("/", sendMailController);

export default mailRouter;
