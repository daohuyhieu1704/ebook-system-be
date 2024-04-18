import crypto from "crypto";

import Otp from "../models/Otp.js";

class OtpService {
  generateTokenRandom() {
    const token = crypto.randomInt(0, Math.pow(2, 32));
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
}

export default OtpService;
