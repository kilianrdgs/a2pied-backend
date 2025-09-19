import {UserModel} from "../entities/user.model.js";

export async function addtCreditToUsersService(addCreditDTO: { amount: number }) {
    return UserModel.updateMany({}, {$inc: {credits: addCreditDTO.amount}})
}