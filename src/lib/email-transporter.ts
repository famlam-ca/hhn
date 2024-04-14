import nodemailer from "nodemailer";

const { SENDGRID_USERNAME, SENDGRID_PASSWORD } = process.env;

export const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: SENDGRID_USERNAME,
    pass: SENDGRID_PASSWORD,
  },
});
