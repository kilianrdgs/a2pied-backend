import {IUser} from "../users/entities/user.interface.js";

export type CheckSendMailPayloadType = {
    user: IUser,
    isGaugeFull: boolean
}