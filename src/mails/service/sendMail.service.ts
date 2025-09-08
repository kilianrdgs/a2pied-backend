import nodemailer from "nodemailer";
import type { CreateUserDto } from "../../users/entities/dto/createUser.dto.js";

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

		return { message: "Email sent", info };
	} catch (error) {
		return { message: "Error sending email", error };
	}
}
