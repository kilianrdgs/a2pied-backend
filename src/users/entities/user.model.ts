import mongoose from "mongoose";
import type { IUser } from "./user.interface.js";

const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
	mail: String,
	pseudo: String,
});

export const UserModel = mongoose.model("User", userSchema);
