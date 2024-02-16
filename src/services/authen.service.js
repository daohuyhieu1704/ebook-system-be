import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import Token from "../models/Token.js"
import { where } from "sequelize";

class AuthenService {
    async LogIn({ email, password }) {
        try {
            password = crypto.createHash("sha256").update(password).digest("hex");
            
            let user = await User.findOne({
                where: {
                    email,
                    password,
                }
            })
            
            if (user) {
                
                let user_id = user.dataValues["id"];
                let accessToken = jsonwebtoken.sign({ id: user_id }, "secret-key", {expiresIn: "15m"})
                let refreshToken = jsonwebtoken.sign({ id: user_id }, "secret-key", {expiresIn: "15000m"})
                await Token.destroy({
                    where: {
                        user_ID: user_id
                    }
                })
    
                let token = new Token({user_ID: user_id, refresh_token: refreshToken})
                await token.save();
                return { accessToken, refreshToken }
            }            
            return {error: "Email hoặc password không chính xác"}
        } catch (error) {
            // throw "Email hoặc password không chính xác"  
            throw error          
        }

    }

    async RefreshToken ({ refreshToken }) {
       try {
            let check = jsonwebtoken.verify(refreshToken, "secret-key")
            let checkDB = await Token.findOne({
                where: {
                    refresh_token: refreshToken,
                    enable: true
                }
            })
            if (checkDB) {
                let accessToken = jsonwebtoken.sign({ id: check.id }, "secret-key", {expiresIn: "15m"});
          
                return { accessToken, refreshToken }
            }

            return {error: "Không thể duy trì đăng nhập"}
       } catch (error) {
            throw error  
       }   
    }
}

export default AuthenService;