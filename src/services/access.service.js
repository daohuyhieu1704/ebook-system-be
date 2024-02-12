const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static SignUp = async ({ name, email, password }) => {
    try {
      // step 1: check email exist
      const shopHolder = await shopModel.findOne({ email }).lean();

      if (shopHolder) {
        return {
          code: "400",
          message: "Email already exist",
          status: "error",
        };
      }

      // step 2: create new shop
      const pwHash = await bcrypt.hash(password, 10);
      const newShopHolder = await shopModel.create({
        name,
        email,
        password: pwHash,
        roles: [RoleShop.SHOP],
      });

      if (newShopHolder) {
        // create publicKey, privateKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });
      }

      return {
        code: "201",
        message: "Create shop successfully",
        status: "success",
        data: newShopHolder,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: "Internal Server Error",
        status: "error",
      };
    }
  };
}

export default AccessService;
