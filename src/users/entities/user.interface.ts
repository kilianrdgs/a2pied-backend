import {Schema} from "mongoose";

export interface IUser {
    mail: string;
    pseudo: string;
    credits: number;
    upgrades: {
        type: [Schema.Types.ObjectId],
        ref: 'Upgrade',
        required: true

    },
}
