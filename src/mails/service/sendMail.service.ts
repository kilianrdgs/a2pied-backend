import nodemailer from "nodemailer";
import type {CreateUserDto} from "../../users/entities/dto/createUser.dto.js";
import {IUser} from "../../users/entities/user.interface.js";
import {MAIL_TRIGGER_GAUGE_THRESHOLD} from "../../game/gameState.js";
import {
    incrementMailTriggerGaugeService,
    resetMailTriggerGaugeService
} from "../../users/service/createUser.service.js";
import {CheckSendMailPayloadType} from "../CheckSendMailPayload.type.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export async function sendMailService(userData: CreateUserDto) {
    try {
        const info = await transporter.sendMail({
            from: `"Foot Factor" <${process.env.GMAIL_USER}>`,
            to: userData.mail,
            subject: `${userData.pseudo}, Ton sbire est mort 😭`,
            text: `ton sbire a été tué... heureusement il n'a pas souffert !`,
        });

        return {message: "Email sent", info};
    } catch (error) {
        return {message: "Error sending email", error};
    }
}

export async function checkSendMailGauge(user: IUser): Promise<CheckSendMailPayloadType> {
    user.mailTriggerGauge++;
    const isGaugeFull: boolean = user.mailTriggerGauge >= MAIL_TRIGGER_GAUGE_THRESHOLD
    if (user.mailTriggerGauge >= MAIL_TRIGGER_GAUGE_THRESHOLD) {
        await sendMailService(user)
        user = await resetMailTriggerGaugeService(user)
    } else {
        user = await incrementMailTriggerGaugeService(user)
    }
    return {user, isGaugeFull}
}