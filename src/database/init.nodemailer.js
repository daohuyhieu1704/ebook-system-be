import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "email-smtp.ap-southeast-1.amazonaws.com",
  port: 2465,
  secure: true,
  auth: {
    user: "AKIAZJ6KJYHNLV5VY6WM",
    pass: "BJU6NH93QKt6hYONAeiTRUVplt09OKkocqeWEya6aNnt",
  },
});

export default transporter;
