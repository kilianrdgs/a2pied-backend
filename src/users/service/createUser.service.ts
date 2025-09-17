import type {CreateUserDto} from "../entities/dto/createUser.dto.js";
import {UserModel} from "../entities/user.model.js";
import {HydratedDocument} from "mongoose";
import {IUser} from "../entities/user.interface.js";

export async function createUserService(userData: CreateUserDto) {
    const user = new UserModel({...userData, mailTriggerGauge: 0});
    return user.save();
}

export async function resetMailTriggerGaugeService(userData: CreateUserDto): Promise<HydratedDocument<IUser>> {
    const user = await UserModel.findOneAndUpdate({mail: userData.mail}, {mailTriggerGauge: 0}, {new: true})
    if (!user) throw new Error('User not found')
    return user
}

export async function incrementMailTriggerGaugeService(userData: IUser): Promise<HydratedDocument<IUser>> {

    const user = await UserModel.findOneAndUpdate({mail: userData.mail}, {mailTriggerGauge: userData.mailTriggerGauge}, {new: true})
    if (!user) throw new Error('User not found')

    return user
}
