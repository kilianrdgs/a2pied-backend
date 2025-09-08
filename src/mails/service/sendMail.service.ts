import { Resend } from "resend";
import type { CreateUserDto } from "../../users/entities/dto/createUser.dto.js";

const KEY_MAIL = process.env.KEY_MAIL || "";

const resend = new Resend(KEY_MAIL);

export async function sendMailService(userData: CreateUserDto) {
	try {
		resend.emails.send({
			from: "onboarding@resend.dev",
			to: userData.mail,
			subject: `${userData.pseudo}, ton sbire est mort 😩`,
			html: "ton sbire à été tué malheureusement... mais il n'a pas souffert. Venge le !",
		});
		return { message: "Email sent" };
	} catch (error) {
		return { message: "Error sending email", error };
	}
}
