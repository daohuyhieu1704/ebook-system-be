import User from "../models/User";

class AccessController {
  signUp = async (req, res, next) => {
    try {
      let { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const isAuthen = mylib.verifyAuthorizationEmp(token);

      if (!isAuthen.authState) {
        return res.status(401).json({
          error: true,
          message: "Unauthorize",
        });
      }

      let { username, password, role, email, hoten } = JSON.parse(req.body);
      const passwordHashed = saltedSha256(password, env.SALT_PASSWORD);

      const newUser = await User.create({
        username: username,
        password: passwordHashed,
        hoten: hoten,
        email: email,
        role: role,
        enable: 1,
      });

      res.json({
        error: false,
        message: "Success",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  };
  signIn = async (req, res, next) => {
    try {
      const { username, password } = JSON.parse(req.body);
      const passwordHashed = saltedSha256(password, env.SALT_PASSWORD);

      const user = await User.findOne({
        where: {
          username: username,
          password: passwordHashed,
        },
        attributes: ["username", "fullname", "email", "role"],
      });

      if (!user) {
        return res.json({
          state: false,
          message: "Sai thông tin đăng nhập",
        });
      }

      const dataRow = user.toJSON();
      const accessToken = mylib.generAccessTokenEmp(
        dataRow.username,
        passwordHashed,
        dataRow.role
      );

      res.json({
        state: true,
        message: "Đăng nhập thành công.",
        fullname: dataRow.fullname,
        access_token: accessToken,
        role: parseInt(dataRow.role),
      });
    } catch (e) {
      next(e);
    }
  };
}

export default new AccessController();
