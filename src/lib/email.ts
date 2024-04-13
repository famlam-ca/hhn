import nodemailer from "nodemailer";

const { SENDGRID_USERNAME, SENDGRID_PASSWORD, EMAIL_USER } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: SENDGRID_USERNAME,
    pass: SENDGRID_PASSWORD,
  },
});

export const sendEmail = async ({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  transporter.sendMail({
    from: `"Humble Home Network" <${EMAIL_USER}>`,
    to,
    subject,
    html: body,
  });
};
