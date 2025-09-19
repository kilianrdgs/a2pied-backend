import type {Request, Response} from "express";
import {logError} from "../../utils/logError.js";
import {addtCreditToUsersService} from "../service/addtCreditToUsers.service.js";

export async function addCreditToUsersController(req: Request, res: Response) {
    try {
        const result = await addtCreditToUsersService(req.body);
        return res.status(201).json(result);
    } catch (error: unknown) {
        logError(error);
        return res.status(500).json({message: "Internal server error", error});
    }
}
