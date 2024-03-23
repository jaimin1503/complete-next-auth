import nodeMailer from "nodemailer";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: "jaimin.work@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Recet your password", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    };

    const mailResponce = await transporter.sendMail(mailOptions);
    return mailResponce;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
