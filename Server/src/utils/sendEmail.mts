import nodemailer from "nodemailer";

type emailOptions = {
    email: string,
    subjet: string,
    html: string
}

const sendEmail = async (options: emailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: options.email,
            subject: options.subjet,
            html: options.html
        })

        console.log("Email sent sucessfully");
    } catch (error) {
        console.log("Email not sent");
        console.log(error);
    }
}

export { sendEmail }