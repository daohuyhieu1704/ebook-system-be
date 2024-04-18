import { randomInt } from "crypto";
import TemplateService from "./template.service.js";
import transporter from "@/database/init.nodemailer.js";
import { replacePlaceholder } from "../utils/index.js";

class EmailService {
  async sendEmailToken({ email = null }) {
    try {
      const token = await OtpService().newOtp({ email });
      const template = await TemplateService().getTemplate({
        tem_name: "HTML_EMAIL_TOKEN",
      });

      if (!template) {
        return { error: "Template not found" };
      }

      const content = replacePlaceholder(template.tem_html, {
        link_verify: `http://localhost:8000/verify?token=${token.otp_token}`,
      });

      this.sendEmailLinkVerify({
        html: template.tem_html,
        email,
        subject: "Xác nhận đăng kí!",
        text: "Xác nhận",
      });
    } catch (error) {
      return { error };
    }
  }

  sendEmailLinkVerify = async ({
    html,
    email,
    subject = "Xác nhận đăng kí!",
    text = "Xác nhận",
  }) => {
    try {
      const mailOptions = {
        from: ' "ecommerce" <daohuyhieu1704@gmail.com> ',
        to: email,
        subject: subject,
        text: text,
        html: html,
      };

      transporter.sendEmailLinkVerify(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return { error };
        }
        console.log("Email sent: " + info.messageId);
        return { info };
      });
    } catch (error) {
      console.log(error);
      return { error };
    }
  };
}

export default EmailService;
