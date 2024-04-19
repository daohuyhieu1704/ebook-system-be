import crypto from "crypto";

import Otp from "../models/Otp.js";

class OtpService {
  generateTokenRandom() {
    const token = crypto.randomInt(0, Math.pow(2, 32)).toString();
    return token;
  }

  async newOtp({ email }) {
    const token = this.generateTokenRandom();
    const newToken = await Otp.create({
      otp_token: token,
      otp_email: email,
    });

    return newToken;
  }
  async checkEmailToken({ token }) {
    let otp = await Otp.findOne({ where: { otp_token: token } });
    if (!otp) {
      return { error: "Token không hợp lệ" };
    }

    await Otp.destroy({ where: { otp_token: token } });
    return otp;
  }
}

export default OtpService;
