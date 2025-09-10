import mongoose from "mongoose";
import type {IUser} from "./user.interface.js";

const {Schema} = mongoose;

const userSchema = new Schema<IUser>({
    mail: {type: String, unique: true},
    pseudo: String,
});

export const UserModel = mongoose.model("User", userSchema);
