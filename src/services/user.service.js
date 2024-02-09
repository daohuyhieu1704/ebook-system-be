import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import Token from "../models/Token.js"
import UserHasRole from "../models/UserHasRole.js"
import Role from "../models/Role.js"
import { where } from "sequelize";

class UserService {
    async SignUp({ fullName, email, password }) {
        try {
            let check = await User.findOne({
                where: {email}
            })
            if (check) {
                return { error: "Email này đã tồn tại" }
            }   
            password = crypto.createHash("sha256").update(password).digest("hex");

            let words = fullName.trim().split(/\s+/);
            // Lấy last name bằng cách lấy phần tử cuối cùng trong mảng
            let lastName = words.pop();
            // Lấy first name bằng cách nối lại các phần tử còn lại trong mảng
            let firstName = words.join(' ');

            let user = await User.create({ first_name: firstName, last_name: lastName, email, password })

            //Tạo role mặc định là customer
            let role = await Role.findOne({
                where: {name: 'customer'}
            })
            let has_role = await UserHasRole.create({user_ID: user.id, role_ID: role.id})
            return { user }
        } catch (error) {
            return { error }       
        }

    }
}

export default UserService;